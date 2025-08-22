import express,{Application,Request,Response} from 'express'
import userRouter from './routes/userRoutes'
const app:Application = express()

const PORT = 8000

app.use(express.json())

app.get("/",(req:Request,res:Response) =>{
     res.json({msg:"Its working fine"})   
})

app.use('/api/v1/user',userRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})