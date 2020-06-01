import Heko from '@hekojs/core'

export default class ComponentSchema {
  static state = {}
  static registerComponentsFromManager(Manager) {
    ComponentSchema.applyRegisteredComponentsDefinitions(Manager)
    ComponentSchema.state = ComponentSchema.getStateComponentDefinition(Manager)
  }

  static applyRegisteredComponentsDefinitions (Manager) {
    Object.values(Manager.registered).forEach(Component => {
      if (Component.multiplayerSchema) {
        Heko.Schema.defineTypes(Component, { _entityId: 'uint32', ...Component.multiplayerSchema || {} })
      }
    })
  }

  static getStateComponentDefinition(Manager) {
    const schema = { components: ['string'] }
    Object.values(Manager.registered).forEach(Component => {
      if (Component.multiplayerSchema) {
        schema[Component.name] = { map: Component }
      }
    })
    return schema
  }
}