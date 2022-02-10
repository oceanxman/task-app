const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a posotive number')
            }
        }


    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }


    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLenght: 7,
        validate(value) {
            if (validator.contains(value.toLowerCase(), "password")) {
                throw new Error('password may not contain the word password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    console.log(user)
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

//hash password b4 saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'taskapp')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}
const User = mongoose.model('User', userSchema)

module.exports = User

