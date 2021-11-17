import express from 'express'
import pool from '../qurries.js'
import bcrypt, { hash } from 'bcrypt'
import {verifyToken} from './verify_token.js'

const router = express.Router();

router.get('/all', verifyToken, async (req, res) => {
    try{
        var users = await pool.query('SELECT * FROM users')
        res.json({users: users.rows})
    } catch (error){
        res.status(500).json({error:error.message})
    }
})

router.post('/signup', async (req, res)=> {
    try{
        // console.log(req)
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await pool.query('INSERT INTO users (name, lastName, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
            [req.body.name, req.body.lastName, req.body.email, req.body.phone, hashedPassword])
            res.json({message:'Success'})
    }catch (error){
        res.status(500).json({error:error.message})
    }
})

export default router