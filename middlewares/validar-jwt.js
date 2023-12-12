const {response, request} = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req, res = response,next) => {
  
  const token = req.header('x-token');
  
  if (!token) {
    return res.status(401).json({msg: 'sin token!'});  
  }

  try {
    const { uid } =  jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    
    // leer el usuario que corresponde al uid
    const usuario= await Usuario.findById(uid);

   req.uid = uid;
   req.usuario = usuario;
    next(); 
  } catch(error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no válido'    
    })

  }

  console.log(token);
  
}

module.exports = {
    validarJWT
}