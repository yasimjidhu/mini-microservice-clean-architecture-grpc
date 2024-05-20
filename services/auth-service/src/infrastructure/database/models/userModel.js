const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

const Users = mongoose.model('Users',userSchema)
module.exports = Users