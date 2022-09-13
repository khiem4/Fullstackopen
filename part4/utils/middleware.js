const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  request.token = null

  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}

const userExtractor = async (request, response, next) => {
  if(!request.token) {
    return response.status(401).json({
      error: 'token is missing'
    })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  request.user = await User.findById(decodedToken.id)
  next()
}

const errorHandle = (error,request,response,next) => {
  logger.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).json({ error: 'wrong id' })
  }
  if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }


  next(error)
}

module.exports = {
  requestLogger,
  errorHandle,
  tokenExtractor,
  userExtractor
}