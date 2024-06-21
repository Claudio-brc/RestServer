import { Response,  NextFunction } from 'express';
import { MyRequest } from '../types';


const esAdminRole = ( req: MyRequest, res: Response , next: NextFunction ) =>{
  
  if (!req.usuario) {
    return res.status(500).json({
        msg: 'usuario no valido1'
    })
  }  
  
  const { rol, nombre } = req.usuario;
  
  if ( rol !== 'admin_role') {
    return res.status(401).json({
      msg: `${ nombre } no es administrador`  
    })
  }

  next();
}

const tieneRole = (... roles: string[] ) => {
  return (req: MyRequest, res:  Response, next: NextFunction) => {
    if (!req.usuario) {
      return res.status(500).json({
          msg: 'usuario no valido1'
      })
    }  

    if ( !roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${ roles }`
      })  
    }
    next();
  }
}

module.exports = {
    esAdminRole,
    tieneRole
}