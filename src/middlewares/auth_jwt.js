import jwt from "jsonwebtoken";
import {Usuarios} from '../models/usuario.js';
import {Rol} from '../models/rol.js';
import {RolxUser} from '../models/rolxuser.js';
import { SECRET } from "../config.js";

export const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, SECRET);
        req.userId = decoded.id;

        const user = await Usuarios.findByPk(req.userId);
        if (!user) return res.status(404).json({ message: "Usuario no existe" });

        next();
    } catch (error) {
        return res.status(401).json({ message: "No autorizado!" });
    }
};

export const esAlmacen = async (req, res, next) => {
    try {
        const userRoles = await RolxUser.findAll({ where: { id_user: req.userId } });
        const roles = await Rol.findAll({ where: { id_rol: userRoles.map((role) => role.id_rol) } });
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].desc_rol === "almacen") {
                next();
                return;
            }
        }
        return res.status(403).json({ message: "Se requiere el rol de almacenista!" });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};

export const esAdmin = async (req, res, next) => {
    try {
        const userRoles = await RolxUser.findAll({ where: { id_user: req.userId } });
        const roles = await Rol.findAll({ where: { id_rol: userRoles.map((role) => role.id_rol) } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].desc_rol === "admin") {
                next();
                return;
            }
        }

        return res.status(403).json({ message: "Se requiere el rol de administrador!" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error });
    }
};