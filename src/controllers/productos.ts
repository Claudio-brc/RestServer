import { Response } from "express"
import Producto from "../models/producto"
import Usuario from "../models/usuario"
import Categoria from "../models/categoria"
import { MyRequest } from "../types"

const getProducts = async (req: MyRequest, res: Response) => {

  const { limit = 10, from = 0 } = req.query

  try {
    const [total, products] = await Promise.all([
      Producto.countDocuments({ estado: true }),
      Producto.find({ estado: true })
        .skip(Number(from))
        .limit(Number(limit))
        .populate("usuario")
        .populate("categoria")
        .exec(),
      //
    ])
    res.json({
      total,
      products,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: "Hable con el administrador",
    })
  }
}

const obtenerProducto = async (req: MyRequest, res: Response) => {
  const { id } = req.params

  try {
    const producto = await Producto.findById(id)
      .populate("usuario")
      .populate("categoria")
      .exec()

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    res.json({ producto })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error del servidor" })
  }
}

// actualizar PRODUCTO
const productoPUT = async (req: MyRequest, res: Response) => {
  const { id } = req.params

  const { estado, usuario, categoria, nombre, ...data } = req.body

  try {
    //let vusuario = {};
    //let vcategoria = {};
    // si undefined?
    if (usuario !== undefined) {
      const vusuario = await Usuario.findById(usuario)

      if (!vusuario) {
        return res.status(404).json({ error: "Usuario no encontrado" })
      }
      data.usuario = usuario
    }

    if (categoria !== undefined) {
      const vcategoria = await Categoria.findById(categoria)
      if (!vcategoria) {
        return res.status(404).json({ error: "Categoria no encontrada" })
      }
      data.categoria = categoria
    }

    data.nombre = nombre.toUpperCase()

    let producto = await Producto.findByIdAndUpdate(id, data, { new: true })
    res.json(producto)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error del servidor" })
  }
}

const crearProducto = async (req: MyRequest, res: Response) => {
  const nombre = req.body.nombre.toUpperCase()
  const { usuario, categoria } = req.body
  try {
    const productoDB = await Producto.findOne({ nombre })

    if (productoDB) {
      return res.status(400).json({
        msg: "el producto ya existe",
      })
    }

    const vusuario = await Usuario.findById(usuario)
    if (!vusuario) {
      return res.status(404).json({ error: "Usuario no encontrado" })
    }

    const vcategoria = await Categoria.findById(categoria)
    if (!vcategoria) {
      return res.status(404).json({ error: "Categoria no encontrada" })
    }

    const data = {
      nombre,
      usuario,
      categoria,
      precio: req.body.precio,
      descripcion: req.body.descripcion,
    }

    const producto = new Producto(data)

    await producto.save()

    res.status(201).json(producto)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error del servidor" })
  }
}

// borrar PRODUCTO

const productoDelete = async (req: MyRequest, res: Response) => {
  const { id } = req.params
  try {
    const producto = await Producto.findByIdAndUpdate(
      id,
      { disponible: false },
      { new: true }
    )

    if (!producto) {
      return res.status(401).json({
        msg: "Token no válido - no existe.",
      })
    }
    res.status(200).json({ producto })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error del servidor" })
  }
}

export {
  crearProducto,
  getProducts,
  obtenerProducto,
  productoPUT,
  productoDelete,
}
