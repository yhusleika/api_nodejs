import express from 'express'
import productosRoutes from './routes/productos_routes.js'
import userRoutes from './routes/user_routes.js'
import rolRoutes from './routes/rol_routes.js'
import rolxuserRoutes from './routes/rolxuser_routes.js'
import authRoutes from './routes/auth_routes.js'
import {createRoles} from './libs/initialSetup.js'

const app = express()
createRoles();

//middlewares
app.use(express.json());

app.use(productosRoutes);
app.use(userRoutes);
app.use(rolRoutes);
app.use(rolxuserRoutes);
app.use(authRoutes);

export default app;