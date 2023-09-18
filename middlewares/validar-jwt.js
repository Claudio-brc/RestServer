const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response,next) => {
  
  const token = req.header('x-token');
  
  if (!token) {
    return res.status(401).json({msg: 'sin token!'});  
  }

  try {
    const { uid } =  jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    req.uid = uid;
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