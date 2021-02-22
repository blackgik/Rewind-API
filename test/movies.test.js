const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/Model/MoviesModel')
const {userOne, userOneId, setUpDatabase} = require('./fixtures/db')

beforeEach(setUpDatabase)

test('creating a new movie', async()=> {
    const response = await request(app)
        .post('/movies/upload')
        .send({
            coverpics_url: 'www.moviechannel.com',
            movie_url: 'www.google.com',
            title: 'revengeof the gods',
            description: 'a god braight donw his wrought bcos man he loved betrayed him',
            release_date: '1998',
            cast: 'jennifer lopez',
            category: 'action',
            length: "",
        })
        .expect(201)
})