const socketio = require("socket.io")

const listen = function(http) {
  const server = socketio(http);
  server.on('connection', (client) => {
    console.log("A new client connected!", client.id)

    client.on('disconnect', () => {
      console.log("Disconnected!", client.id)
    })

    client.on('privatemsg', (data) => {
      console.log(data)
      client.emit('private', `you sent: ${data}`)
      server.emit('private', `someone sent: ${data}`)
    })


  })
}

module.exports = {listen}
