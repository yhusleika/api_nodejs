import {Usuarios} from '../models/usuario.js';
import {Rol} from '../models/rol.js';

export const checkExistingUser = async (req, res, next) => {
    try {
        const userFound = await Usuarios.findOne({ where: { nombre_user: req.body.nombre_user } });
        if (userFound)
            return res.status(400).json({ message: "El usuario ya existe" });

        const email = await Usuarios.findOne({ where: { correo_user: req.body.correo_user } });
        if (email)
            return res.status(400).json({ message: "El correo ya existe" });

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const checkExistingRole = async (req, res, next) => {
    if (!req.body.roles) return res.status(400).json({ message: "No roles" });

    for (let i = 0; i < req.body.roles.length; i++) {
        const role = await Rol.findOne({ where: { desc_rol: req.body.roles[i] } });
        if (!role) {
            return res.status(400).json({
                message: `El rol ${req.body.roles[i]} no existe`,
            });
        }
    }

    next();
};
