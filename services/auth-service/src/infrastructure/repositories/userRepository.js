const UserModel = require('../database/models/userModel')

async function save(user){
    const userModel = new UserModel(user)
    await userModel.save()
    return userModel.toObject()
}

async function findByEmail(email){
    const userModel = await UserModel.findOne({email})
    return userModel ? userModel.toObject() : null
}

module.exports = {save,findByEmail}