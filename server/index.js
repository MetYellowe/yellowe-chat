const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const { app, server } = require('./web-socket')

// import and set Nuxt.js options
let config = require('../nuxt.config')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
    // init Nuxt.js
    const nuxt = new Nuxt(config)

    const { host, port } = nuxt.options.server

    // build only in dev mode
    if(config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }

    // give nuxt middleware to express
    app.use(nuxt.render)

    // listen the server
    server.listen(port, () => {
        consola.ready({
            message: `Server listening on http://${host}:${port}`,
            badge: true
        })
    })
}

module.exports = {
    path: '/server/',
    handler: start
}
