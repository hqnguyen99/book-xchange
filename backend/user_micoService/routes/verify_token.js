import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next)=>{
    if(req.headers['authorization'] && req.headers['authorization'].split(' ')[1]){
        const token = req.headers['authorization'].split(' ')[1]
        jwt.verify(token, process.env.ACESS_KEY, (error, found_user)=>{
            if(error)
                return res.status(403).json({error: error.message})
            else{
                req.user = found_user
                next()
            }
        })
    }else{
        return res.status(401).json({error: "No Token Found"})
    }
}



export {verifyToken}