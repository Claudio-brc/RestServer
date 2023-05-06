const { response, request } = require('express');

const usuariosGet = (req = request, res = response)  => {

    const {q, nombre = 'no_name', apikey, page, limit} = query = req.query;
      
    res.json(
        {
          msg: 'get API - Controlador',
          q, nombre, apikey, page, limit
        }
        )
  }

const usuariosPut = (req, res) => {
    const id = req.params.id;
    
    res.status(400).json(
        {
          msg: 'put API - Controlador',
          id
        }
        )
  } 
  
const usuariosPost =  (req, res) => {

    const { nombre, edad } = req.body;

    res.status(201).json(
        {
          msg: 'post API ',
          nombre, edad, msg2:'vevo'
        }
        )
  }  

const usuariosDelete =  (req, res) => {
    res.status(201).json(
        {
          msg: 'delete API - controller'
        }
        )
  }

  module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete 
  }