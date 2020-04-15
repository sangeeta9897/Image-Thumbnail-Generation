import log4js from 'log4js'

log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'api.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
})

const logger = log4js.getLogger('api')
logger.level = 'debug'

export default class Logger {
    logInfo(params) {
        logger.info(params)
    }

    logError(params) {
        logger.error(params)
    }
}