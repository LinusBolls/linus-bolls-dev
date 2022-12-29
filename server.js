const fs = require('fs')
const https = require('https')

const cors = require('cors')
const express = require('express')
const helmet = require('helmet')

const IS_SSL = false
const PORT = 3000
const HOSTNAME = '143.42.16.123'

const app = express()

const serverOptions = IS_SSL ? {
    key: fs.readFileSync('/etc/letsencrypt/live/linus.bolls.dev/privkey.pem', 'utf8'),
    cert: fs.readFileSync('/etc/letsencrypt/live/linus.bolls.dev/fullchain.pem', 'utf8'),
} : {}

const server = IS_SSL ? https.createServer(serverOptions, app) : app

app.use(helmet({
    contentSecurityPolicy: false,
}))
app.use(cors())

app.disable('x-powered-by')

app.use(express.static(__dirname + '/dist'))

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})

server.listen(PORT, () => {

    const protocol = IS_SSL ? 'https' : 'http'

    const appUrl = `${protocol}://${HOSTNAME}:${PORT}`

    console.info(`app live at ${appUrl}`)
})