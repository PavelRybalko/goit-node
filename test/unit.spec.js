const fs = require('fs/promises')
const createFolder = require('../helpers/create-dir')
const { ErrorHandler } = require('../helpers/errorHandler')
const { HttpCode } = require('../helpers/constants')

jest.mock('fs/promises')

describe('Unit test create-dir.js', () => {
  fs.mkdir = jest.fn(() => {})

  it('run function true', async () => {
    fs.access = jest.fn().mockImplementation(() => Promise.resolve(true))
    await createFolder('test-unit')
    expect(fs.access('test-unit')).toBeDefined()
  })
})

describe('Unit test ErrorHandler.js', () => {
  it('get error', async () => {
    const res = new ErrorHandler(HttpCode.BAD_REQUEST, 'Error handler test')
    expect(res.status).toEqual(HttpCode.BAD_REQUEST)
  })
})
