import {DataTypes} from 'sequelize';
import {sequelize} from '../database/database.js';

export const Rol = sequelize.define('rol',{
    id_rol:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    desc_rol:{
        type: DataTypes.STRING,
    },
},
    {
        timestamps:true
});