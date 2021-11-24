import express from 'express'
import db_connection from '../qurries.js'
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import {getTokens} from './jwt.js'
import mysql from 'mysql'

const router = express.Router()

router.post('/login', async (req, res) => {
    try {
        
        const {email, password} = req.body
        
        await db_connection.query('SELECT * FROM UserInfo WHERE email =' +  mysql.escape(email), async function(err, user){
            if(err)
                return res.status(401).json({error: err.message})
            console.log(user[0].password)
            if(user.length === 0 ){
                return res.status(401).json({error: "User not found"})
            }else{
                var is_pass = false
                try{
                    is_pass = await bcrypt.compare(password, user[0].password)

                }catch (error){
                    return res.status(401).json({error: "bcrypt error"})
                }
                if(is_pass){
                    var tokens = getTokens(user[0].email, user[0].login_id)
                    res.cookie('refreshToken', tokens.refresh_token)
                    return res.json({'accessToken' : tokens.access_token, 'refreshToken': tokens.refresh_token})
                }else{
                    return res.status(401).json({error: "Incorrect Password"})
                }
            }

        })
            
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