import mongoose from 'mongoose';

const dbConnection = async() => {
  try
  {
     await mongoose.connect ( process.env.MONGODB_CNN!);

     console.log('base de datos online!');

  } catch (error){
    console.log(error);
    throw new Error('error al iniciar')
  }
} 

export {
    dbConnection
}