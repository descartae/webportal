import http from 'http'

import { createApp } from './app'

// To be replaced by webpack - https://github.com/mrsteele/dotenv-webpack/issues/70
const SERVER_PORT = process.env.SERVER_PORT
const JWT_SECRET = process.env.JWT_SECRET
const MONGODB_URL = process.env.MONGODB_URL

createApp(JWT_SECRET, MONGODB_URL)
  .then((createdApp) => {
    let currentApp = createdApp
    const server = http.createServer(currentApp)

    server.listen(SERVER_PORT)

    if (module.hot) {
      module.hot.accept('./app', async () => {
        const { createApp } = require('./app')
        const newApp = await createApp(JWT_SECRET, MONGODB_URL)

        server.removeListener('request', currentApp)
        server.on('request', newApp)

        currentApp = newApp
      })
    }
  })
  .then(() => console.log(`Server is listening on http://localhost:${SERVER_PORT}`))
  .catch((error) => console.error(error))
