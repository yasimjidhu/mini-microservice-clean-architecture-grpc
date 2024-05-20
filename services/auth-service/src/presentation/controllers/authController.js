const {signupUser} = require('../../application/use_cases/signupUser')
const {loginUser} = require('../../application/use_cases/loginUser')
function createAuthController(userRepository){
    async function signup(req,res){
        try {
            const user = await signupUser(userRepository,req.body)
            res.json(user)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

async function login(req,res){
    try {
        const {email,password} = req.body
        const result = await loginUser(userRepository,email,password)
        res.json(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

return {signup,login}

}

module.exports = {createAuthController}