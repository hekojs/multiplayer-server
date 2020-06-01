export default class Multiplayer {
  getRoom() {
    return this.room
  }

  isServer() {
    return true
  }

  isClient() {
    return false
  }

  broadcastMessage(name, message) {
    this.getRoom().broadcast(name, message)
  }

  sendMessage(client, name, message) {
    client.send(name, message)
  }

  onMessage(name, callback) {
    this.getRoom().onMessage(name, (client, message) => callback(message))
  }
}