const contacts = [
  {
    _id: '5eb074232c30a1378dacdbda',
    name: 'New',
    email: 'test007@ex.ua',
    phone: '(992) 914-3792',
    subscription: 'free',
    password: 'password',
    token: null,
    owner: '605edc3509d33a324494e122',
  },
  {
    _id: '5eb074232c30a1378dacdbdb',
    name: 'Newer',
    email: 'test005@ex.ua',
    phone: '(992) 915-3792',
    subscription: 'free',
    password: 'password',
    token: null,
    owner: '605edc3509d33a324494e122',
  },
]

const newContact = {
  _id: '604201f953b6652998dc8b97',
  name: 'Vasya',
  email: 'test111@gmail.com',
  phone: '(997) 914-3792',
  subscription: 'free',
  password: 'password',
  token: null,
}

const User = {
  _id: '605edc3509d33a324494e122',
  subscription: 'free',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNWVkYzM1MDlkMzNhMzI0NDk0ZTEyMiIsImlhdCI6MTYxNjgzMDY4NSwiZXhwIjoxNjE2ODM3ODg1fQ.-i-SB1I9euUN3oZqRPo8Vu2ozu_caYHAR3MIObvEoeg',
  avatarIdCloud: null,
  avatarURL:
    'https://s.gravatar.com/avatar/d6ac26ce64657b23fce03f68f65dc6b4?s=250',
  email: 'pustotaofficial@gmail.com',
  password: '$2a$06$.446AxlQRo4.GqcrwHfkiO96ND/cGgl2ProeNDzZCvHwzkyzEw2ei',
  verificationToken: null,
  createdAt: '2020-03-10T00:05:44.937Z',
  updatedAt: '2021-03-10T00:05:44.937Z',
}

const users = []
users[0] = User

const newUser = { email: 'test@test.com', password: '123456' }

module.exports = { contacts, newContact, User, users, newUser }
