const request = require('supertest')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { User, contacts, newContact } = require('../model/__mocks__/data')
const app = require('../app')
const { HttpCode } = require('../helpers/constants')

const SECRET_KEY = process.env.JWT_SECRET_KEY
const issueToken = (payload, secret) => jwt.sign(payload, secret)
const token = issueToken({ id: User._id }, SECRET_KEY)
User.token = token

jest.mock('../model/users.js')
jest.mock('../model/contacts.js')

describe('Testing the route /contacts', () => {
  let idNewContact
  describe('Should handle get request', () => {
    it('should return 200 status for get all contacts', async () => {
      const res = await request(app)
        .get('/contacts')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(HttpCode.OK)
      expect(res.body).toBeDefined()
      expect(res.body.data.contacts).toBeInstanceOf(Array)
    })
    it('should return 200 status by id', async () => {
      const contact = contacts[0]
      const res = await request(app)
        .get(`/contacts/${contact._id}`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(HttpCode.OK)
      expect(res.body).toBeDefined()
      expect(res.body.data.contact).toHaveProperty('_id')
      expect(res.body.data.contact._id).toBe(contact._id)
    })
    it('should return 404 status by wrong id', async () => {
      const wrongID = 12345
      const res = await request(app)
        .get(`/contacts/${wrongID}`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(HttpCode.NOT_FOUND)
      expect(res.body).toBeDefined()
    })
  })
  describe('Should handle post request', () => {
    it('should return 201 status for create contact', async () => {
      const res = await request(app)
        .post('/contacts')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send(newContact)

      expect(res.status).toEqual(HttpCode.CREATED)
      expect(res.body).toBeDefined()
      expect(res.body.data.contact._id).toBe(newContact._id)
      idNewContact = res.body.data.contact._id
    })
    it('should return 400 status for wrong field', async () => {
      const res = await request(app)
        .post('/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...newContact, test: 1 })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(HttpCode.BAD_REQUEST)
      expect(res.body).toBeDefined()
    })
    it('should return 400 status without first required field', async () => {
      const res = await request(app)
        .post('/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send({ email: 'asdaw@asd.ru' })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(HttpCode.BAD_REQUEST)
      expect(res.body).toBeDefined()
    })
    it('should return 400 status without second required field', async () => {
      const res = await request(app)
        .post('/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send({ password: 'password' })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(HttpCode.BAD_REQUEST)
      expect(res.body).toBeDefined()
    })
  })
  describe('Should handle patch request', () => {
    it('should return 200 status for update contact', async () => {
      const res = await request(app)
        .patch(`/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ email: 'new@mail.com' })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(HttpCode.OK)
      expect(res.body).toBeDefined()
      expect(res.body.data.contact.email).toBe('new@mail.com')
    })
    it('should return 400 status for wrong field', async () => {
      const res = await request(app)
        .patch(`/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ test: 1 })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(HttpCode.BAD_REQUEST)
      expect(res.body).toBeDefined()
    })
    it('should return 404 status with wrong id', async () => {
      const wrongID = 12345
      const res = await request(app)
        .patch(`/contacts/${wrongID}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ email: 'asdaw@aasd.com' })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(HttpCode.NOT_FOUND)
      expect(res.body).toBeDefined()
    })
  })
  describe('Should handle delete request', () => {
    it('should delete contact by id', async () => {
      const res = await request(app)
        .delete(`/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(HttpCode.OK)
      expect(res.body).toBeDefined()
    })
    it('should delete contact by wrong id', async () => {
      const res = await request(app)
        .delete(`/contacts/1`)
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(HttpCode.NOT_FOUND)
      expect(res.body).toBeDefined()
    })
  })
})
