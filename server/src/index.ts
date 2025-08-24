import express,{Application,Request,Response} from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes'
import cookie from 'cookie-parser'
const app:Application = express()

const PORT = 8000

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(cookie())
app.get("/",(req:Request,res:Response) =>{
     res.json({msg:"Its working fine"})   
})

app.use('/api/v1/user',userRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})