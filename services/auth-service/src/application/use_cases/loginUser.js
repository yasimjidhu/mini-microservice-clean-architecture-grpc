const jwt = require('jsonwebtoken')

async function loginUser(userRepository,email){
    const user = await userRepository.findByEmail(email)
    if(!user){
        throw new Error('user not found')
    }
    const token = jwt.sign({id:user.id,email:user.email},'yasim',{expiresIn:'1h'})
    return {token,user}
}

module.exports = {loginUser}