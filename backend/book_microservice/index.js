import express, {json}  from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import listBooksRouter from './routes/listBooks.js'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3300
const corsOpts = {crendentials:true, origin: process.env.URL || '*'}

app.use(cookieParser())

app.use(cors(corsOpts))
app.use(json())

app.use('/books', listBooksRouter)

app.listen(3300, ()=>{console.log(`server is listening on ${PORT}`)})