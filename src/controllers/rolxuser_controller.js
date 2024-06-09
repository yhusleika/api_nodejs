import {RolxUser} from '../models/rolxuser.js'

export const getRolxUsers = async(req, res) =>{
    try {
        const rolxusers = await RolxUser.findAll()
        res.json(rolxusers)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const getRolxUser = async(req, res) =>{
    try {
        const {id_rolxuser} = req.params
        const rolxuser = await RolxUser.findOne({
            where:{
                id_rolxuser
            },
        });
        if(!rolxuser)
            return res.status(404).json({message: "RolxUser no existe"});
        res.json(rolxuser)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createRolxUser = async(req, res) =>{
    const {id_user, id_rol} = req.body

    try {
        const newRolxUser = await RolxUser.create({
            id_user,
            id_rol
        });
    
        res.json(newRolxUser)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const updateRolxUser = async(req, res) =>{
    try {
        const {id_rolxuser} = req.params;
        const {id_user, id_rol} = req.body

        const rolxuser = await RolxUser.findByPk(id_rolxuser)
        rolxuser.id_user = id_user
        rolxuser.id_rol = id_rol
        await rolxuser.save()

        res.json(rolxuser)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const deleteRolxUser = async(req, res) =>{
    try {
        const {id_rolxuser} = req.params;
        await RolxUser.destroy({
            where: {
                id_rolxuser,
            },
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};