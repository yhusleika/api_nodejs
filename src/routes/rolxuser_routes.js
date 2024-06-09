import { Router } from "express";
import {createRolxUser, deleteRolxUser, getRolxUser, getRolxUsers, updateRolxUser, } from '../controllers/rolxuser_controller.js'

const router = Router()

router.get('/rolxuser', getRolxUsers)
router.post('/rolxuser', createRolxUser)
router.put('/rolxuser/:id_rolxuser', updateRolxUser)
router.delete('/rolxuser/:id_rolxuser', deleteRolxUser)
router.get('/rolxuser/:id_rolxuser', getRolxUser)

export default router