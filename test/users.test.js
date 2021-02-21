const request = require('supertest');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app');
const User = require('../src/Model/UserModel');

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

beforeEach(async ()=> {
    // console.log('before each')2
    await User.deleteMany()
    await new User(userOne).save()
})


// testing for a new user
test('signup a new user', async()=> {
    const response = await request(app).post('/users/sign-up').send({
        email:'benard@gmail.com',
        password: 'ben123nard!',
        confirmPassword: 'ben123nard!'
    }).expect(201)

    const user = await User.findById(response.body.newUser._id)
    expect(user).not.toBeNull()

})

test('signup a new admin', async()=> {
    const response = await request(app).post('/users/admin-sign-up').send({
        email: 'guster@gmail.com',
        password: 'bpgud1234!!!',
        confirmPassword: 'bpgud1234!!!'
    }).expect(201)

    // asserting that the user data base 
    const user = await User.findById(response.body.newUser._id)
    expect(user).not.toBeNull()

})

test('singup a new user with wrong credentials', async()=> {
    await request(app).post('/users/admin-sign-up').send({
        email:"ben.gmail.com",
        password:"fafdadadcadcad",
        confirmPassword: "adadcadscasdcasd"
    }).expect(500)
});

test('login users (correct credentials)', async ()=> {
    await request(app).post('/users/login').send({
        email: 'barak@gmail.com',
        password: 'carenot!!1234'
    }).expect(202)
})

test('viewing users profile', async() => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
})

test('viewing profilw without authentication', async()=> {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('deleting authenticating user', async()=> {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('deleting without authentication', async()=> {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})