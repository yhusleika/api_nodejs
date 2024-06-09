import {DataTypes, ForeignKeyConstraintError} from 'sequelize'
import {sequelize} from '../database/database.js'
import {Rol} from './rol.js'
import { Usuarios } from './usuario.js';

export const RolxUser = sequelize.define('rel_rolxuser',{
    id_rolxuser:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_user:{
        type: DataTypes.INTEGER,
    },
    id_rol:{
        type: DataTypes.INTEGER,
    },
});

RolxUser.hasMany(Rol, {
    foreignKey: 'id_rol',
    sourceKey: 'id_rol'
});

RolxUser.belongsTo(Usuarios, {
    foreignKey: 'id_user',
    sourceKey: 'id_user'
});
