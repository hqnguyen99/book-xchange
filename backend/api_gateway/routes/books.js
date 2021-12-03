import express from 'express'
import {verifyToken} from './verify_token.js'
import http from 'http'

const router = express.Router();

router.get('/allBooks', verifyToken, async (req, res) => {
    const options = {
        hostname: 'EC2Co-EcsEl-IOMSFA68GT8U-758619912.us-east-1.elb.amazonaws.com',
        port: 3300,
        path: '/books/allBooks',
        method: 'GET'
      }
      let data = []
    const req1 = http.request(options, res1 => {
        console.log(`statusCode: ${res.statusCode}`)
            res1.on('data', d => {
                data.push(d)
            })
            res1.on('end', ()=>{
                console.log('returned allBooks')
                return res.status(200).json(JSON.parse(Buffer.concat(data).toString()))
            })
        })
    req1.on('error', errorr => {
        return res.status(500).json({error: errorr.message})
    })
    console.log(data)
    req1.end()
})

router.post('/addBook', verifyToken, async (req, res) => {
    const data = new TextEncoder().encode(
        JSON.stringify({
            isbn : req.body.isbn,
            title : req.body.title,
            author : req.body.author,
            edition : req.body.edition,
            publisher : req.body.publisher,
            seller_id : req.body.seller_id,
            price: req.body.price
        })
      )
      
      const options = {
        hostname: 'EC2Co-EcsEl-IOMSFA68GT8U-758619912.us-east-1.elb.amazonaws.com',
        port: 3300,
        path: '/books/addBook',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      var data1 = []
      const req1 = http.request(options, res1 => {
        console.log(`statusCode: ${res.statusCode}`)
      
        res1.on('data', d => {
            data1.push(d)
            res1.on('end', ()=>{
                console.log('added book with title ' + req.body.title)
                return res.status(200).json(JSON.parse(Buffer.concat(data1).toString()))
            })
        })
      })
      
      req1.on('error', error => {
        return res.status(500).json({error: errorr.message})
      })
      
      req1.write(data)
      req1.end()
})

router.get('/byID', verifyToken, async (req, res)=>{
    console.log(req.headers['id'])
    const options = {
        hostname: 'EC2Co-EcsEl-IOMSFA68GT8U-758619912.us-east-1.elb.amazonaws.com',
        port: 3300,
        path: '/books/byID',
        method: 'GET',
        headers: {
            'id' : req.headers['id']
        }
      }
    let data = []
    const req1 = http.request(options, res1 => {
        console.log(`statusCode: ${res.statusCode}`)
            res1.on('data', d => {
                data.push(d)
            })
            res1.on('end', ()=>{
                console.log('returned book byID')
                return res.status(200).json(JSON.parse(Buffer.concat(data).toString()))
            })
        })
    req1.on('error', errorr => {
        return res.status(500).json({error: errorr.message})
    })
    console.log(data)
    req1.end()
    
})


export default router