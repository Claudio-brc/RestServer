const { Router } = require ('express');
const { check } = require ('express-validator');
const { validarJWT, validarCampos, tieneRole  } = require('../middlewares');
const { crearProducto, obtenerProducto, productoPUT, productoDelete } = require('../controllers/productos');
const { obtenerProductos } = require('../controllers/productos');
const { existeUsuarioID, existePro, existeProductoPorId } = require('../helpers/db-validators');
const router = Router();

// all
router.get('/', obtenerProductos );

// one - validacion de id
router.get('/:id',[
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
    
]
, obtenerProducto );

// post logueado
router.post('/', [ validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('usuarioId', 'Usuario - No es un id de mongo válido').isMongoId(),
    check('usuarioId', 'El id usuario es obligatorio').not().isEmpty(), 
    check('categoriaId', 'Categoria - No es un id de mongo válido').isMongoId(),
    check('categoriaId', 'El id categoria es obligatorio').not().isEmpty(), 

    validarCampos
 ], crearProducto );

//actualizar logueado

router.put('/:id',[ validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),  
    check('id').custom(existeProductoPorId),
    validarCampos
 ], productoPUT );

 


router.delete('/:id',  [
    validarJWT,
    tieneRole('admin_rol'),
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),    
    validarCampos
  ], productoDelete  );





module.exports = router;