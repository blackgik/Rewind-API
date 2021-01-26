const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('../db/mongoose')


// creating the user schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email address')
            }
        }
    },

    password: {
        type: String,
        trim: true,
        minlength: 6,
        reequired: true,

        validate(value) {
            if(value.includes('password' || 'PASSWORD')) {
                throw new Error('password is too simple')
            }
        }
    },

    confirmPassword: {
        type: String,
        trim: true,
        required: true,
        minlength: 6,
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

    emailToken: {
        type: String
    },

    passwordToken: {
        type:String,
        default:''
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        default: 'users',
        enum: ['users', 'admin']    
    },

    avatar: {
        type: Buffer,
    }
}, {
    timestamps: true
})

// hide certain details like password tokens etc 
UserSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

   delete userObject.password
   delete userObject.tokens
   delete userObject.emailToken
   delete userObject.confirmPassword
   delete userObject.passwordToken
   delete userObject.avatar
   
   return userObject
}

// verify user login
UserSchema.statics.findByCredentials = async (username, password)=> {
    const user = await User.findOne({ username })

    if(!user) {
        throw new Error('invalid user login details')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('invalid user login details')
    }

    return user
}

// generating token for authentication
UserSchema.methods.generateAuthToken = async function(){
    const user = this;

    const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token;
}

// hashing the password and confirmation of password
UserSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')){
        if (user.password === user.confirmPassword){
            user.password = await bcrypt.hash(user.password, 8)
        }else{
            throw new Error('passwords do not match')
        }
    }

    next()
})
// serving the model to the database
const User = mongoose.model('User', UserSchema)


// exporting the User model
module.exports = User;