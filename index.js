import express from 'express'
import Authentication from './src/controller/Authentication'
import ImageProcessor from './src/controller/ImageProcessor'
const app = express()
const authenticate = new Authentication()
const imageProcessor = new ImageProcessor()
const port = process.env.PORT || 5000

app.use(express.json())

app.post('/signIn', authenticate.signIn)
app.post('/getThumbnailImage', authenticate.tokenVerification, imageProcessor.getThumbnail)
app.use('/*', (req, res) => { })

var server = app.listen(port, () => {
  console.log('Listening to port 5000')
})

module.exports = server