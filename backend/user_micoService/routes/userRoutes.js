import express from 'express'
import db_connection from '../qurries.js'
import bcrypt from 'bcrypt'
import {verifyToken} from './verify_token.js'

const router = express.Router();

router.get('/all', verifyToken, async (req, res) => {
    try{
        var users = await db_connection.query('SELECT * FROM UserInfo', function (err, result) {
            if (err) throw err;
            else
                res.json({users: result})
          });
    } catch (error){
        res.status(500).json({error:error.message})
    }
})

router.post('/signup', async (req, res)=> {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await db_connection.query('INSERT INTO UserInfo (login_id, password, email, first_name, last_name, address, postal_code) VALUES ?',
            [[[req.body.login_id, hashedPassword, req.body.email, req.body.first_name, req.body.last_name, req.body.address, req.body.postal_code]]], 
            function (err, result){
                if(err)
                    throw err
                res.json({message:'Success'})
            })
    }catch (error){
        res.status(500).json({error:error.message})
    }
})

export default router