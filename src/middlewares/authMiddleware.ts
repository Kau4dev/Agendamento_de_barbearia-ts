import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string; 
        
      };
    }
  }
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  
  const authHeader = req.headers['authorization'];
  
  
 
  const token = authHeader && authHeader.split(' ')[1];

  
  if (token == null) {
    return res.status(401).json({ error: 'Token não fornecido' }); 
  }

  
  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    
    
    if (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado' }); 
    }

    
    req.user = user;

   
    next();
  });
}