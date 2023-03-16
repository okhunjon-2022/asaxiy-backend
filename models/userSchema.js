const mongoose = require("mongoose")
const Joi = require("joi")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Users =mongoose.model("user", userSchema)

const validateUser = (body) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
    })
    return schema.validate(body)
}
module.exports = { Users, validateUser }