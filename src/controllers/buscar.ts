import { response, Response }  from "express";
import { MyRequest } from "../types";
import { isValidObjectId }  from "mongoose"
import Usuario from "../models/usuario"

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
]

const buscarUsuarios = async (termino: string = '', res: Response) => {
    const esMongoId = isValidObjectId ( termino);

    if ( esMongoId ) {
      const usuario = await Usuario.findById(termino);  
      res.json(
        {
            results: ( usuario ) ? [usuario] : []

        })
    }
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
    
    default:
        res.status(500).json(
            { msg: 'se me olvido hacer esta búsqueda.'}
        )
  }


} 

export  { buscar };