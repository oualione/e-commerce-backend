const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema


const productSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
        maxlength : 120,
        minlength : 2,
        trim : true
    },
    description : {
        type : String,
        required : true,
        maxlength : 2000,
        minlength : 10
    },
    price : {
        type : Number,
        required : true,

    },
    quantity : {
        type : Number
    },
    photo : {
        data : Buffer,
        contentType: String,
    },
    category : {
        type : ObjectId,
        ref : 'Category',
        required : true
    },
    shipping : {
        type : Boolean,
        required : false,
        default : false
    },
    sold : {
        type : Number,
        default : 0
    }
    
},{timestamps : true})


module.exports = mongoose.model('Product', productSchema)