import { Schema, model} from 'mongoose';

export interface rol {
  rol: string
}

const RoleSchema = new Schema({
  rol: {
    type: String,
    required: [true, 'El rol es obligatorio']
  }
});



export default  model <rol>('Role', RoleSchema)