const mongoose=require("mongoose")
const Joi = require("joi")

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true 
    },
    url:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
})

const Product =mongoose.model("product",productSchema)

const validateProduct = (body)=>{
    const schema =Joi.object({
        title:Joi.string().required().min(3).max(255),
        price:Joi.number(),
        url:Joi.string().required(),
        desc:Joi.string().required().min(3).max(255),
        category:Joi.string().required().max(255),
    })
    return schema.validate(body)
}
module.exports={Product,validateProduct}