module.exports = function (client, request) {
  // New client connection: persist client’s “room”
  // based on request path.
  client.room = this.setRoom(request)

  // Log the connection.
  console.log(`New client connected to ${client.room}`)

  client.on('message', message => {
    // New message received: broadcast it to all
    // other clients in the same room.
    const numberOfRecipients = this.broadcast(client, message)

    // Log the number of recipients message was sent to
    // and make sure we pluralise the log message properly.
    console.log(`${client.room} message broadcast to `
      + `${numberOfRecipients} recipient`
      + `${numberOfRecipients === 1 ? '' : 's'}`)
  })
}
