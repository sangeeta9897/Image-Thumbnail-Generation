import jwt from 'jsonwebtoken'
import Utils from './utils'
import Logger from './logger'
// eslint-disable-next-line no-unused-vars
import babelPolyfill from 'babel-polyfill'

const utils = new Utils()
const logger = new Logger()

export default class Authentication {
  signIn (req, res) {
    try {
      const username = req.body.username
      const payload = {
        username: username
      }
      var token = jwt.sign(payload, 'abcd', {
        expiresIn: 24 * 60 * 60
      })
      logger.logInfo('Sign in sucessfully and token generated')
      res.send(utils.response(200, token))
    } catch (err) {
      logger.logError(utils.response(400, 'Please try again, token error'))
      res.send(Utils.response(500, 'Please try again, token error'))
    }
  }

  tokenVerification (req, res, next) {
    var token = req.headers.token
    if (token) {
      var valid = false
      jwt.verify(token, 'abcd', (err, decode) => {
        if (err == null) {
          valid = true
        }
      })
      if (valid) {
        next()
      } else {
        logger.logError(utils.response(400, 'Session Expired'))
        return res.status(400).send(utils.response(400, 'Session Expired'))
      }
    } else {
      logger.logError(utils.response(400, 'Token not provided'))
      return res.status(400).send(utils.response(400, 'Token not provided'))
    }
  }
}
