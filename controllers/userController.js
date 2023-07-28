const sendEmail = require('../utils/sendEmail')
const Token = require('../models/token')
const {User, validate} = require('../models/user')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const registerUser = async (req, res) => {
    try {
        const {error} = validate(req.body)
        const {username, email, password} = req.body
        if (error) return res.status(400).send(error.details[0])

        let user = await User.findOne({email})
        if (user) {
            return res.status(409).send({message: 'The email has already been taken'})
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            username, email, password: hashedPassword
        })

        const token = await Token.create({
            userId: newUser._id,
            token: crypto.randomBytes(32).toString('hex')
        })

        const url = `${process.env.BASE_URL}users/${newUser._id}/verify/${token.token}`

        await sendEmail(email, 'Verify Email', url)

        res.status(201).send({message: 'An Email has been sent to your account please verify'})

    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Internal Server Error'})
    }
}

const verifyEmailToken = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id})
        if (!user) return res.status(400).send({message: 'Invalid link'})

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        })

        if (!token) return res.status(400).send({message: 'Invalid link'})

        await User.updateOne({_id: user._id, verified: true})
        await Token.findByIdAndRemove(token._id)

        res.status(200).send({message: 'Email verified Successfully!'})

    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }
}

module.exports = {registerUser, verifyEmailToken}