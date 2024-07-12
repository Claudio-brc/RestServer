const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');


class Server {
    constructor () {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            usuarios:   '/api/usuarios',
            categorias: '/api/categorias',
            productos:  '/api/productos'

        }

        //conectar a base de datos
        this.conectarDB();

        //Middlewares

        //Rutas
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        //public directory
        this.app.use(express.static('public'));
        //
        this.app.use( express.json());
        }

    routes(){
       this.app.use(this.paths.auth, require('../routes/auth'));   
       this.app.use(this.paths.usuarios, require('../routes/user')); 
       this.app.use(this.paths.categorias, require('../routes/categorias'));
       this.app.use(this.paths.productos, require('../routes/productos'));
    }
    
    listen () {
        this.app.listen(process.env.PORT, 
            ()=>{
                console.log('Servidor corriendo en puerto', this.port)
            })    
    }

}

module.exports = Server;