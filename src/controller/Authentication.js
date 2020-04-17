import jwt from 'jsonwebtoken'
import Utils from './utils'
import Logger from './logger'
import env from 'dotenv'
// eslint-disable-next-line no-unused-vars
import babelPolyfill from 'babel-polyfill'
const utils = new Utils()
const logger = new Logger()

env.config()

export default class Authentication {
  /**
   * Creates a token for dummy username and password
   * @param {Request Object} req - get the username and password from the body
   * @param {Response Object} res
   */

  signIn(req, res) {
    try {
      const username = req.body.username
      const password = req.body.password
      if (!req.body || username === '' || password === '' || username === undefined || password === undefined) {
        logger.logError(utils.response(400, 'Username/Password required'))
        return res.send(utils.response(400, 'Username/Password required'))
      }
      const payload = {
        username: username
      }
      var token = jwt.sign(payload, process.env.KEY, {
        expiresIn: 24 * 60 * 60
      })
      logger.logInfo('Sign in sucessfully and token generated')
      res.send(utils.response(200, { token: token }))
    } catch (err) {
      logger.logError(utils.response(400, 'Please try again, token error'))
      res.send(utils.response(500, 'Please try again, token error'))
    }
  }

  /**
   *  Middleware for JWT verification
   * @param {Request Object} req
   * @param {Response Object} res
   * @param {Callback Function} next
   */

  tokenVerification(req, res, next) {
    var token = req.headers.token
    if (token) {
      var valid = false
      jwt.verify(token, process.env.KEY, (err, decode) => {
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
