const socketio = require("socket.io");
const users = {};

const listen = function(http) {
  const server = socketio(http);
  server.on('connection', (client) => {
    console.log("A new client connected!", client.id);

    client.on('disconnect', () => {
      console.log("Disconnected!", client.id);
    });

    client.on('private', (data) => {
      console.log(data);
      const id = users[data.to];
      const from = data.from;
      const text = data.text;
      console.log("ID", id);
      console.log("From", from);
      console.log("text", text);
      server.to(id).emit('private', {from, text});
    });

    client.on('id', (data) => {
      users[data] = client.id;
      console.log(users);
    });
  });
};
module.exports = {listen};
