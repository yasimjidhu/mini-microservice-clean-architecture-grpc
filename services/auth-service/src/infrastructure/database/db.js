const mongoose = require('mongoose')
require('dotenv').config()

// const DBURL = process.env.AUTH_DB_URL 
const DBURL = 'mongodb+srv://dirshadyasim:yasimjidhu-users@users.pzw95dw.mongodb.net/Auth-db?retryWrites=true&w=majority&appName=Users' 

const connectDB = async ()=>{
    mongoose.connect(DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('auth service db connected')
    })
    .catch((err) => {
        console.error('auth service db failed with error', err)
    })
} 

module.exports = connectDB