const { Router } = require ('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete} = require('../controllers/user');
const { check } = require('express-validator');
const Role = require('../models/rol');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const { esRolValido, existeEmail, existeUsuarioID } = require('../helpers/db-validators');



const router = Router();

router.get('/', usuariosGet );

router.put('/:id', [
  check('id', 'No valid ID').isMongoId(),
  check('id').custom(existeUsuarioID),
  check('rol').custom( esRolValido ),
  validarCampos

], usuariosPut  );
  
router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe ser más de 6 letras').isLength({min:6}),
  check('correo', 'El correo no es válido').isEmail(),
  check('rol').custom( esRolValido ), 
  check('correo').custom( existeEmail),
  validarCampos
], usuariosPost);

router.delete('/:id',  [
  validarJWT,
  check('id', 'No valid ID').isMongoId(),
  check('id').custom(existeUsuarioID),
  validarCampos
], usuariosDelete  );

  module.exports = router;