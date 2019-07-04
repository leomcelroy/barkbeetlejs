"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ToolbarButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ToolbarButton, _React$Component);

  function ToolbarButton(props) {
    var _this;

    _classCallCheck(this, ToolbarButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ToolbarButton).call(this, props));
    _this.state = {
      hover: false
    };
    return _this;
  }

  _createClass(ToolbarButton, [{
    key: "change",
    value: function change(event) {
      event.preventDefault();
      event.stopPropagation();

      switch (event.type) {
        case 'mouseenter':
        case 'touchstart':
          this.setState({
            hover: true
          });
          break;

        case 'mouseleave':
        case 'touchend':
        case 'touchcancel':
          this.setState({
            hover: false
          });
          break;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var style = {
        display: "block",
        width: "24px",
        height: "24px",
        margin: [_constants.POSITION_TOP, _constants.POSITION_BOTTOM].indexOf(this.props.toolbarPosition) >= 0 ? "2px 1px" : "1px 2px",
        color: this.props.active || this.state.hover ? '#1CA6FC' : '#FFF',
        transition: "color 200ms ease",
        background: "none",
        padding: "0px",
        border: "0px",
        outline: "0px",
        cursor: "pointer"
      };
      return _react.default.createElement("button", {
        onMouseEnter: function onMouseEnter(e) {
          return _this2.change(e);
        },
        onMouseLeave: function onMouseLeave(e) {
          return _this2.change(e);
        },
        onTouchStart: function onTouchStart(e) {
          _this2.change(e);

          _this2.props.onClick(e);
        },
        onTouchEnd: function onTouchEnd(e) {
          return _this2.change(e);
        },
        onTouchCancel: function onTouchCancel(e) {
          return _this2.change(e);
        },
        onClick: this.props.onClick,
        style: style,
        title: this.props.title,
        name: this.props.name,
        role: "button",
        type: "button"
      }, this.props.children);
    }
  }]);

  return ToolbarButton;
}(_react.default.Component);

exports.default = ToolbarButton;
ToolbarButton.propTypes = {
  title: _propTypes.default.string.isRequired,
  name: _propTypes.default.string.isRequired,
  toolbarPosition: _propTypes.default.string.isRequired,
  onClick: _propTypes.default.func.isRequired,
  active: _propTypes.default.bool.isRequired
};