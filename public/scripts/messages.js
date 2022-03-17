$(function() {
  const socket = io();
  console.log("ready")

  // sending msg to server
  $('#send-msg-btn').on('click', () => {
    const from = $('#msg_from').val()
    const to = $('#msg_to').val()
    const text = $('#msg-input').val()
    const element = `<li class="sent"> ${from}: ${text} </li>`
    $('#messages').append(element)
    sendMessage(from, to, text);
  })

  socket.on('connect', () => {
    const from = $('#msg_from').val()
    socket.emit('id', from)
  })

  socket.on('private', (data) => {
    const from = data.from;
    const text = data.text;
    const element = `<li class="received"> ${from}: ${text} </li>`
    console.log("Message from", from)
    $('#messages').append(element)
  })

  const sendMessage = (from, to, text) => {
    socket.emit('private', {from, to, text})
  }

})
