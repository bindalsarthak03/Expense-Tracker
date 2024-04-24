const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    amount:{
        type:Number,
        required:true,
        trim:true,
        maxLength:20
    },
    type:{
        type:String,
        default:'expense',
    },
    date:{
        type:Date,
        required:true,
    },
    category:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        maxLength:40,
        trim:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    }
},{timestamps:true})

module.exports=mongoose.model('Expense',ExpenseSchema)