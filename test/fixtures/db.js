const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User =  require('../../src/Model/UserModel')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    email: 'barak@gmail.com',
    password: "carenot!!1234",
    confirmPassword: "carenot!!1234",
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

const setUpDatabase = async()=> {
    await User.deleteMany()
    await new User(userOne).save()
}

module.exports = {
    userOne,
    userOneId,
    setUpDatabase
}