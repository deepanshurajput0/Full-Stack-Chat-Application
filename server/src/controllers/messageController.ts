import { Request, Response } from 'express'
import prisma from '../config/db'
export async function getMessages(req:Request,res:Response){
    try {
        const { id } = req.params
        if(!id && !req.user?.id){
         return res.status(400).json({ error: "userId and otherUserId are required" });
        }
      const messages = await prisma.message.findMany({
        where:{
           OR:[
            {
                senderId:req.user?.id,
                receiverId: Number(id)
            },{
                senderId:Number(id),
                receiverId: req.user?.id
            }
           ]
        },
        orderBy:{
            createdAt:'asc'
        }
      })
      return res.status(200).json(messages)
    } catch (error) {
       res.status(500).json({ error: 'Internal Server Error' }); 
    }
}


