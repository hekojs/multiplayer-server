"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _colyseus = require("colyseus");

var _EntityStateSynchronizer = _interopRequireDefault(require("./StateSynchronizers/EntityStateSynchronizer"));

var _ComponentStateSynchronizer = _interopRequireDefault(require("./StateSynchronizers/ComponentStateSynchronizer"));

var _Plugin = _interopRequireDefault(require("../Plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DefaultRoom = /*#__PURE__*/function (_ColyseusRoom) {
  _inherits(DefaultRoom, _ColyseusRoom);

  var _super = _createSuper(DefaultRoom);

  function DefaultRoom() {
    var _this;

    _classCallCheck(this, DefaultRoom);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.world = void 0;
    _this.synchronizers = {
      entity: null,
      component: null
    };
    _this.helpers = {
      component: null
    };
    return _this;
  }

  _createClass(DefaultRoom, [{
    key: "inject",
    value: function inject(world, state) {
      var _this2 = this;

      world.plugins.get(_Plugin["default"]).room = this;

      this._createSynchronizers(world, state);

      console.log('Inject world in a new room', this.roomId);

      this._events.on('dispose', function () {
        console.log('Dispose room', _this2.roomId);
      });

      this._events.on('join', function (client) {
        console.log('New client', client.sessionId, 'joined room', _this2.roomId);

        _this2.synchronizers.entity.sendAllEntitiesToClient(client);
      });

      this._events.on('leave', function (client) {
        console.log('Client', client.sessionId, 'left room', _this2.roomId);
      });
    }
  }, {
    key: "_createSynchronizers",
    value: function _createSynchronizers(world, state) {
      this.synchronizers.entity = new _EntityStateSynchronizer["default"]({
        room: this,
        world: world,
        state: state
      });
      this.synchronizers.component = new _ComponentStateSynchronizer["default"]({
        room: this,
        world: world,
        state: state
      });
    }
  }]);

  return DefaultRoom;
}(_colyseus.Room);

exports["default"] = DefaultRoom;