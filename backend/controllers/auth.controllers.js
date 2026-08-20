import { comparePasswords, hashPassword } from "../helper/bcrypt.js";
import { signToken, verifyToken } from "../helper/jwt.js";
import { User } from "../models/user.models.js";
import { Profile } from "../models/profile.model.js";
import jwt from 'jsonwebtoken'
export const register = async (req,res) => {
    const {first_name,last_name,avatar_url,username,email,password,role} = req.body
 try {
    const hased = await hashPassword(password)
    const user = await User.create({
        username: username,
        email: email,
        password: hased,
        role:role,
    })
    await Profile.create({
        user_id:user.id,
        first_name:first_name,
        last_name:last_name,
        avatar_url:avatar_url,
    })
    res.status(200).json({
        msg:"Usuario Registrado"
    })
 } catch (error) {
    console.error(error)
    res.status(500).json({
        msg:"Error interno del servidor"
    })
 }   
}
export const login = async (req,res) => {
    const {username,password} = req.body
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
        const token = jwt.sign({
            id:user.id,
            username:user.username,
            email:user.email,
        },
        "mysecret",
        {
           expiresIn:"1h" 
        });
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
                attributes:{exlude:["password"]}
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