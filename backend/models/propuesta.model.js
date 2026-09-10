import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./user.models.js";

export const Propuestas = sequelize.define("Propuesta",{
    titulo:{type:DataTypes.STRING,allowNull:false,validate:{msg:"La propuesta debe tener un titulo"}},
    sector:{type:DataTypes.ENUM("Agricola","Ganadero","Frutihícola"),defaultValue:"Ganadero",allowNull:false},
    problematica:{type:DataTypes.TEXT,allowNull:false,validate:{
        len:[20,5000],
    }},
    estado:{type:DataTypes.ENUM("Pendiente","Aprobado","Rechazado"),defaultValue:"Pendiente",allowNull:false},
    solicitante:{type:DataTypes.INTEGER,allowNull:false},
    cirRevisorId:{type:DataTypes.INTEGER,defaultValue:null},
    citJustificacion:{type:DataTypes.TEXT,defaultValue:null},
    citFechaRevision:{type:DataTypes.TEXT,defaultValue:null},   
},{
    timestamps:true,
}
)

// Una propuesta pertenece al usuario que la solicita.
User.hasMany(Propuestas,{foreignKey:"solicitante",as:"PropuestasSolicitadas"})
Propuestas.belongsTo(User,{foreignKey:"solicitante",as:"Solicitante"})

// Una propuesta tambien puede guardar el usuario CIT que la reviso.
User.hasMany(Propuestas,{foreignKey:"cirRevisorId",as:"PropuestasRevisadas"})
Propuestas.belongsTo(User,{foreignKey:"cirRevisorId",as:"Revisor"})
