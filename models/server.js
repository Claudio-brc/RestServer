const express = require('express');
const cors = require('cors');

class Server {
    constructor () {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares

        //Rutas
        this.middlewares();
        this.routes();
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
    
      this.app.use(this.usuariosPath, require('../routes/user'));   
    }
    
    listen () {
        this.app.listen(process.env.PORT, 
            ()=>{
                console.log('Servidor corriendo en puerto', this.port)
            })    
    }

}

module.exports = Server;