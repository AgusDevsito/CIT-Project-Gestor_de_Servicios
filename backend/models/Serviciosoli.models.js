import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./user.models.js";
import { Servicios } from "./servicios.models";


export const Solicitud = sequelize.define("Solicitud",{
    user_id:{},
    servicio_id:{},
    estado:{},
    fecha_solicitud:{},

})