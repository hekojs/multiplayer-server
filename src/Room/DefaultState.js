import Heko from '@hekojs/core'
const { Schema, MapSchema, ArraySchema } = Heko.Schema

export default class DefaultState extends Schema {
  constructor () {
    super()
    this.setupComponentList()
  }

  setupComponentList () {
    const registered = new ArraySchema()
    Object.values(Heko.ComponentManager.registered).forEach(Component => {
      if(Component.multiplayerSchema) {
        this[Component.name] = new MapSchema()
        registered.push(Component.name)
      }
    })
    this.components = registered
  }
}