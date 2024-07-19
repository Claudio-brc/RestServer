import express from 'express';
import cors    from 'cors';

import { dbConnection } from '../database/config';
import auth from '../routes/auth';
import user from '../routes/user';
import categorias from '../routes/categorias';
import productos from '../routes/productos';



class Server {
    public app;
    public port;
    public paths;

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
       this.app.use(this.paths.auth, auth );   
       this.app.use(this.paths.usuarios, user ); 
       this.app.use(this.paths.categorias, categorias );
       this.app.use(this.paths.productos, productos );       

    }
    
    listen () {
        this.app.listen(process.env.PORT, 
            ()=>{
                console.log('Servidor corriendo en puerto', this.port)
            })    
    }

}

export default Server;