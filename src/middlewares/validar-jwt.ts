import { Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { MyRequest } from "../types"
const Usuario = require("../models/usuario")

const validarJWT = async (
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token")

  if (!token) {
    return res.status(401).json({ msg: "sin token!" })
  }

  try {
    const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY as string)
    if (typeof payload === "object" && "uid" in payload) {
      const { uid } = payload

      // leer el usuario que corresponde al uid
      const usuario = await Usuario.findById(uid)

      req.uid = uid
      req.usuario = usuario
      next()
    } else {
      throw new Error("Token no valido")
    }
  } catch (error) {
    console.log(error)
    res.status(401).json({
      msg: "Token no válido",
    })
  }

  console.log(token)
}

module.exports = {
  validarJWT,
}
