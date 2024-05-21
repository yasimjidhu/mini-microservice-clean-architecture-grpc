const mongoose = require('mongoose')
require('dotenv').config()

// const DBURL = process.env.AUTH_DB_URL 
const DBURL =  process.env.AUTH_DB_URL 

const connectDB = async ()=>{
    mongoose.connect(DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName:'Auth-db'
    })
    .then(() => {
        console.log('auth service db connected')
    })
    .catch((err) => {
        console.error('auth service db failed with error', err)
    })
} 

module.exports = connectDB