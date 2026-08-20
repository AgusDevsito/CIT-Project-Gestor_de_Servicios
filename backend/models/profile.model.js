import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./user.models.js";

export const Profile = sequelize.define("Profile",{
    user_id:{type:DataTypes.INTEGER,allowNull=false,unique=true,references: {model:"User",key:'id'}},
    first_name:{type:DataTypes.STRING,allowNull:false},
    last_name:{type:DataTypes.STRING,allowNull:false},
    avatar_url:{type:DataTypes.STRING(250)}
})

User.hasOne(Profile,{foreignKey:"userId",as:"Profile"})
Profile.belongsTo(User,{foreignKey:"userId",as:"Profile"})