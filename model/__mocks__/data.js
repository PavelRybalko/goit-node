const contacts = [
  {
    _id: '5eb074232c30a1378dacdbda',
    name: 'New',
    email: 'test007@ex.ua',
    phone: '(992) 914-3792',
    subscription: 'free',
    password: 'password',
    token: null,
    owner: '604201f953b6652998dc8b92',
  },
  {
    _id: '5eb074232c30a1378dacdbdb',
    name: 'Newer',
    email: 'test005@ex.ua',
    phone: '(992) 915-3792',
    subscription: 'free',
    password: 'password',
    token: null,
    owner: '604201f953b6652998dc8b92',
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
  _id: '604201f953b6652998dc8b92',
  subscription: 'free',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDIwMWY5NTNiNjY1Mjk5OGRjOGI5MiIsImlhdCI6MTYxNTk5NjU4MiwiZXhwIjoxNjE2MDAzNzgyfQ.saVrMsSWtdtfYSb_ufuIZjcq4-1kxLMZUyJifTUolp4',
  avatar:
    'https://s.gravatar.com/avatar/d6ac26ce64657b23fce03f68f65dc6b4?s=250',
  avatarURL: null,
  email: 'example@example.com',
  password: '$2a$06$XrUGjIrADdPjqlRH3aPzdOcfEOzvpHaG.Ia3h.TCMUTzN61ZJa7D2',
  createdAt: '2020-03-10T00:05:44.937Z',
  updatedAt: '2021-03-10T00:05:44.937Z',
}

const users = []
users[0] = User

const newUser = { email: 'test@test.com', password: '123456' }

module.exports = { contacts, newContact, User, users, newUser }
