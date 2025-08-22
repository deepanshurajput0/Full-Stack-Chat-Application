import { Request,Response } from 'express'
import prisma from '../config/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export  async function registerController(req:Request,res:Response){
      try {
        const { name, email, password, profilePic } = req.body
        if(!name || !email || !password || !profilePic){
          return res.status(400).json({message:'All Fields are required'})
        }
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(user){
            return res.status(400).json({message:'User Already exists try new email'})
        }
       const hashedPassword = await bcrypt.hash(password,10)
       const createdUser = await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
                profilePic
            }
        })

        const token = jwt.sign({id:createdUser.id},process.env.JWT_SECRET as string,{expiresIn:'7d'})
          return res.status(201).json({
          message:'user created successfully',
          token
        })
      } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal Server error',error})
      }
}

export async function loginController(req:Request,res:Response){
   try {  
      const { email, password } = req.body
      if(!email || !password){
         return res.status(400).json({message:'All fields are required'})    
      }
      const user = await prisma.user.findUnique({where:{
        email
      }})
      if(!user){
       return res.status(400).json({message:'Incorrect user & password'})
      }
      const isMatch = await bcrypt.compare(password,user.password)
      if(!isMatch){
        return res.status(400).json({message:'Incorrect user & password'})
      }
      const token = jwt.sign({id:user.id},process.env.JWT_SECRET as string,{expiresIn:'7d'})
         return res.status(201).json({
          message:'user loggedIn successfully',
          token
        })
   } catch (error) {
       return res.status(500).json({message:'Internal Server error',error})
   }
}