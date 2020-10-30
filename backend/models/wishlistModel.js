import mongoose from 'mongoose';
const wishListSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    Price:{
        type: String,
        required:true
    }

})