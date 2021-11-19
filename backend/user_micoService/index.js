import express, {json}  from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authorization.js'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000
const corsOpts = {crendentials:true, origin: process.env.URL || '*'}

app.use(cookieParser())


app.use(cors(corsOpts))
app.use(json())

app.use('/user', userRouter)
app.use('/auth', authRouter)

app.listen(PORT, ()=>{console.log(`server is listening on ${PORT}`)})
