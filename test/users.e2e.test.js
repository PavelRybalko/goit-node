const request = require('supertest')
const jwt = require('jsonwebtoken')
const fs = require('fs/promises')
require('dotenv').config()
const { User, newUser } = require('../model/__mocks__/data')
const app = require('../app')
const { HttpCode } = require('../helpers/constants')

const SECRET_KEY = process.env.JWT_SECRET_KEY
const issueToken = (payload, secret) => jwt.sign(payload, secret)
const token = issueToken({ id: User._id }, SECRET_KEY)
User.token = token

jest.mock('../model/contacts.js')
jest.mock('../model/users.js')
jest.mock('cloudinary')

describe('Testing the route auth/users & /users', () => {
  it('should return 201 status for registration', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(newUser)
      .set('Accept', 'application/json')

    expect(res.status).toEqual(HttpCode.CREATED)
    expect(res.body).toBeDefined()
  })
  it('should return 409 registration - email already used', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(newUser)
      .set('Accept', 'application/json')

    expect(res.status).toEqual(HttpCode.CONFLICT)
    expect(res.body).toBeDefined()
  })
  it('should return 200 login', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send(newUser)
      .set('Accept', 'application/json')

    expect(res.status).toEqual(HttpCode.OK)
    expect(res.body).toBeDefined()
  })
  it('should return 401 login', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'fake@test.com', password: 'password' })
      .set('Accept', 'application/json')

    expect(res.status).toEqual(HttpCode.UNAUTHORIZED)
    expect(res.body).toBeDefined()
  })
  it('should return 200 upload avatar', async () => {
    const buffer = await fs.readFile('./test/default-avatar.jpg')
    const res = await request(app)
      .patch('/users/avatars')
      .set('Authorization', `Bearer ${token}`)
      .attach('avatar', buffer, 'default-avatar.jpg')

    expect(res.status).toEqual(HttpCode.OK)
    expect(res.body).toBeDefined()
  })
  it('should return 200 get current', async () => {
    const res = await request(app)
      .get('/users/current')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(HttpCode.OK)
    expect(res.body).toBeDefined()
  })
  it('should return 204 logout', async () => {
    const res = await request(app)
      .post('/auth/logout')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(HttpCode.NO_CONTENT)
    expect(res.body).toBeDefined()
  })
})
