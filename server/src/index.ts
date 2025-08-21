import express,{Application,Request,Response} from 'express'

const app:Application = express()

const PORT = 8000

app.get("/",(req:Request,res:Response) =>{
     res.json({msg:"Its working fine"})   
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})