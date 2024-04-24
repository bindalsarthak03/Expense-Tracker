const mongoose= require("mongoose");
require('dotenv').config()
const db = async () => {
    try{
        mongoose.set('strictQuery',false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to database")
    }catch(err){
        console.log(err);
    }
}

module.exports={db}