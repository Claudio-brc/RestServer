import  { Response }  from 'express';
import { MyRequest } from '../types';
import  bcryptjs  from 'bcryptjs';

const Usuario = require ('../models/usuario');


const usuariosGet = async (req: MyRequest, res :Response)  => {

   // const {q, nombre = 'no_name', apikey, page, limit} = query = req.query;
   const { limite = 5, desde = 0} = req.query;

   const [ total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true}),
    Usuario.find({ estado: true})
    .skip(Number(desde))
    .limit(Number(limite))
   ]);

   res.json(
        {
         total,
         usuarios
        }
        )
  }

const usuariosPut = async (req: MyRequest, res: Response) => {
    const { id} = req.params;
    const { password, google,  ...resto} = req.body;

    if ( password ) {
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);
    
    res.status(400).json(
        {
          msg: 'put API - Controlador',
          usuario
        }
        )
  } 
  
const usuariosPost = async (req: MyRequest, res: Response) => {


    const { nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );
    
    // encriptar la contraseña
    const  salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync( password, salt);
    // guardar en DB

    await usuario.save();


    res.status(201).json(
        {
          msg: 'post API ', 
          usuario
        }
        )
  }  

const usuariosDelete = async (req: MyRequest, res: Response) => {
  const { id } = req.params;  

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false} );
  
  if(!usuario) {
    return res.status(401).json({
      
      msg: 'Token no válido - no existe.'
    
  })   
  }

  if ( !usuario.estado) {
    return res.status(401).json({
      
        msg: 'Token no válido - usuario ya borrado.'
      
    })
  }
  
  const usuarioAutenticado = req.usuario;

  res.status(201).json(
        {usuario, usuarioAutenticado}
        )
  }

 export {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete 
  }