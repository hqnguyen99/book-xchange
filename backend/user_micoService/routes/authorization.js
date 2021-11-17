import express from 'express'
import pool from '../qurries.js'
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
// import { getUsers } from '../queries.js'
import {getTokens} from './jwt.js'

const router = express.Router()

router.post('/login', async (req, res) => {
    try {
        
        const {email, password} = req.body
        const user= await pool.query('SELECT * FROM users WHERE email = $1', [email])
        console.log(user.rows.length)
        if(user.rows.length === 0 ){
            console.log("haha " + user.rows.length)
            return res.status(401).json({error: "Email not found"})
        }else{
            var is_pass = await bcrypt.compare(password, user.rows[0].password)
            if(is_pass){
                var tokens = getTokens(user.rows[0].email, user.rows[0].phone)
                res.cookie('refreshToken', tokens.refresh_token)
                return res.json({'accessToken' : tokens.access_token, 'refreshToken': tokens.refresh_token})
            }else{
                return res.status(401).json({error: "Incorrect Password"})
            }
        }
            
    }catch (error){
        res.status(401).json({error : error.message})
    }
    
})

router.get('/refreshToken', (req, res)=>{
    try {
        const refresh_token = req.cookies.refreshToken
        if(refresh_token !== null){
            jwt.verify(refresh_token, process.env.REFRESH_KEY, (error, found_user)=>{
                if(error)
                    return res.status(403).json({error:error.message})
                else{
                    var tokens = getTokens(found_user.email, found_user.phone)
                    res.cookie('refreshToken', tokens.refresh_token, {httpOnly:true})
                    return res.status(200).json({'accessToken' : tokens.access_token, 'refreshToken': tokens.refresh_token})
                }
            })
        }else{
            res.status(401).json({error: 'Refresh token not found!'})
        }
    }catch (error){
        res.status(401).json({error : error.message})
    }
})

export default router;