const jwt = require('jsonwebtoken')
const secret = 'yasim'
function generateToken({userName,id,expires}){
    const token = jwt.sign({userName:userName,userId:id},secret,{expiresIn:expires})
    return token
}

function verifyToken(token){
    try {
        const decoded = jwt.verify(token,secret)
        return decoded  
    } catch (error) {
        return null
    }    
}
module.exports = {
    generateToken,
    verifyToken
}
