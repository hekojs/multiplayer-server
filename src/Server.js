import { monitor } from '@colyseus/monitor'
import { createServer } from 'http'
import { Server as ColyseusServer } from 'colyseus'
import _ from 'lodash'
import express from 'express'
import cors from 'cors'
import basicAuth from 'express-basic-auth'

export default class Server {
  options = {
    port: 2567,
    password: 'password',
  }
  colyseus

  constructor (options) {
    _.merge(this.options, options)

    const app = this._createExpressApp(this.options.password)
    this.colyseus = this._createServer(app, this.options.port)
  }

  _createExpressApp (password) {
    const app = express()
    app.use(cors())
    app.use(express.json())

    app.use('/colyseus', basicAuth({
      users: { 'admin': password },
      challenge: true
    }), monitor())

    return app
  }

  _createServer (expressApp, port) {
    const colyseus = new ColyseusServer({
      server: createServer(expressApp),
      express: expressApp,
      pingInterval: 0,
    })

    colyseus.onShutdown(() => console.log('game server is going down.'))

    return colyseus
  }

  start () {
    this.colyseus.listen(this.options.port)
    console.log('Listening on ws://localhost:' + this.options.port)
  }

  stop () {
    console.log('Gracefully Shutdown ...')
    this.colyseus.gracefullyShutdown()
  }
}