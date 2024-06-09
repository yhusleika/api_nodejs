import { Router } from "express";
import {createProductos, deleteProductos, getProducto, getProductos, updateProductos} from '../controllers/productos_controller.js'

const router = Router();
import {verifyToken, esAlmacen, esAdmin} from "../middlewares/auth_jwt.js";

router.get('/productos', getProductos)
router.post('/productos', [verifyToken, esAlmacen], createProductos)
router.put('/productos/:id_produc', [verifyToken, esAlmacen], updateProductos)
router.delete('/productos/:id_produc', [verifyToken, esAdmin], deleteProductos)
router.get('/productos/:id_produc', getProducto)

export default router;