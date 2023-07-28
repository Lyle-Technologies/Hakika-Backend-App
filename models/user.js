const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    username: {
        type: String,
        min: 3,
        max: 255,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
      type: String,
      required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
}

const User = mongoose.model('user', userSchema)

const validate = (user) => {

    const schema = Joi.object({
        username: Joi.string().min(3).max(255).required().label('Username'),
        email: Joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password')
    })
    return schema.validate(user)
}

module.exports = {User, validate}