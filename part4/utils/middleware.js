const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.log('Method:', request.method)
  logger.log('Path:  ', request.path)
  logger.log('Body:  ', request.body)
  logger.log('---')
  next()
}

const errorHandle = (error,request,response,next) => {
  logger.log(error.message)

  if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  errorHandle
}