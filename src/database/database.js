import Sequelize from 'sequelize'

export const sequelize = new Sequelize(
    "tienda", 
    "postgres",
    "yuli2708", 
    {
        host: 'localhost',
        dialect: 'postgres',
    }
);