const express = require("express")
const router = express.Router()
const { Users, validateUser } = require("../models/userSchema")
const jwt = require("jsonwebtoken")
const { config } = require("dotenv")

config()

router.get("/", async (req, res) => {
    try {
        let users = await Users.find()
        if (!users.length) {
            return res.status(404).json({ state: false, msg: "Users are not found", innerData: users })
        }
        res.status(200).json({ state: true, msg: "Successfull", innerData: users })
    }
    catch {
        res.status(500).json({ state: false, msg: "Server error", innerData: [] })
    }
})
//sign up 
router.post("/sign-up", async (req, res) => {
    try {
        const { error } = validateUser(req.body)
        if (error) {
            return res.status(400).json({ state: false, msg: error.details[0].message, innerData: null })
        }
        let exactUser = await Users.findOne({ username: req.body.username })
        if (exactUser) {
            return res.status(400).json({ state: false, msg: "UserName has already been taken ", innerData: null })
        }
        let newUser = await Users.create(req.body)
        let savaUser = await newUser.save()
        res.status(201).json({ state: true, msg: "User is successfully created", innerData: savaUser })
    }
    catch {
        res.status(500).json({ state: false, msg: "Server error", innerData: [] })
    }
})

//sign in 
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body
        const exactUser = await Users.findOne({ username })
        if (!exactUser) {
            return res.status(400).json({ state: false, msg: "Username is incorrect", innerData: null })
        }
        if (password !== exactUser.password) {
            return res.status(400).json({ state: false, msg: "Password is incorrect", innerData: null })
        }
        const token = jwt.sign({ username }, process.env.TOKEN__PRIVATE__KEY)
        res.status(200).json({ state: true, msg: "sign-in", innerData: { user: exactUser, token } })
    }
    catch {
        res.status(500).json({ state: false, msg: "Server error", innerData: [] })
    }
})

module.exports = router