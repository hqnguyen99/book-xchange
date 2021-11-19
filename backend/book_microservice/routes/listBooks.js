import express from 'express'
import db_connection from '../db_connection.js'

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        var books = await db_connection.query("select * from book_info", function (err, result) {
            if (err) throw err;
            else
                res.json({books: result})
          });

        
    } catch (error){
        res.status(500).json({error:error.message})
    }
})

export default router