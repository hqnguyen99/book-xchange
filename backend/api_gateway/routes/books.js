import express from 'express'
import db_connection from '../book_db.js'
import {verifyToken} from './verify_token.js'

const router = express.Router();

router.get('/allBooks', verifyToken, async (req, res) => {
    try{
        var books = await db_connection.query("select * from book_info", function (err, result) {
            if (err){
                return res.json({error: err.message})
            }
            else
                return res.json({books: result})
          });

        
    } catch (error){
        res.status(500).json({error:error.message})
    }
})

router.post('/addBook', verifyToken, async (req, res) => {
    try{
        const newUser = await db_connection.query('INSERT INTO book_info (isbn, title, author, edition, publisher, seller_id, price) VALUES ?',
            [[[req.body.isbn, req.body.title, req.body.author, req.body.edition, req.body.publisher, req.body.seller_id, req.body.price]]], 
            function (err, result){
                if(err)
                    return res.json({error: err.message})
                console.log("New book added for title - > " + req.body.title)
                return res.json({message:'Success'})
            })

        
    } catch (error){
        res.status(500).json({error:error.message})
    }
})

export default router