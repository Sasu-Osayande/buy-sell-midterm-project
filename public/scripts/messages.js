$(function() {
  const socket = io();
  console.log("ready")

  // sending msg to server
  $('#send-msg-btn').on('click', () => {
    const from = $('#msg_from').val()
    const to = $('#msg_to').val()
    const text = $('#msg-input').val()
    const element = `<p class="sent"> ${from}: ${text} </p>`
    $('#messages').append(element)
    sendMessage(from, to, text);

    // clears the message input after a text submission
    $("#msg-input").val('');
  })

  socket.on('connect', () => {
    const from = $('#msg_from').val()
    socket.emit('id', from)
  })

  socket.on('private', (data) => {
    const from = data.from;
    const text = data.text;
    const element = `<p class="received"> ${from}: ${text} </p>`
    console.log("Message from", from)
    $('#messages').append(element)
  })

  const sendMessage = (from, to, text) => {
    socket.emit('private', {from, to, text})
  }

})
