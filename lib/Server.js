"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _monitor = require("@colyseus/monitor");

var _http = require("http");

var _colyseus = require("colyseus");

var _lodash = _interopRequireDefault(require("lodash"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _expressBasicAuth = _interopRequireDefault(require("express-basic-auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Server = /*#__PURE__*/function () {
  function Server(options) {
    _classCallCheck(this, Server);

    this.options = {
      port: 2567,
      password: 'password'
    };
    this.colyseus = void 0;

    _lodash["default"].merge(this.options, options);

    var app = this._createExpressApp(this.options.password);

    this.colyseus = this._createServer(app, this.options.port);
  }

  _createClass(Server, [{
    key: "_createExpressApp",
    value: function _createExpressApp(password) {
      var app = (0, _express["default"])();
      app.use((0, _cors["default"])());
      app.use(_express["default"].json());
      app.use('/colyseus', (0, _expressBasicAuth["default"])({
        users: {
          'admin': password
        },
        challenge: true
      }), (0, _monitor.monitor)());
      return app;
    }
  }, {
    key: "_createServer",
    value: function _createServer(expressApp, port) {
      var colyseus = new _colyseus.Server({
        server: (0, _http.createServer)(expressApp),
        express: expressApp,
        pingInterval: 0
      });
      colyseus.onShutdown(function () {
        return console.log('game server is going down.');
      });
      return colyseus;
    }
  }, {
    key: "start",
    value: function start() {
      this.colyseus.listen(this.options.port);
      console.log('Listening on ws://localhost:' + this.options.port);
    }
  }, {
    key: "stop",
    value: function stop() {
      console.log('Gracefully Shutdown ...');
      this.colyseus.gracefullyShutdown();
    }
  }]);

  return Server;
}();

exports["default"] = Server;