const express = require("express")
const router =express.Router()
const {Swiper,validateSwiper} =require("../models/swiperSchema")


router.get("/",async(req,res)=>{
    try{
        let swipers = await Swiper.find()
        res.status(200).json({state:true,msg:"All swipers are found",innnerData:swipers})
    }
    catch{
        res.status(400).json({state:false,msg:"Server Error",innerData:null})
    }
})
router.post("/",async(req,res)=>{
    try{
        let {error} =validateSwiper(req.body)
        if(error){
            return res
            .status(401)
            .json({state:false,msg:`${error.message}`,innerData:null})
        }
        let {url,title,desc} =req.body
        let newSwiper=await Swiper.create({
            url,title,desc
        })
        let saveSwiper = await newSwiper.save()
        res.status(201).json({state:true,msg:"Swiper has been succesfully created",innerData:saveSwiper})
    }
    catch{
        res.status(400).json({state:false,msg:"Server Error",innerData:null})
    }
})
router.put("/:swID",async(req,res)=>{
    try{
        let {swID} =req.params
        let updateSwiper = await Swiper.findByIdAndUpdate(swID,req.body)
        res.status(202).json({state:true,msg:"Swiper has succesfully been updated",innnerData:updateSwiper})
    }
    catch{
        res.status(400).json({state:false,msg:"Server Error",innerData:null})
    }
})
router.delete("/:swID",async(req,res)=>{
    try{
        let {swID} =req.params
        let deleteSwiper = await Swiper.findByIdAndRemove(swID)
        res.status(200).json({state:false,msg:"Swiper has succesfully deleted",innerData:deleteSwiper})
    }
    catch{
        res.status(400).json({state:false,msg:"Server Error",innerData:null})
    }
})




module.exports =router