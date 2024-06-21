import { Response } from 'express';
import Usuario from '../models/usuario';
import bcryptjs from 'bcryptjs';
import  { generarJWT } from '../helpers/generarJWT' 
import { MyRequest } from '../types';

const login = async (req: MyRequest, res: Response) => {

  const { correo, password} = req.body;



  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json(
        { msg: 'Usuario / Password no correctos - correo'}
      )
    }

    if (!usuario.estado) {
      return res.status(400).json(
        { msg: 'Usuario / Password no correctos - estado: false'}
      )
    }   

    const validPassword = bcryptjs.compareSync( password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / password no son correctos - password'
      });
    }
    
    const token = await generarJWT( usuario.id);

    res.json({
      usuario,
      token
    });

  } catch (error) {
    console.log(error)
    return res.json ({
      msg: 'algo salió mal.'
    }) 
  }
  
}

module.exports = {
    login
}