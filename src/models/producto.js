import {DataTypes} from 'sequelize';
import {sequelize} from '../database/database.js';

export const Productos = sequelize.define('productos',{
    id_produc:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_produc:{
        type: DataTypes.STRING,
    },
    desc_produc:{
        type: DataTypes.STRING,
    },
    precio_produc:{
        type: DataTypes.DOUBLE,
    },
    stock_produc:{
        type: DataTypes.DOUBLE,
    },
},
    {
        timestamps:true
});