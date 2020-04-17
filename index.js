import express from 'express'
import Authentication from './src/controller/Authentication'
import ImageProcessor from './src/controller/ImageProcessor'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import bodyParser from 'body-parser'

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Thumbnail Generater',
      contact: {
        name: 'Sangeeta Sharma'
      },
      server: ['http://localhost:5000']
    }
  },
  apis: ['index.js']
}

const app = express()
const authenticate = new Authentication()
const imageProcessor = new ImageProcessor()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Routes
/**
 * @swagger
 * /signIn:
 *  post:
 *    description: Used to sign in to app
 *    parameters:
 *      - name: username
 *        in: formData
 *        type: string
 *      - name: password
 *        in: formData
 *        type: string
 *    responses:
 *     '200':
 *      description: A sucessfull response
 */
app.post('/signIn', authenticate.signIn)

// Routes
/**
 * @swagger
 * /getThumbnailImage:
 *  post:
 *    description: Used to get resized image
 *    parameters:
 *      - name: url
 *        in: formData
 *        type: string
 *        required: true
 *      - name: token
 *        in: header
 *        type: string
 *        required: true
 *    responses:
 *     '200':
 *      description: A sucessfull response
 */
app.post('/getThumbnailImage', authenticate.tokenVerification, imageProcessor.getThumbnail)
app.use('/*', (req, res) => { })

var server = app.listen(port, () => {
  console.log('Listening to port 5000')
})

module.exports = server
