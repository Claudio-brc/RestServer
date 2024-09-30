import { response, Response }  from "express";
import { MyRequest } from "../types";
import { isValidObjectId }  from "mongoose"
import Usuario from "../models/usuario"
import Categoria from "../models/categoria"
import Producto from "../models/producto";

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarProductos = async (termino: string = '', res: Response) => {
  const esMongoId = isValidObjectId ( termino);

  if ( esMongoId ) {
    const producto = await Producto.findById(termino);  
    return res.json(
      {
          results: ( producto ) ? [producto] : []

      })
  }
  const regex = new RegExp(termino, 'i');

  const productos = await Producto.find({
  
    $or:  [{nombre: regex}],
    $and: [{ estado: true } ]
  
  });

  res.json({
    results: productos
  })
}


const buscarCategorias = async (termino: string = '', res: Response) => {
  const esMongoId = isValidObjectId ( termino);

  if ( esMongoId ) {
    const categoria = await Categoria.findById(termino);  
    return res.json(
      {
          results: ( categoria ) ? [categoria] : []

      })
  }
  const regex = new RegExp(termino, 'i');

  const categorias = await Categoria.find({
  
    $or:  [{nombre: regex}],
    $and: [{ estado: true } ]
 
  
  });

  res.json({
    results: categorias
  })
}


const buscarUsuarios = async (termino: string = '', res: Response) => {
    const esMongoId = isValidObjectId ( termino);

    if ( esMongoId ) {
      const usuario = await Usuario.findById(termino);  
      return res.json(
        {
            results: ( usuario ) ? [usuario] : []

        })
    }
    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
    
      $or:  [{nombre: regex}, {correo: regex}],
      $and: [ { estado: true } ]
   
    
    });

    res.json({
      results: usuarios
    })
}

const buscar = (  req: MyRequest, res: Response ) => {

  const { coleccion, termino} = req.params;  

  if (!coleccionesPermitidas.includes(coleccion)){
    return res.status(400).json(
        {msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`}
    )
  }

  switch (coleccion){
    case 'usuarios':
        buscarUsuarios(termino,res)
    break;
    case 'categorias':
        buscarCategorias(termino,res)
    break;  
    case 'productos':
        buscarProductos(termino,res)
    break;        
    default:
        res.status(500).json(
            { msg: 'se me olvido hacer esta búsqueda.'}
        )
  }


} 

export  { buscar };