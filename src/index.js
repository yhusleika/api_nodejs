import app from './app.js'
import {sequelize} from './database/database.js'

import './models/rolxuser.js'
import './models/rol.js'
import './models/producto.js'
import './models/usuario.js'

async function main(){
    try {
        await sequelize.sync({alter: true});
        app.listen(3000);
        console.log('hola');
    } catch (error) {
        console.log("error en la coxion", error);
    }
}

main();