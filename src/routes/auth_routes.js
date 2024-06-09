import { Router } from "express";
import {loginCtrl, registerCtrl} from '../controllers/auth_controller.js'
import {checkExistingUser, checkExistingRole} from '../middlewares/verify_register.js'

const router = Router()

//Login
router.post('/login', loginCtrl)

//Registrarse
router.post('/register', [checkExistingUser, checkExistingRole],registerCtrl)

export default router
