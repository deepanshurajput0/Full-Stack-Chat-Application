import { Request,Response } from 'express'
import prisma from '../config/db'
export  async function registerController(req:Request,res:Response){
      try {
        const { name, email, password, profilePic } = req.body
        if(!name || !email || !password || !profilePic){
          res.status(400).json({message:'All Fields are required'})
        }
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(user){
            res.status(400).json({message:'User Already exists try new email'})
        }
       const createdUser = await prisma.user.create({
            data:{
                name,
                email,
                password,
                profilePic
            }
        })
        if(createdUser){
            res.status(200).json({message:'User registered successfully'})
        }
      } catch (error) {
        res.status(500).json({message:'Internal Server error'})
      }
}


