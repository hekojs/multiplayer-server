"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ComponentHelper = /*#__PURE__*/function () {
  function ComponentHelper(room) {
    _classCallCheck(this, ComponentHelper);

    this.room = void 0;
    this.room = room;
  }

  _createClass(ComponentHelper, [{
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
    value: function broadcastMessage(component, type, message) {
      this.getRoom().send(this._getMessageNamespace(component, type), message);
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(client, component, type, message) {
      client.send(this._getMessageNamespace(component, type), message);
    }
  }, {
    key: "onMessage",
    value: function onMessage(component, type, callback) {
      this.getRoom().onMessage(this._getMessageNamespace(component, type), function (client, message) {
        return callback(message);
      });
    }
  }, {
    key: "_getMessageNamespace",
    value: function _getMessageNamespace(component, type) {
      return 'entity.' + component.entityId + '.' + component.constructor["class"] + '.' + type;
    }
  }]);

  return ComponentHelper;
}();

exports["default"] = ComponentHelper;