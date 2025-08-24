import { Request,Response } from 'express'
import prisma from '../config/db'
import cloudinary from '../config/cloudinary'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export  async function registerController(req:Request,res:Response){
      try {
        const { name, email, password} = req.body
        const file = req.file;
        if(!name || !email || !password || !file){
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
        const result = await cloudinary.uploader.upload(file.path,{
          folder:"profile_pics"
        })
       const hashedPassword = await bcrypt.hash(password,10)
       const createdUser = await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
                profilePic:result.secure_url
            }
        })

        const token = jwt.sign({id:createdUser.id},process.env.JWT_SECRET as string,{expiresIn:'7d'})
         res.cookie('token',token,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
       })
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
       res.cookie('token',token,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
       })
         return res.status(201).json({
          message:'user loggedIn successfully',
          token
        })
   } catch (error) {
       return res.status(500).json({message:'Internal Server error',error})
   }
}

export async function currentUser(req:Request,res:Response){
   try {
       const userId = req.user
       return res.status(200).json(userId)         
   } catch (error) {
      return res.status(500).json({message:'Internal server error'})
   }
}

export async function getAllUsers(req:Request,res:Response){
  try {
    const users = await prisma.user.findMany({
      where:{
        NOT:{
          id:req.user?.id
        }
      }
    })
    return res.status(200).json(users)
  } catch (error) {
    console.log(error)
     return res.status(500).json({
      message:'Internal server error'
     }) 
  }
}

