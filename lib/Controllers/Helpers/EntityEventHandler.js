"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EntityEventHandler = /*#__PURE__*/function () {
  function EntityEventHandler(_ref) {
    var room = _ref.room,
        world = _ref.world,
        state = _ref.state;

    _classCallCheck(this, EntityEventHandler);

    this.room = room;
    this.world = world;
    this.listen();
  }

  _createClass(EntityEventHandler, [{
    key: "listen",
    value: function listen() {
      var _this = this;

      this.world.events.on('added.entity', function (_ref2) {
        var entity = _ref2.entity;

        if (entity.builder.name != null) {
          // console.log('send to everyone add ', entity.id, 'entity')
          _this.room.broadcast('add.entity', {
            builder: entity.builder.name,
            params: entity.builder.params,
            id: entity.id
          });
        }
      });
      this.world.events.on('removed.entity', function (_ref3) {
        var entity = _ref3.entity;

        // console.log('send to everyone remove ', entity.id, 'entity')
        _this.room.broadcast('remove.entity', {
          id: entity.id
        });
      });
    }
  }, {
    key: "sendAllEntitiesToClient",
    value: function sendAllEntitiesToClient(client) {
      var entities = [];
      this.world.entities.get().forEach(function (entity) {
        if (entity.builder.name != null) {
          entities.push({
            builder: entity.builder.name,
            params: entity.builder.params,
            id: entity.id
          });
        }
      }); // console.log('send to one client', entities.length, 'entities')

      client.send('add.entities', {
        entities: entities
      });
    }
  }]);

  return EntityEventHandler;
}();

exports["default"] = EntityEventHandler;