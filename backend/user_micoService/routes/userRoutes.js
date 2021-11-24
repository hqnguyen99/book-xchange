import express from 'express'
import db_connection from '../qurries.js'
import bcrypt from 'bcrypt'

const router = express.Router();

router.get('/all', async (req, res) => {
    try{
        var users = await db_connection.query('SELECT * FROM UserInfo', function (err, result) {
            if (err){
                return res.json({error: "sql call error"})
            }
            else
                return res.json({users: result})
          });
    } catch (error){
        res.status(500).json({error:error.message})
    }
})

router.post('/signup', async (req, res)=> {
    try{
        console.log('Satnam ' )
        const hashedPassword  = await bcrypt.hash(req.body.password, 10)
        await db_connection.query('INSERT INTO UserInfo (login_id, password, email, first_name, last_name, address, postal_code) VALUES ?',
            [[[req.body.login_id, hashedPassword, req.body.email, req.body.first_name, req.body.last_name, req.body.address, req.body.postal_code]]], 
            function (err, result){
                if(err)
                    return res.json({error: err.message})
                console.log("New user added for login_id - > " + req.body.login_id)
                return res.json({message:'Success'})
        })
    }catch (error){
        console.log(error)
        return res.status(500).json({error:error.message})
        
    }
})

export default router