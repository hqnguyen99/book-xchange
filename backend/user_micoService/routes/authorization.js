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
                throw err
            console.log(user[0].email)
            if(user.length === 0 ){
                console.log("haha " + user.rows.length)
                return res.status(401).json({error: "Email not found"})
            }else{
                var is_pass = await bcrypt.compare(password, user[0].password)
                if(is_pass){
                    var tokens = getTokens(user[0].email, user[0].login_id)
                    res.cookie('refreshToken', tokens.refresh_token)
                    return res.json({'accessToken' : tokens.access_token, 'refreshToken': tokens.refresh_token})
                }else{
                    return res.status(401).json({error: "Incorrect Password"})
                }
            }

            return result
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