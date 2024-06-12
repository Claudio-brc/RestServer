const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({


  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },

  correo: {
    type: String,
    required: [true, 'el correo obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria gato']
  },
  img: {
    type: String
  },
  rol: {
    type: String,
    required: true
  },
  estado: {
    type: Boolean,
    default: true
  },
  estado: {
    type: Boolean,
    default: false
  }  

})


UsuarioSchema.methods.toJSON = function () {
  const { __v, password,_id, ...usuario  } = this.toObject();
  usuario.uID = _id;
  return  usuario;
}


module.exports = model( 'Usuario', UsuarioSchema)


/*
{
  name: 'pepe',
  correo: 'pepe@queteimporta.com',
  password: '123456',
  img: '24234',
  role: 'rol233',
  state: false,
  google: false

}
*/