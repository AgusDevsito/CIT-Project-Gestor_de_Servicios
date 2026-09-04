import { comparePasswords, hashPassword } from "../helper/bcrypt.js";
import { signToken } from "../helper/jwt.js";
import { validateCITRegistration } from "../helper/citRegistration.js";
import { User } from "../models/user.models.js";
import { Profile } from "../models/profile.model.js";
export const register = async (req,res) => {
    const {first_name,last_name,avatar_url,username,email,password,role,document_url} = req.body;
    const uploadedFile = req.file;
    const resolvedDocumentUrl = uploadedFile ? `/uploads/${uploadedFile.filename}` : document_url;

    const requiredFields = { first_name, last_name, username, email, password, role };
    if (Object.entries(requiredFields).some(([, value]) => !String(value ?? '').trim())) {
        return res.status(400).json({ msg: "Todos los campos obligatorios deben estar completos." });
    }

    try {
        validateCITRegistration({
            role,
            documentUrl: resolvedDocumentUrl,
            file: uploadedFile,
        });

        const hased = await hashPassword(password)
        const user = await User.create({
            username: username,
            email: email,
            password: hased,
            role: role,
            document_url: resolvedDocumentUrl || null,
            document_name: uploadedFile ? uploadedFile.originalname : null,
        })
        await Profile.create({
            user_id:user.id,
            first_name:first_name,
            last_name:last_name,
            avatar_url:avatar_url,
        })
        res.status(200).json({
            msg:"Usuario Registrado",
            document_url: resolvedDocumentUrl,
        })
    } catch (error) {
        console.error(error)
        if (error.code === "DOCUMENT_REQUIRED") {
            return res.status(400).json({
                msg: error.message,
            })
        }
        res.status(500).json({
            msg:"Error interno del servidor"
        })
    }   
}
export const login = async (req,res) => {
    const {username,password} = req.body
    if (!String(username ?? '').trim() || !String(password ?? '').trim()) {
        return res.status(400).json({ msg: "El usuario y la contraseña son obligatorios." });
    }
    try {
        const user = await User.findOne({
            where:{
                username: username,
            },
            include:{
                model:Profile,
                as:'Profile',
            }
        })
        if (!user){
            return res.status(401).json({msg:"Credenciales incorrectas o invalidas"})
        }
        const IsMatch = await comparePasswords(password,user.password)
        if(!IsMatch){
            return res.status(401).json({
                msg:"Contraseña Incorrecta"
            })
        }
        const token = signToken(user);
        return res.status(200).json({
            msg:"Usuario Logueado",
            token,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
    
}
export const logout = async (req,res) => {
    res.clearCookie("token");
    return res.json({msg:"Logout exitoso"})
    
}
export const profile = async (req,res) => {
    try {
        console.log(req.userLogged)
        const userProfile = await Profile.findByPk(req.userLogged.id,{
            include:{
                model:User,
                as:"User",
                attributes:{exclude:["password"]}
            }
        })

        console.log({userProfile})
        if(!userProfile){
            return res.status(404).json(userProfile)       
     }
     res.status(200).json(userProfile)
    } catch (error) {
        console.error(error)
        return res.status(500).json({msg:"Error interno del sistema"})
    }
    
}