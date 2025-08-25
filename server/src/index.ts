import express,{Application,Request,Response} from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import http from 'http'
import userRouter from './routes/userRoutes'
import messageRouter from './routes/messageRoutes'
import cookie from 'cookie-parser'
import prisma from './config/db'
const app:Application = express()

const server = http.createServer(app)

const PORT = 8000

app.use(express.json())
app.use(cookie())
app.use(cors({
     origin:'http://localhost:5173',
    credentials:true
}))
app.get("/",(req:Request,res:Response) =>{
     res.json({msg:"Its working fine"})   
})


app.use('/api/v1/user',userRouter)
app.use('/api/v1/message',messageRouter)

const io = new Server(server,{
    cors:{
    origin:'http://localhost:5173',
    credentials:true
    }
})

let onlineUsers: { [key: string]: string } = {};

io.on('connection', (socket) => {
  console.log('New Socket connected:', socket.id);

  socket.on('register', (userId: string) => {
    if (!userId) return;
    onlineUsers[userId] = socket.id;
    console.log('User registered:', userId, 'with socket:', socket.id);
  });

  socket.on('send_message', async ({ to, text, from }) => {
    try {
      console.log("Received send_message:", { to, text, from });

      // Save to DB
      const newMessage = await prisma.message.create({
        data: {
          message: text,
          senderId: from,
          receiverId: to
        }
      });

      // Send to receiver if online
      const receiverSocketId = onlineUsers[to];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receive_message', newMessage);
      }

      // Send back to sender so UI updates
      socket.emit('receive_message', newMessage);

    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  socket.on('disconnect', () => {
    for (let userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
        console.log('User disconnected:', userId);
        break;
      }
    }
  });
});


server.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})