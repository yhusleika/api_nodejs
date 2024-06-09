import jwt from 'jsonwebtoken';
import {Usuarios} from '../models/usuario.js';
import {RolxUser} from '../models/rolxuser.js';
import {Rol} from '../models/rol.js';
import {SECRET} from '../config.js'

export const loginCtrl = async(req, res) =>{

    try {
        // Request body email can be an email or username
        const userFound = await Usuarios.findOne({ where: { correo_user: req.body.correo_user } });

        if (!userFound) return res.status(400).json({ message: "Usuario no existe" });

        const matchPassword = await userFound.validPassword(req.body.contra_user);

        if (!matchPassword)
            return res.status(401).json({
                token: null,
                message: "Contraseña inválida",
            });

        const token = jwt.sign({ id: userFound.id_user }, SECRET, {
            expiresIn: 1800, // 30 minutos
        });

        res.json({ token });
    } catch (error) {
        console.log('login', error);
        return res.status(500).json({message: error.message});
    }
};

export const registerCtrl = async(req, res) =>{

    const { nombre_user, correo_user, contra_user, roles_user } = req.body;

    try {
        // Creating a new User Object
        const newUser = await Usuarios.create({
            nombre_user,
            correo_user,
            contra_user,
        });

        //verificar el rol
        if(roles_user){
            const foundRoles = await Rol.findAll({where: {desc_rol: {$in:roles_user}}});
            await RolxUser.bulkCreate(
                foundRoles.map((rol_user)=> ({id_user: newUser.id_user, id_rol: rol_user.id_rol}))
            );
        } else {
            const rol_user = await Rol.findOne({where: {desc_rol: "cliente"}});
            await RolxUser.create({id_user: newUser.id_user, id_rol: rol_user.id_rol});
        }

        // Create a token
        const token = jwt.sign({ id: newUser.id_user }, SECRET, {
            expiresIn: 1800, // 30 minutes
        });

        return res.status(200).json({ token });
    } catch (error) {
        console.log('registro', error);
        return res.status(500).json({message: error.message});
    }

};