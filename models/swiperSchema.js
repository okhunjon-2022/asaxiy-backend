const mongoose= require("mongoose")
const Joi = require("joi")

const swiperSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
})
const Swiper = mongoose.model("swiper",swiperSchema)

const validateSwiper=(body)=>{
   const schema =Joi.object({
    url:Joi.string().required(),
    title:Joi.string().required(),
    desc:Joi.string().required(),
   })
   return schema.validate(body)
}

module.exports={Swiper,validateSwiper}
