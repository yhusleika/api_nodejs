import {Rol} from '../models/rol.js'

export const getRoles = async(req, res) =>{
    try {
        const roles = await Rol.findAll()
        res.json(roles)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const getRol = async(req, res) =>{
    try {
        const {id_rol} = req.params
        const rol = await Rol.findOne({
            where:{
                id_rol
            },
        });
        if(!rol)
            return res.status(404).json({message: "Rol no existe"});
        res.json(rol)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createRol = async(req, res) =>{
    const {desc_rol} = req.body

    try {
        const newRol = await Rol.create({
            desc_rol,
        });
    
        res.json(newRol)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const updateRol = async(req, res) =>{
    try {
        const {id_rol} = req.params;
        const {desc_rol,} = req.body

        const rol = await Rol.findByPk(id_rol)
        rol.desc_rol = desc_rol
        await rol.save()

        res.json(rol)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const deleteRol = async(req, res) =>{
    try {
        const {id_rol} = req.params;
        await Rol.destroy({
            where: {
                id_rol,
            },
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};