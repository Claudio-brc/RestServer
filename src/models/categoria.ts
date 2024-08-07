import { Schema, model} from 'mongoose';


interface Categoria {
  nombre:  string;
  estado:  boolean;
  usuario: Schema.Types.ObjectId;


}

const CategoriaSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true
  },
  estado: {
    type: Boolean,
    default: true,
    required: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
});



export default model<Categoria>('Categoria', CategoriaSchema);