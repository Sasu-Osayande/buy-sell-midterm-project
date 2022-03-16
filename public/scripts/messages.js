$(function() {
  const socket = io();
  console.log("ready")

  //sending msg to server
  $('#send-msg-btn').on('click', () => {
    socket.emit('privatemsg', {to: "Alice", text: "hey"})
  })

  socket.on('private', (data) => {
    console.log(data)
  })
})
