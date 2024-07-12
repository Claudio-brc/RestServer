import jwt from "jsonwebtoken"

const generarJWT = (uid = ""): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { uid }

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY as string,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err)
          reject("no se pudo generar el token!")
        } else {
          resolve(token as string)
        }
      }
    )
  })
}

export  {
  generarJWT,
}
