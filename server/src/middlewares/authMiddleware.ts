import {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../config/db'

export async function authMiddleware (req:Request,res:Response,next:NextFunction){
      interface JwtPayload {
        id:number
      }
    try {
        const token = req.cookies.token
        if(!token){
          return res.status(400).json({message:'No token is provided'})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload
        if(!decoded || !decoded.id){
           return res.status(401).json({
            message:'Invalid token'
           })
        }
        req.user   = await prisma.user.findUnique({where:{
            id:decoded.id 
        }})
         next()
    } catch (error) {
        return res.status(401).json({message:'Interval Server Error'}) 
    }
}




