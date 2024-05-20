const { response } = require ('express');
const { Categoria } = require('../models');
const  { Usuario } = require('../models/usuario');


const obtenerCategorias = async (req = request, res = response)  => {

    // const {q, nombre = 'no_name', apikey, page, limit} = query = req.query;
    const { limite = 5, desde = 0} = req.query;
 
    const [ total, categorias] = await Promise.all([
     Categoria.countDocuments({ estado: true}),
     Categoria.find({ estado: true})
     .skip(Number(desde))
     .limit(Number(limite))
     .populate('usuario').exec()
     //
    ]);
    res.json(
         {
          total,
          categorias
         }
         )
   }

// obtenerCategoria - populate {}


const obtenerCategoria = async (req = request, res = response)  => {
    
    const { id } = req.params;  
    let  categoria = {};
    
    try{
      categoria = await Categoria.findById( id).populate('usuario').exec()
         
    }
    catch(error)  {
      categoria = {'error': 'no encontrado'};

    }


    res.json(
         {
            categoria
         }
         )
   }


// actualizar categoria
const categoriaPUT = async (req, res) => {
    const { id} = req.params;
    const { estado, usuario,  ...data} = req.body;
    
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data,
       {new: true}
    );

    res.json(categoria);
  } 



const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne( { nombre } ); 

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: 'la categoría ya existe'
        });
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria ( data );

    await categoria.save(); 

    res.status(201).json(categoria);

}

// borrar categoria

const categoriaDelete = async (req, res) => {
  const { id } = req.params;  

  const categoria = await Categoria.findByIdAndUpdate(id, { estado: false}, 
                                                      {new: true});
  
  if(!categoria) {
    return res.status(401).json({
      msg: 'Token no válido - no existe.'
  })   
  }
  
  //req.usuario = usuario;
//  const usuarioAutenticado = req.usuario;

  res.status(200).json(
        {categoria}
        )
  }


module.exports = { 
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    categoriaPUT,
    categoriaDelete
 }