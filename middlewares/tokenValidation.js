const {verifyToken} = require('../common/jwt')

function validateTokenMiddleware(call,callback,next){
    const token = call.metadata.get('authorization')[0]

    if(!token){
        return callback({code:grpc.status.UNAUTHENTICATED,message:'no token found'})
    }
    const decodedToken = verifyToken(token)

    if(!decodedToken){
        return callback({code:grpc.status.UNAUTHENTICATED,message:'invalid token'})
    }
    const userId = decodedToken.userId
    call.request = userId
    console.log(userId)
    console.log(decodedToken)

    next()
}

module.exports = validateTokenMiddleware