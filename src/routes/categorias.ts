import  { Router } from 'express';
import { check } from 'express-validator';

//import { validarJWT, validarCampos, tieneRole  } from '../middlewares';

import { validarJWT } from '../middlewares/validar-jwt';
import { validarCampos } from '../middlewares/validar-campos';
import { tieneRole } from '../middlewares/validar-roles';


import { crearCategoria } from '../controllers/categorias';
import { obtenerCategorias, obtenerCategoria, categoriaPUT, 
       categoriaDelete } from '../controllers/categorias';
import { existeCategoriaPorId } from '../helpers/db-validators';

const router = Router();

// all
router.get('/', obtenerCategorias );

// one - validacion de id
router.get('/:id',[
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
    
]
, obtenerCategoria );

// post logueado
router.post('/', [ validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos
 ], crearCategoria );

//actualizar logueado
router.put('/:id',[ validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
 ], categoriaPUT );


router.delete('/:id',  [
    validarJWT,
    tieneRole('admin_rol'),
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),    
    validarCampos
  ], categoriaDelete  );





export default router;