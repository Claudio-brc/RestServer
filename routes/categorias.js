const { Router } = require ('express');
const { check } = require ('express-validator');
const { validarJWT, validarCampos, tieneRole  } = require('../middlewares');
const { crearCategoria } = require('../controllers/categorias');
const { obtenerCategorias, obtenerCategoria, categoriaPUT, 
       categoriaDelete } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
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





module.exports = router;