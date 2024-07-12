const { response } = require('express');
const { Producto } = require('../models');
const { Usuario } = require('../models');
const { Categoria } = require('../models');



const obtenerProductos = async (req = request, res = response) => {

  // const {q, nombre = 'no_name', apikey, page, limit} = query = req.query;
  const { limite = 5, desde = 0 } = req.query;
  
  try{
    const [total, productos] = await Promise.all([
      Producto.countDocuments({ estado: true }),
      Producto.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(limite))
        .populate('usuario')
        .populate('categoria')
        .exec()
      //
    ]);
    res.json(
      {
        total,
        productos
      }
    )
  }  
  catch(error){
    console.error(error);
    res.status(500).json({
      msg: 'Hable con el administrador'
    });    

  }  
}


const obtenerProducto = async (req = request, res = response) => {

  const { id } = req.params;
  let producto = {};

  try {
    producto = await Producto.findById(id).populate('usuario')
      .populate('categoria')
      .exec();

  }
  catch (error) {
    producto = { 'error': 'no encontrado' };

  }
  res.json(
    {
      producto
    }
  )
}


// actualizar PRODUCTO
const productoPUT = async (req, res) => {
  const { id } = req.params;
  
  let producto = {};

  const {estado, usuario, categoria, nombre, ...data} = req.body;

  try  {

    let vusuario = {};
    let vcategoria = {};
     // si undefined?
    if (usuario !== undefined) {
      vusuario = await Usuario.findById(usuario); 
    
      if (!vusuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      data.usuario = usuario;   
    }

    if (categoria !== undefined) {
      vcategoria = await Categoria.findById(categoria);
      if (!vcategoria) {
        return res.status(404).json({ error: 'Categoria no encontrada' });
      }
      data.categoria = categoria;
    }

    data.nombre    = nombre.toUpperCase();

   /* const data = {
      nombre,
      usuario,
      categoria,
      precio: req.body.precio,
      descripcion: req.body.descripcion
    }    */
    
    producto = await Producto.findByIdAndUpdate(id, data,
                                               { new: true });
   
  }catch (error){
    producto = { 'error': 'no encontrado' }; } 

    // imprimir mensaje del error--

  res.json(producto);
}



const crearProducto = async (req, res = response) => {

  const nombre = req.body.nombre.toUpperCase();

  const { usuarioId, categoriaId } = req.body;

  try {
    const productoDB = await Producto.findOne({ nombre });

    if (productoDB) {
      return res.status(400).json({
        msg: 'el producto ya existe'
      });
    }

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const categoria = await Categoria.findById(categoriaId);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoria no encontrada' });
    }

    const data = {
      nombre,
      usuario,
      categoria,
      precio: req.body.precio,
      descripcion: req.body.descripcion
    }

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });}

  }

// borrar PRODUCTO

const productoDelete = async (req, res) => {
    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id, { disponible: false },
      { new: true });

    if (!producto) {
      return res.status(401).json({
        msg: 'Token no válido - no existe.'
      })
    }


    res.status(200).json(
      { producto }
    )
  }


  module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    productoPUT,
    productoDelete
  }