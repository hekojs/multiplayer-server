import Heko from '@hekojs/core'
import Plugin from './Plugin'
import Server from './Server'
import * as Colyseus from 'colyseus'
import DefaultRoom from './Room/DefaultRoom'
import ComponentSchema from './ComponentSchema'
import DefaultState from './Room/DefaultState'

export default {
  Server,
  Plugin,
  Room: DefaultRoom,
  State: DefaultState,
  Colyseus,
  registerComponentsFromManager() {
    ComponentSchema.registerComponentsFromManager(Heko.ComponentManager)
  },
  registerState(State) {
    Heko.Schema.defineTypes(State, ComponentSchema.state)
  }
}