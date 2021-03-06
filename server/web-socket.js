//const app = require('express')()
//const server = require('http').createServer(app)
const io = require('socket.io')(process.env.PORT)
//app.listen(process.env.PORT)
const users = require('./users')()

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
//server.listen(3001)

module.exports = {
    path: '/server/',
    handler: io
}

/*module.exports = {
    app,
    server
}*/
