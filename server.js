const io = require('socket.io')(3000)

const users = {}
const connections = []

io.on('connection', socket => {
    connections.push(socket)
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]})
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
        connections.splice(connections.indexOf(socket), 1)
    })
})