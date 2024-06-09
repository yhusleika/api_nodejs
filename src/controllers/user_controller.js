import { where } from 'sequelize';
import {Usuarios} from '../models/usuario.js'

export const getUsuarios = async(req, res) =>{
    try {
        const usuarios = await Usuarios.findAll()
        res.json(usuarios)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const getUsuario = async(req, res) =>{
    try {
        const {id_user} = req.params
        const usuario = await Usuarios.findOne({
            where:{
                id_user
            },
        });
        if(!usuario)
            return res.status(404).json({message: "Usuario no existe"});
        res.json(usuario)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createUsuario = async(req, res) =>{
    const {nombre_user, correo_user, contra_user} = req.body

    try {
        const newUsuario = await Usuarios.create({
            nombre_user,
            correo_user,
            contra_user
        });
    
        res.json(newUsuario)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const updateUsuario = async(req, res) =>{
    try {
        const {id_user} = req.params;
        const {nombre_user, correo_user, contra_user} = req.body

        const usuario = await Usuarios.findByPk(id_user)
        usuario.nombre_user = nombre_user
        usuario.correo_user = correo_user
        usuario.contra_user = contra_user
        await usuario.save()

        res.json(usuario)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const deleteUsuario = async(req, res) =>{
    try {
        const {id_user} = req.params;
        await Usuarios.destroy({
            where: {
                id_user,
            },
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};