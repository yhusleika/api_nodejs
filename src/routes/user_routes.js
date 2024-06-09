import { Router } from "express";
import {createUsuario, deleteUsuario, getUsuario, getUsuarios, updateUsuario} from '../controllers/user_controller.js'

const router = Router()
import {verifyToken, esAdmin} from "../middlewares/auth_jwt.js";
import {checkExistingRole} from '../middlewares/verify_register.js';


router.get('/usuarios', getUsuarios)

router.post('/usuarios', [verifyToken, esAdmin],[checkExistingRole], createUsuario)

router.put('/usuarios/:id_user', updateUsuario)

router.delete('/usuarios/:id_user', [verifyToken, esAdmin], deleteUsuario)

router.get('/usuarios/:id_user', getUsuario)

export default router