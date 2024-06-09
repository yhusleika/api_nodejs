import { Router } from "express";
import {createRol, deleteRol, getRol, getRoles, updateRol, } from '../controllers/rol_controller.js'

const router = Router()

router.get('/roles', getRoles)
router.post('/roles', createRol)
router.put('/roles/:id_rol', updateRol)
router.delete('/roles/:id_rol', deleteRol)
router.get('/roles/:id_rol', getRol)

export default router