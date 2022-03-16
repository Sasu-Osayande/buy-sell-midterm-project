$(function() {
  const socket = io();
  console.log("ready")

  //sending msg to server
  // $('#send-msg-btn').on('click', () => {
  //   socket.emit('privatemsg', "heyyyyy")
  // })

  socket.on('private', (data) => {
    console.log(data)
    document.querySelector('h1').innerHTML = data;
  })

  // socket.on('input', (data) => {
  //   $('#msg.input').html
  // })

  const sendMessage = () => {
    // const messageInput = document.querySelector('#msg-input')
    socket.emit('private', 'hey, it worked!')
  }

})
