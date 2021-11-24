import express from 'express'
import {verifyToken} from './verify_token.js'
import http from 'http'

const router = express.Router();

router.get('/all', verifyToken, async (req, res) => {

    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/user/all',
        method: 'GET'
      }
      let data = []
    const req1 = http.request(options, res1 => {
        console.log(`statusCode: ${res.statusCode}`)
            res1.on('data', d => {
                data.push(d)
            })
            res1.on('end', ()=>{
                console.log(Buffer.concat(data).toString())
                return res.status(200).json(JSON.parse(Buffer.concat(data).toString()))
            })
        })
    req1.on('error', errorr => {
        return res.status(500).json({error: errorr.message})
    })
    console.log(data)
    req1.end()
    
})

router.post('/signup', async (req, res)=> {
    const data = new TextEncoder().encode(
        JSON.stringify({
            login_id: req.body.login_id,
            password : req.body.password,
            email : req.body.email,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            address : req.body.address,
            postal_code : req.body.postal_code
        })
      )
      
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/user/signup',
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
                console.log(Buffer.concat(data1).toString())
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

export default router