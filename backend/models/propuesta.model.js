import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

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
