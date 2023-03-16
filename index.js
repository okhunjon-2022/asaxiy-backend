const express = require("express")
const app=express()
const mongoose =require("mongoose")
const {config} =require("dotenv")
const cors = require("cors")

config()
app.use(express.json())
app.use(cors())

mongoose.set("strictQuery", true)
.connect(process.env.MONGODB_URL)
.then(() => console.log("MongoDB is connected"))
.catch(() => console.log("MongoDB is not connected"))

app.get("/",async(req,res)=>{
    res.json("Running")
})

//Routers
const Product = require("./routers/product")
const Swiper = require("./routers/swiper")
const Users =require("./routers/users")

app.use("/product",Product)
app.use("/swiper",Swiper)
app.use("/users",Users)






const PORT= process.env.PORT || 9000
app.listen(PORT,()=>console.log(PORT + ' is listened'))
