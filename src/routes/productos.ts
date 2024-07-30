import { Router } from "express"
import { check } from "express-validator"
import { validarJWT } from "../middlewares/validar-jwt"
import { validarCampos } from "../middlewares/validar-campos"
import { tieneRole } from "../middlewares/validar-roles"
import {
  crearProducto,
  obtenerProducto,
  productoPUT,
  productoDelete,
} from "../controllers/productos"
import { obtenerProductos } from "../controllers/productos"
import { existeProductoPorId } from "../helpers/db-validators"
const router = Router()

// all
router.get("/", obtenerProductos)

// one - validacion de id
router.get(
  "/:id",
  [
    check("id", "No es un id de mongo válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
)

// post logueado
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("usuario", "Usuario - No es un id de mongo válido").isMongoId(),
    check("usuario", "El id usuario es obligatorio").not().isEmpty(),
    check("categoria", "Categoria - No es un id de mongo válido").isMongoId(),
    check("categoria", "El id categoria es obligatorio").not().isEmpty(),

    validarCampos,
  ],
  crearProducto
)

//actualizar logueado

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  productoPUT
)

router.delete(
  "/:id",
  [
    validarJWT,
    tieneRole("admin_rol"),
    check("id", "No es un id de mongo válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  productoDelete
)

export default router
