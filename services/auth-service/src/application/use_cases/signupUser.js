const {createUser} = require('../../domain/entities/user')

async function signupUser(userRepository,userData){
    console.log('signup user usecase reached',userRepository)
    const user = createUser(null,userData.userName,userData.email,userData.password)
    return await userRepository.save(user)
}

module.exports = {signupUser}