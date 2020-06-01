"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _EntityEventHandler = _interopRequireDefault(require("./Helpers/EntityEventHandler"));

var _ComponentEventHandler = _interopRequireDefault(require("./Helpers/ComponentEventHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WorldController = /*#__PURE__*/function () {
  function WorldController(_ref) {
    var _this = this;

    var state = _ref.state,
        helper = _ref.helper,
        world = _ref.world,
        events = _ref.events;

    _classCallCheck(this, WorldController);

    this.world = void 0;
    this.helper = void 0;
    this.room = void 0;
    this.State = void 0;
    this.handlers = {
      entity: null,
      component: null
    };
    this.world = world;
    this.helper = helper;
    this.State = state;
    events.on('create', function (room) {
      return _this.onCreate(room);
    }).on('dispose', function (room) {
      return _this.onDispose();
    }).on('join', function (room, client) {
      return _this.onJoin(client);
    }).on('leave', function (room, client) {
      return _this.onLeave(client);
    });
    /*
    setInterval(() => {
      console.log('E', this.world.entities.length, 'C', this.world.components.length)
    }, 1000)
    */
  }

  _createClass(WorldController, [{
    key: "onCreate",
    value: function onCreate(room) {
      console.log('World Controller on create');
      if (this.room) throw "Could not start a second room on a standalone server.";
      this.room = room;
      this.helper.room = room;
      this.room.world = this.world;
      this.room.setState(new this.State());
      this.handlers.entity = new _EntityEventHandler["default"]({
        room: this.room,
        world: this.world
      });
      this.handlers.component = new _ComponentEventHandler["default"]({
        room: this.room,
        world: this.world,
        state: this.room.state
      });
    }
  }, {
    key: "onDispose",
    value: function onDispose() {}
  }, {
    key: "onJoin",
    value: function onJoin(client) {
      this.handlers.entity.sendAllEntitiesToClient(client);
    }
  }, {
    key: "onLeave",
    value: function onLeave(client) {}
  }]);

  return WorldController;
}();

exports["default"] = WorldController;