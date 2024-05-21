const mongoose = require('mongoose')
require('dotenv').config()

const dburl = process.env.PRODUCT_DB_URL
console.log('product service db url',dburl)

const connectDB = async ()=> {

    mongoose.connect(dburl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:'product-db'
    
})
.then(()=>{
    console.log('product service db connected successfully')
})
.catch((err)=>{
    console.log(`error occured in product-service db ${err}`)
})
}

module.exports = connectDB