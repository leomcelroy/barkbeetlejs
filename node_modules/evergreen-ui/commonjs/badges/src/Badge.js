"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _typography = require("../../typography");

var _theme = require("../../theme");

var Badge =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Badge, _PureComponent);

  function Badge() {
    (0, _classCallCheck2.default)(this, Badge);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Badge).apply(this, arguments));
  }

  (0, _createClass2.default)(Badge, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          className = _this$props.className,
          propsColor = _this$props.color,
          isInteractive = _this$props.isInteractive,
          isSolid = _this$props.isSolid,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["theme", "className", "color", "isInteractive", "isSolid"]);

      var _theme$getBadgeProps = theme.getBadgeProps({
        color: propsColor,
        isSolid: isSolid
      }),
          color = _theme$getBadgeProps.color,
          backgroundColor = _theme$getBadgeProps.backgroundColor;

      var appearance = isInteractive ? 'interactive' : 'default';
      var classNames = (0, _classnames.default)(className, theme.getBadgeClassName(appearance));
      return _react.default.createElement(_typography.Strong, (0, _extends2.default)({
        size: 300
      }, Badge.styles, {
        color: color,
        backgroundColor: backgroundColor
      }, props, {
        className: classNames
      }));
    }
  }]);
  return Badge;
}(_react.PureComponent);

Badge.displayName = "Badge";
(0, _defineProperty2.default)(Badge, "propTypes", (0, _objectSpread2.default)({}, _typography.Strong.propTypes, {
  /**
   * The color used for the badge.
   */
  color: _propTypes.default.string.isRequired,

  /**
   * Whether or not to apply hover/focus/active styles
   */
  isInteractive: _propTypes.default.bool,

  /**
   * Theme provided by ThemeProvider.
   */
  theme: _propTypes.default.object.isRequired
}));
(0, _defineProperty2.default)(Badge, "defaultProps", {
  color: 'neutral',
  isInteractive: false,
  isSolid: false
});
(0, _defineProperty2.default)(Badge, "styles", {
  display: 'inline-block',
  boxSizing: 'border-box',
  height: 16,
  paddingTop: 0,
  paddingRight: 6,
  paddingBottom: 0,
  paddingLeft: 6,
  borderRadius: 2,
  textAlign: 'center',
  textDecoration: 'none',
  textTransform: 'uppercase'
});

var _default = (0, _theme.withTheme)(Badge);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iYWRnZXMvc3JjL0JhZGdlLmpzIl0sIm5hbWVzIjpbIkJhZGdlIiwicHJvcHMiLCJ0aGVtZSIsImNsYXNzTmFtZSIsInByb3BzQ29sb3IiLCJjb2xvciIsImlzSW50ZXJhY3RpdmUiLCJpc1NvbGlkIiwiZ2V0QmFkZ2VQcm9wcyIsImJhY2tncm91bmRDb2xvciIsImFwcGVhcmFuY2UiLCJjbGFzc05hbWVzIiwiZ2V0QmFkZ2VDbGFzc05hbWUiLCJzdHlsZXMiLCJQdXJlQ29tcG9uZW50IiwiU3Ryb25nIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImJvb2wiLCJvYmplY3QiLCJkaXNwbGF5IiwiYm94U2l6aW5nIiwiaGVpZ2h0IiwicGFkZGluZ1RvcCIsInBhZGRpbmdSaWdodCIsInBhZGRpbmdCb3R0b20iLCJwYWRkaW5nTGVmdCIsImJvcmRlclJhZGl1cyIsInRleHRBbGlnbiIsInRleHREZWNvcmF0aW9uIiwidGV4dFRyYW5zZm9ybSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7SUFFTUEsSzs7Ozs7Ozs7Ozs7OzZCQXdDSztBQUFBLHdCQVFILEtBQUtDLEtBUkY7QUFBQSxVQUVMQyxLQUZLLGVBRUxBLEtBRks7QUFBQSxVQUdMQyxTQUhLLGVBR0xBLFNBSEs7QUFBQSxVQUlFQyxVQUpGLGVBSUxDLEtBSks7QUFBQSxVQUtMQyxhQUxLLGVBS0xBLGFBTEs7QUFBQSxVQU1MQyxPQU5LLGVBTUxBLE9BTks7QUFBQSxVQU9GTixLQVBFOztBQUFBLGlDQVU0QkMsS0FBSyxDQUFDTSxhQUFOLENBQW9CO0FBQ3JESCxRQUFBQSxLQUFLLEVBQUVELFVBRDhDO0FBRXJERyxRQUFBQSxPQUFPLEVBQVBBO0FBRnFELE9BQXBCLENBVjVCO0FBQUEsVUFVQ0YsS0FWRCx3QkFVQ0EsS0FWRDtBQUFBLFVBVVFJLGVBVlIsd0JBVVFBLGVBVlI7O0FBZVAsVUFBTUMsVUFBVSxHQUFHSixhQUFhLEdBQUcsYUFBSCxHQUFtQixTQUFuRDtBQUNBLFVBQU1LLFVBQVUsR0FBRyx5QkFBR1IsU0FBSCxFQUFjRCxLQUFLLENBQUNVLGlCQUFOLENBQXdCRixVQUF4QixDQUFkLENBQW5CO0FBRUEsYUFDRSw2QkFBQyxrQkFBRDtBQUNFLFFBQUEsSUFBSSxFQUFFO0FBRFIsU0FFTVYsS0FBSyxDQUFDYSxNQUZaO0FBR0UsUUFBQSxLQUFLLEVBQUVSLEtBSFQ7QUFJRSxRQUFBLGVBQWUsRUFBRUk7QUFKbkIsU0FLTVIsS0FMTjtBQU1FLFFBQUEsU0FBUyxFQUFFVTtBQU5iLFNBREY7QUFVRDs7O0VBcEVpQkcsb0I7O0FBQWRkLEs7OEJBQUFBLEssK0NBRUNlLG1CQUFPQyxTO0FBRVY7OztBQUdBWCxFQUFBQSxLQUFLLEVBQUVZLG1CQUFVQyxNQUFWLENBQWlCQyxVOztBQUV4Qjs7O0FBR0FiLEVBQUFBLGFBQWEsRUFBRVcsbUJBQVVHLEk7O0FBRXpCOzs7QUFHQWxCLEVBQUFBLEtBQUssRUFBRWUsbUJBQVVJLE1BQVYsQ0FBaUJGOzs4QkFqQnRCbkIsSyxrQkFvQmtCO0FBQ3BCSyxFQUFBQSxLQUFLLEVBQUUsU0FEYTtBQUVwQkMsRUFBQUEsYUFBYSxFQUFFLEtBRks7QUFHcEJDLEVBQUFBLE9BQU8sRUFBRTtBQUhXLEM7OEJBcEJsQlAsSyxZQTBCWTtBQUNkc0IsRUFBQUEsT0FBTyxFQUFFLGNBREs7QUFFZEMsRUFBQUEsU0FBUyxFQUFFLFlBRkc7QUFHZEMsRUFBQUEsTUFBTSxFQUFFLEVBSE07QUFJZEMsRUFBQUEsVUFBVSxFQUFFLENBSkU7QUFLZEMsRUFBQUEsWUFBWSxFQUFFLENBTEE7QUFNZEMsRUFBQUEsYUFBYSxFQUFFLENBTkQ7QUFPZEMsRUFBQUEsV0FBVyxFQUFFLENBUEM7QUFRZEMsRUFBQUEsWUFBWSxFQUFFLENBUkE7QUFTZEMsRUFBQUEsU0FBUyxFQUFFLFFBVEc7QUFVZEMsRUFBQUEsY0FBYyxFQUFFLE1BVkY7QUFXZEMsRUFBQUEsYUFBYSxFQUFFO0FBWEQsQzs7ZUE2Q0gsc0JBQVVoQyxLQUFWLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgeyBTdHJvbmcgfSBmcm9tICcuLi8uLi90eXBvZ3JhcGh5J1xuaW1wb3J0IHsgd2l0aFRoZW1lIH0gZnJvbSAnLi4vLi4vdGhlbWUnXG5cbmNsYXNzIEJhZGdlIGV4dGVuZHMgUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLi4uU3Ryb25nLnByb3BUeXBlcyxcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb2xvciB1c2VkIGZvciB0aGUgYmFkZ2UuXG4gICAgICovXG4gICAgY29sb3I6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgb3Igbm90IHRvIGFwcGx5IGhvdmVyL2ZvY3VzL2FjdGl2ZSBzdHlsZXNcbiAgICAgKi9cbiAgICBpc0ludGVyYWN0aXZlOiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIC8qKlxuICAgICAqIFRoZW1lIHByb3ZpZGVkIGJ5IFRoZW1lUHJvdmlkZXIuXG4gICAgICovXG4gICAgdGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBjb2xvcjogJ25ldXRyYWwnLFxuICAgIGlzSW50ZXJhY3RpdmU6IGZhbHNlLFxuICAgIGlzU29saWQ6IGZhbHNlXG4gIH1cblxuICBzdGF0aWMgc3R5bGVzID0ge1xuICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgIGhlaWdodDogMTYsXG4gICAgcGFkZGluZ1RvcDogMCxcbiAgICBwYWRkaW5nUmlnaHQ6IDYsXG4gICAgcGFkZGluZ0JvdHRvbTogMCxcbiAgICBwYWRkaW5nTGVmdDogNixcbiAgICBib3JkZXJSYWRpdXM6IDIsXG4gICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICAgIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdGhlbWUsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBjb2xvcjogcHJvcHNDb2xvcixcbiAgICAgIGlzSW50ZXJhY3RpdmUsXG4gICAgICBpc1NvbGlkLFxuICAgICAgLi4ucHJvcHNcbiAgICB9ID0gdGhpcy5wcm9wc1xuXG4gICAgY29uc3QgeyBjb2xvciwgYmFja2dyb3VuZENvbG9yIH0gPSB0aGVtZS5nZXRCYWRnZVByb3BzKHtcbiAgICAgIGNvbG9yOiBwcm9wc0NvbG9yLFxuICAgICAgaXNTb2xpZFxuICAgIH0pXG5cbiAgICBjb25zdCBhcHBlYXJhbmNlID0gaXNJbnRlcmFjdGl2ZSA/ICdpbnRlcmFjdGl2ZScgOiAnZGVmYXVsdCdcbiAgICBjb25zdCBjbGFzc05hbWVzID0gY3goY2xhc3NOYW1lLCB0aGVtZS5nZXRCYWRnZUNsYXNzTmFtZShhcHBlYXJhbmNlKSlcblxuICAgIHJldHVybiAoXG4gICAgICA8U3Ryb25nXG4gICAgICAgIHNpemU9ezMwMH1cbiAgICAgICAgey4uLkJhZGdlLnN0eWxlc31cbiAgICAgICAgY29sb3I9e2NvbG9yfVxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I9e2JhY2tncm91bmRDb2xvcn1cbiAgICAgICAgey4uLnByb3BzfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXN9XG4gICAgICAvPlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoVGhlbWUoQmFkZ2UpXG4iXX0=