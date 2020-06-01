"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ComponentStateSynchronizer = /*#__PURE__*/function () {
  function ComponentStateSynchronizer(_ref) {
    var room = _ref.room,
        world = _ref.world,
        state = _ref.state;

    _classCallCheck(this, ComponentStateSynchronizer);

    this.room = room;
    this.world = world;
    this.state = state;
    this.listenAdding();
    this.listenRemoving();
    this.loadWorldComponents();
  }

  _createClass(ComponentStateSynchronizer, [{
    key: "listenAdding",
    value: function listenAdding() {
      var _this = this;

      this.world.events.on('added.component', function (_ref2) {
        var component = _ref2.component;

        if (_this._isMultiplayerComponent(component.constructor)) {
          if (!(component.constructor.name in _this.state)) throw "Trying to add unregistered component " + component.constructor.name + " to multiplayer plugin.";
          _this.state[component.constructor.name][component._entityId] = component;
        }
      });
    }
  }, {
    key: "listenRemoving",
    value: function listenRemoving() {
      var _this2 = this;

      this.world.events.on('removed.component', function (_ref3) {
        var component = _ref3.component;

        if (_this2._isMultiplayerComponent(component.constructor)) {
          if (!(component.constructor.name in _this2.state)) throw "Trying to remove unregistered component " + component.constructor.name + " to multiplayer plugin.";
          delete _this2.state[component.constructor.name][component._entityId];
        }
      });
    }
  }, {
    key: "loadWorldComponents",
    value: function loadWorldComponents() {
      var components = this.world.components.get();

      for (var entityId in components) {
        for (var componentClass in components[entityId]) {
          var component = components[entityId][componentClass];

          if (this._isMultiplayerComponent(component.constructor)) {
            if (!(component.constructor.name in this.state)) throw 'Trying to add unregistered component ' + component.constructor.name + ' to multiplayer plugin.';
            this.state[component.constructor.name][component._entityId] = component;
          }
        }
      }
    }
  }, {
    key: "_isMultiplayerComponent",
    value: function _isMultiplayerComponent(Component) {
      return !!Component.multiplayerSchema;
    }
  }]);

  return ComponentStateSynchronizer;
}();

exports["default"] = ComponentStateSynchronizer;