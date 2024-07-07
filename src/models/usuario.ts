import {Schema, model} from 'mongoose';
import {rol} from './rol';


interface usuario {
  nombre: string,
  correo: string,
  password: string,
  img: string,
  rol: Schema.Types.ObjectId,
  estado: boolean
}

const UsuarioSchema = new Schema({



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
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  },
  estado: {
    type: Boolean,
    default: true
  }

})


UsuarioSchema.methods.toJSON = function () {
  const { __v, password,_id, ...usuario  } = this.toObject();
  usuario.uID = _id;
  return  usuario;
}


export default model <usuario> ( 'Usuario', UsuarioSchema)


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