import {DataTypes} from 'sequelize';
import {sequelize} from '../database/database.js';
import bcrypt from 'bcryptjs';

export const Usuarios = sequelize.define('usuarios',{
        id_user:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_user:{
            type: DataTypes.STRING,
        },
        correo_user:{
            type: DataTypes.STRING,
            unique: true,
        },
        contra_user:{
            type: DataTypes.STRING,
            required: true,
        },
    },
    {
        timestamps:true,
        hooks: {
            beforeCreate: async (user) =>{
                if (user.contra_user) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.contra_user = bcrypt.hashSync(user.contra_user, salt);
                }
            },
            beforeUpdate: async (user) =>{
                if (user.contra_user) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.contra_user = bcrypt.hashSync(user.contra_user, salt);
                }
            },
        }
    },
);

Usuarios.prototype.validPassword = async function(password){
    return await bcrypt.compare(password, this.contra_user);
};
export default Usuarios
