export default class ComponentStateSynchronizer {
  constructor ({ room, world, state }) {
    this.room = room
    this.world = world
    this.state = state

    this.listenAdding()
    this.listenRemoving()
    this.loadWorldComponents()
  }

  listenAdding () {
    this.world.events.on('added.component', ({ component }) => {
      if (this._isMultiplayerComponent(component.constructor)) {
        if(!(component.constructor.name in this.state)) throw "Trying to add unregistered component " + component.constructor.name + " to multiplayer plugin."
        this.state[component.constructor.name][component._entityId] = component
      }
    })
  }

  listenRemoving() {
    this.world.events.on('removed.component', ({ component }) => {
      if (this._isMultiplayerComponent(component.constructor)) {
        if(!(component.constructor.name in this.state)) throw "Trying to remove unregistered component " + component.constructor.name + " to multiplayer plugin."
        delete this.state[component.constructor.name][component._entityId]
      }
    })
  }

  loadWorldComponents () {
    const components = this.world.components.get()
    for (let entityId in components) {
      for (let componentClass in components[entityId]) {
        const component = components[entityId][componentClass]
        if (this._isMultiplayerComponent(component.constructor)) {
          if (!(component.constructor.name in this.state)) throw 'Trying to add unregistered component ' + component.constructor.name + ' to multiplayer plugin.'
          this.state[component.constructor.name][component._entityId] = component
        }
      }
    }
  }

  _isMultiplayerComponent (Component) {
    return !!Component.multiplayerSchema
  }
}