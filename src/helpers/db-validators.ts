import Usuario   from "../models/usuario";
import Categoria from "../models/categoria";
import Producto from "../models/producto";


const existeEmail = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo })

  if (existeEmail) {
    throw new Error(`correo ya registrado!`)
  }
}

const existeUsuarioID = async (id: string) => {
  const existeUsuario = await Usuario.findById(id)
  if (!existeUsuario) {
    throw new Error(`el ID No existe!`)
  }
}

const existeCategoriaPorId = async (id: string) => {
  const existeCategoria = await Categoria.findById(id)
  if (!existeCategoria) {
    throw new Error(`el ID No existe!`)
  }
}

const existeProductoPorId = async (id: string ) =>{
  
  const existeProducto =  await Producto.findById(id);
  if (!existeProducto){
    throw new Error (`el ID del producto No existe!`)

  }
}


export  {
  existeEmail,
  existeUsuarioID,
  existeCategoriaPorId,
  existeProductoPorId
}
