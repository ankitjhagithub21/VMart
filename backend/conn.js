const mongoose = require('mongoose')

const connectDb = async() =>{
    try{    
        mongoose.connect(process.env.DB_URL);
        console.log("Database connected.")
    }catch(error){
        console.log(error)
    }
}

module.exports = connectDb