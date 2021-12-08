import express, {json}  from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoutes.js'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000
const corsOpts = {crendentials:true, origin: process.env.URL || '*'}

app.use(cookieParser())


app.use(cors(corsOpts))
app.use(json())

app.use('/user', userRouter)

app.listen(3000, ()=>{console.log(`server is listening on Satnam ${PORT}`)})
