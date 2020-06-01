export default class EntityStateSynchronizer {
  constructor ({room, world, state}) {
    this.room = room
    this.world = world
    this.state = state

    this.listen()
  }

  listen() {
    this.world.events.on('added.entity', ({ entity }) => {
      if (entity._builderName != null) {
        // console.log('send to everyone add ', entity.id, 'entity')
        this.room.broadcast('add.entity', { builder: entity._builderName, params: entity._builderParams, id: entity._id })
      }
    })
    this.world.events.on('removed.entity', ({ entity }) => {
      // console.log('send to everyone remove ', entity.id, 'entity')
      this.room.broadcast('remove.entity', { id: entity._id })
    })
  }

  sendAllEntitiesToClient(client) {
    const entities = []
    this.world.entities.all().forEach(entity => {
      if (entity._builderName != null) {
        entities.push({ builder: entity._builderName, params: entity._builderParams, id: entity._id })
      }
    })
    // console.log('send to one client', entities.length, 'entities')
    client.send('add.entities', ({ entities }))
  }
}