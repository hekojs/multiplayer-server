import { Room as ColyseusRoom } from 'colyseus'
import EntityStateSynchronizer from './StateSynchronizers/EntityStateSynchronizer'
import ComponentStateSynchronizer from './StateSynchronizers/ComponentStateSynchronizer'
import Plugin from '../Plugin'

export default class DefaultRoom extends ColyseusRoom {
  world
  synchronizers = { entity: null, component: null }
  helpers = { component: null }

  inject (world, state) {
    world.plugins.get(Plugin).room = this
    this._createSynchronizers(world, state)

    console.log('Inject world in a new room', this.roomId)

    this._events.on('dispose', () => {
      console.log('Dispose room', this.roomId)
    })
    this._events.on('join', client => {
      console.log('New client', client.sessionId, 'joined room', this.roomId)
      this.synchronizers.entity.sendAllEntitiesToClient(client)
    })
    this._events.on('leave', client => {
      console.log('Client', client.sessionId, 'left room', this.roomId)
    })
  }

  _createSynchronizers (world, state) {
    this.synchronizers.entity = new EntityStateSynchronizer({ room: this, world, state })
    this.synchronizers.component = new ComponentStateSynchronizer({ room: this, world, state })
  }
}