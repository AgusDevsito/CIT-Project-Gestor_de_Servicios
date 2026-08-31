import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const User = sequelize.define("User",{
    username:{type:DataTypes.STRING,allowNull:false,unique:true},
    email:{type:DataTypes.STRING,allowNull:false,unique:true},
    password:{type:DataTypes.STRING,allowNull:false},
    role:{type:DataTypes.ENUM("cit", "user", "admin"),defaultValue:"user"},
    document_url:{type:DataTypes.STRING,allowNull:true},
    document_name:{type:DataTypes.STRING,allowNull:true},
},{
    timestamps:false,
})

