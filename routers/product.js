const express=require("express")
const router = express.Router()
const {Product,validateProduct}= require("../models/productSchema")

router.get("/", async(req,res)=>{
    try{
        let products = await Product.find()
    
        res.status(200).json({state:true,msg:"All products are found",innerData:products})
    }
    catch{
        res.status(400).json({ state: false, msg: "Server Error", innerData: null })
    }
})

router.post("/",async(req,res)=>{
    try{
        let {error} =validateProduct(req.body)
        if(error){
            return res
            .status(401)
            .json({ state: false, msg: `${error.message}, `, innerData: null });
        }
        let {title,price,url,desc,category} = req.body
        let newProduct = await Product.create({
            title,price,url,desc,category
        })
        let saveProduct =  await newProduct.save()
        res.status(201).json({state:true,msg:"Product has succesfully been created",innerData:saveProduct})
    }
    catch{
        res.status(500).json({ state: false, msg: "Server Error", innerData: null })
    }
})

router.put("/:proID",async(req,res)=>{
    try{
        let {proID} =req.params
        let updatePro=await Product.findByIdAndUpdate(proID,req.body)
        res.status(202).json({state:true,msg:"Product has succesfully been updated",innerData:updatePro})
    }
    catch{
        res.status(400).json({ state: false, msg: "Server Error", innerData: null })
    }
})

router.delete("/:proID",async(req,res)=>{
    try{
        let {proID} = req.params
        let deleteProduct = await Product.findByIdAndRemove(proID)
        res.status(200).json({state:false,msg:"Product has succesfully deleted",innerData:deleteProduct})
    }
    catch{
        res.status(400).json({ state: false, msg: "Server Error", innerData: null })
    }
})


module.exports=router