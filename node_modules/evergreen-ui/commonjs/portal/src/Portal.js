"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = require("react");

var _inDOM = _interopRequireDefault(require("dom-helpers/util/inDOM"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var portalContainer;

var Portal =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Portal, _Component);

  function Portal() {
    var _this;

    (0, _classCallCheck2.default)(this, Portal);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Portal).call(this)); // This fixes SSR

    if (!_inDOM.default) return (0, _possibleConstructorReturn2.default)(_this);

    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.setAttribute('evergreen-portal-container', '');
      document.body.append(portalContainer);
    }

    _this.el = document.createElement('div');
    portalContainer.append(_this.el);
    return _this;
  }

  (0, _createClass2.default)(Portal, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      portalContainer.removeChild(this.el);
    }
  }, {
    key: "render",
    value: function render() {
      // This fixes SSR
      if (!_inDOM.default) return null;
      return _reactDom.default.createPortal(this.props.children, this.el);
    }
  }]);
  return Portal;
}(_react.Component);

exports.default = Portal;
Portal.displayName = "Portal";
Portal.propTypes = {
  children: _propTypes.default.node.isRequired
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wb3J0YWwvc3JjL1BvcnRhbC5qcyJdLCJuYW1lcyI6WyJwb3J0YWxDb250YWluZXIiLCJQb3J0YWwiLCJjYW5Vc2VEb20iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJib2R5IiwiYXBwZW5kIiwiZWwiLCJyZW1vdmVDaGlsZCIsIlJlYWN0RE9NIiwiY3JlYXRlUG9ydGFsIiwicHJvcHMiLCJjaGlsZHJlbiIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm5vZGUiLCJpc1JlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBSUEsZUFBSjs7SUFFcUJDLE07Ozs7O0FBQ25CLG9CQUFjO0FBQUE7O0FBQUE7QUFDWiw2R0FEWSxDQUdaOztBQUNBLFFBQUksQ0FBQ0MsY0FBTCxFQUFnQjs7QUFFaEIsUUFBSSxDQUFDRixlQUFMLEVBQXNCO0FBQ3BCQSxNQUFBQSxlQUFlLEdBQUdHLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFsQjtBQUNBSixNQUFBQSxlQUFlLENBQUNLLFlBQWhCLENBQTZCLDRCQUE3QixFQUEyRCxFQUEzRDtBQUNBRixNQUFBQSxRQUFRLENBQUNHLElBQVQsQ0FBY0MsTUFBZCxDQUFxQlAsZUFBckI7QUFDRDs7QUFFRCxVQUFLUSxFQUFMLEdBQVVMLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFWO0FBQ0FKLElBQUFBLGVBQWUsQ0FBQ08sTUFBaEIsQ0FBdUIsTUFBS0MsRUFBNUI7QUFiWTtBQWNiOzs7OzJDQUVzQjtBQUNyQlIsTUFBQUEsZUFBZSxDQUFDUyxXQUFoQixDQUE0QixLQUFLRCxFQUFqQztBQUNEOzs7NkJBRVE7QUFDUDtBQUNBLFVBQUksQ0FBQ04sY0FBTCxFQUFnQixPQUFPLElBQVA7QUFDaEIsYUFBT1Esa0JBQVNDLFlBQVQsQ0FBc0IsS0FBS0MsS0FBTCxDQUFXQyxRQUFqQyxFQUEyQyxLQUFLTCxFQUFoRCxDQUFQO0FBQ0Q7OztFQXpCaUNNLGdCOzs7QUFBZmIsTTtBQTRCckJBLE1BQU0sQ0FBQ2MsU0FBUCxHQUFtQjtBQUNqQkYsRUFBQUEsUUFBUSxFQUFFRyxtQkFBVUMsSUFBVixDQUFlQztBQURSLENBQW5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgY2FuVXNlRG9tIGZyb20gJ2RvbS1oZWxwZXJzL3V0aWwvaW5ET00nXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5sZXQgcG9ydGFsQ29udGFpbmVyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcnRhbCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKClcblxuICAgIC8vIFRoaXMgZml4ZXMgU1NSXG4gICAgaWYgKCFjYW5Vc2VEb20pIHJldHVyblxuXG4gICAgaWYgKCFwb3J0YWxDb250YWluZXIpIHtcbiAgICAgIHBvcnRhbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBwb3J0YWxDb250YWluZXIuc2V0QXR0cmlidXRlKCdldmVyZ3JlZW4tcG9ydGFsLWNvbnRhaW5lcicsICcnKVxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQocG9ydGFsQ29udGFpbmVyKVxuICAgIH1cblxuICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHBvcnRhbENvbnRhaW5lci5hcHBlbmQodGhpcy5lbClcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHBvcnRhbENvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzLmVsKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIC8vIFRoaXMgZml4ZXMgU1NSXG4gICAgaWYgKCFjYW5Vc2VEb20pIHJldHVybiBudWxsXG4gICAgcmV0dXJuIFJlYWN0RE9NLmNyZWF0ZVBvcnRhbCh0aGlzLnByb3BzLmNoaWxkcmVuLCB0aGlzLmVsKVxuICB9XG59XG5cblBvcnRhbC5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkXG59XG4iXX0=