"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Multiplayer = /*#__PURE__*/function () {
  function Multiplayer() {
    _classCallCheck(this, Multiplayer);
  }

  _createClass(Multiplayer, [{
    key: "getRoom",
    value: function getRoom() {
      return this.room;
    }
  }, {
    key: "isServer",
    value: function isServer() {
      return true;
    }
  }, {
    key: "isClient",
    value: function isClient() {
      return false;
    }
  }, {
    key: "broadcastMessage",
    value: function broadcastMessage(name, message) {
      this.getRoom().broadcast(name, message);
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(client, name, message) {
      client.send(name, message);
    }
  }, {
    key: "onMessage",
    value: function onMessage(name, callback) {
      this.getRoom().onMessage(name, function (client, message) {
        return callback(message);
      });
    }
  }]);

  return Multiplayer;
}();

exports["default"] = Multiplayer;