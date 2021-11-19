import jwt from 'jsonwebtoken'

const getTokens = (email, login_id) =>{
    const user = {email, login_id}
    const access_token = jwt.sign(user, process.env.ACESS_KEY, {expiresIn: '10m'})
    const refresh_token = jwt.sign(user, process.env.REFRESH_KEY, {expiresIn:'10m'})
    const tokens = {access_token, refresh_token}
    return tokens
}

export {getTokens}