
import axios from 'axios'
import sharp from 'sharp'
import Utils from './utils'
import Logger from './logger'

const logger = new Logger()
const utils = new Utils()

export default class ImageProcessor {
    async getThumbnail(req, res) {
        // var url = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
        var url = req.body.url
        if (url) {
            try {
                var response = await axios.get(url, { responseType: 'arraybuffer' })
            } catch (e) {
                logger.logError(utils.response(400, "Wrong Url Specified"))
                res.status(400).send(utils.response(400, "Wrong Url Specified"))
                return
            }
            const buffer = Buffer.from(response.data, 'utf-8')
            const buffer1 = await sharp(buffer).resize(50, 50).toBuffer()
            logger.logInfo('Image successfully converted and sent')
            res.set({ 'Content-Type': 'image/png' }).status(200).send(buffer1)
        } else {
            logger.logError(utils.response(400, "No Url Specified"))
            res.status(400).send(utils.response(400, "No Url Specified"))
        }
    }

}