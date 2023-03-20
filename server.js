const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const http = require('http')
const server = http.createServer(app)
const Server = require('socket.io')
const io = Server(server)

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

io.on('connection', function (socket) {
  socket.on('user_join', function (data) {
    this.username = data
    socket.broadcast.emit('user_join', data)
  })

  socket.on('chat_message', function (data) {
    data.username = this.username
    socket.broadcast.emit('chat_message', data)
  })

  socket.on('disconnect', function (data) {
    socket.broadcast.emit('user_leave', this.username)
  })
})

server.listen(port, () => {
  console.log(`Listening on ${port}`)
})
