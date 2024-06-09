//import {Usuarios, Rol, RolxUser} from '../models/usuario.js';
import {Rol} from '../models/rol.js';
//import {RolxUser} from '../models/rolxuser.js'

export const createRoles = async ()=>{
    try {
        const count = await Rol.count();

        //verifica si existen roles
        if (count > 0) return;

        // Crear Roles por defecto
        const values = await Promise.all([
            Rol.create({ desc_rol: "admin" }),
            Rol.create({ desc_rol: "cliente" }),
            Rol.create({ desc_rol: "almacen" }),
        ]);

        console.log(values);
    } catch (error) {
        console.error(error);
    }
    
}