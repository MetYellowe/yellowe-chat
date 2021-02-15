/*const app = require('express')
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const users = require('./users')()*/
const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

const http = require('http')
const app = require('express')()
const server = http.createServer(app)
const io = require('socket.io')(server)

const { Nuxt, Builder } = require('nuxt')
// We instantiate Nuxt with the options
const config = require('./nuxt.config.js')
config.dev = !isProd

const nuxt = new Nuxt(config)
// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)

// Listen the server
server.listen(port, '0.0.0.0')
console.log('Server listening on localhost:' + port) // eslint-disable-line no-console
const m = (name, text, id, room) => ({name, text, id, room})

io.on('connection', socket => {
    console.log('IO connected.')

    socket.on('userJoined', (data, cb) =>{
        if(!data.name || !data.room) {
            cb('Data uncorrected.')
        }

        socket.join(data.room)
        users.remove(socket.id)
        users.add({
            id: socket.id,
            name: data.name,
            room: data.room,
            attention: '',
            interdata: data.interdata
        })

        cb({userId: socket.id})
        io.to(data.room).emit('updateUsers', users.getByRoom(data.room))
        socket.emit('newMessage', m('Admin', `Welcome, ${data.name}.`))
        socket.broadcast.to(data.room)
            .emit('newMessage', m('Admin', `User ${data.name} joined.`, '', data.name))
    })

    socket.on('createMessage', (data, cb) => {    
        if(!data.text) {
            cb('You send an empty message. Type something.')
        }
        
        const user = users.get(data.id)
        const interlocutor = users.getByName(data.interlocutor.name)
        if(user && interlocutor) {
            io.to(interlocutor.id).emit('newMessage', m(user.name, data.text, data.id, user.name))
            socket.emit('newMessage', m(user.name, data.text, data.id, interlocutor.name))
            cb()
        } else if(user) {
            io.to(user.room).emit('newMessage', m(user.name, data.text, data.id, 'Common Room'))
            cb()
        }
    })

    socket.on('userLeft', (id, cb) => {
        const user = users.remove(id)
        if(user) {
            io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
            io.to(user.room).emit('newMessage', m('Admin', `User ${user.name} logged out.`, '', user.name))
        }
        cb()
    })

    socket.on('disconnect', () => {
        const user = users.remove(socket.id)
        if(user) {
            io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
            io.to(user.room).emit('newMessage', m('Admin', `User ${user.name} logged out.`))
        }
    })

    socket.on('likeImg', (data) => {
        io.to(data.room).emit('increaseCountOfLikes', {
            id: data.imgWhichLikedId,
            name: data.name,
            intername: data.intername
        })
    })
})

module.exports = {
    path: '/server/',
    handler: io
}
