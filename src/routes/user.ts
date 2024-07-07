import { Router } from 'express';
import { usuariosGet, usuariosPut, usuariosPost, usuariosDelete} from '../controllers/user';
import { check } from'express-validator';
//const {validarCampos} = require('../middlewares/validar-campos');
//const {validarJWT} = require('../middlewares/validar-jwt');
import { esRolValido, existeEmail, existeUsuarioID } from '../helpers/db-validators';
//const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

/*
import {validarCampos,
validarJWT,
tieneRole} from '../middlewares';*/

import   { validarCampos }   from '../middlewares/validar-campos';
import   { validarJWT }      from '../middlewares/validar-jwt';
import   { tieneRole }       from '../middlewares/validar-roles';


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
  tieneRole('admin_rol', 'ventas_rol'),
  check('id', 'No valid ID').isMongoId(),
  check('id').custom(existeUsuarioID),
  validarCampos
], usuariosDelete  );

export default router;