"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _layers = require("../../layers");

var _typography = require("../../typography");

var _icon = require("../../icon");

var _theme = require("../../theme");

var _safeInvoke = _interopRequireDefault(require("../../lib/safe-invoke"));

var _warning = _interopRequireDefault(require("../../lib/warning"));

var MenuItem =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(MenuItem, _React$PureComponent);

  function MenuItem() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, MenuItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(MenuItem)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleClick", function (event) {
      _this.props.onSelect(event);
      /* eslint-disable react/prop-types */


      (0, _safeInvoke.default)(_this.props.onClick, event);
      /* eslint-enable react/prop-types */
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleKeyPress", function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        _this.props.onSelect(event);

        event.preventDefault();
      }
      /* eslint-disable react/prop-types */


      (0, _safeInvoke.default)(_this.props.onKeyPress, event);
      /* eslint-enable react/prop-types */
    });
    return _this;
  }

  (0, _createClass2.default)(MenuItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          is = _this$props.is,
          children = _this$props.children,
          theme = _this$props.theme,
          appearance = _this$props.appearance,
          secondaryText = _this$props.secondaryText,
          intent = _this$props.intent,
          icon = _this$props.icon,
          passthroughProps = (0, _objectWithoutProperties2.default)(_this$props, ["is", "children", "theme", "appearance", "secondaryText", "intent", "icon"]);

      if (process.env.NODE_ENV !== 'production') {
        (0, _warning.default)('onClick' in this.props, '<Menu.Item> expects `onSelect` prop, but you passed `onClick`.');
      }

      var themedClassName = theme.getMenuItemClassName(appearance, 'none');
      return _react.default.createElement(_layers.Pane, (0, _extends2.default)({
        is: is,
        role: "menuitem",
        className: themedClassName,
        onClick: this.handleClick,
        onKeyPress: this.handleKeyPress,
        height: icon ? 40 : 32,
        tabIndex: 0,
        "data-isselectable": "true",
        display: "flex",
        alignItems: "center"
      }, passthroughProps), icon && _react.default.createElement(_icon.Icon, {
        color: intent === 'none' ? 'default' : intent,
        icon: icon,
        marginLeft: 16,
        marginRight: -4,
        size: 16,
        flexShrink: 0
      }), _react.default.createElement(_typography.Text, {
        color: intent,
        marginLeft: 16,
        marginRight: 16,
        flex: 1
      }, children), secondaryText && _react.default.createElement(_typography.Text, {
        marginRight: 16,
        color: "muted"
      }, secondaryText));
    }
  }]);
  return MenuItem;
}(_react.default.PureComponent);

MenuItem.displayName = "MenuItem";
(0, _defineProperty2.default)(MenuItem, "propTypes", {
  /**
   * Element type to use for the menu item.
   * For example: `<MenuItem is={ReactRouterLink}>...</MenuItem>`
   */
  is: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]).isRequired,

  /**
   * Function that is called on click and enter/space keypress.
   */
  onSelect: _propTypes.default.func,

  /**
   * The icon before the label.
   */
  icon: _propTypes.default.node,

  /**
   * The children of the component.
   */
  children: _propTypes.default.node,

  /**
   * Secondary text shown on the right.
   */
  secondaryText: _propTypes.default.node,

  /**
   * The default theme only supports one default appearance.
   */
  appearance: _propTypes.default.string.isRequired,

  /**
   * The intent of the menu item.
   */
  intent: _propTypes.default.oneOf(['none', 'success', 'warning', 'danger']).isRequired,

  /**
   * Theme provided by ThemeProvider.
   */
  theme: _propTypes.default.object.isRequired
});
(0, _defineProperty2.default)(MenuItem, "defaultProps", {
  is: 'div',
  intent: 'none',
  appearance: 'default',
  onSelect: function onSelect() {}
});

var _default = (0, _theme.withTheme)(MenuItem);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tZW51L3NyYy9NZW51SXRlbS5qcyJdLCJuYW1lcyI6WyJNZW51SXRlbSIsImV2ZW50IiwicHJvcHMiLCJvblNlbGVjdCIsIm9uQ2xpY2siLCJrZXkiLCJwcmV2ZW50RGVmYXVsdCIsIm9uS2V5UHJlc3MiLCJpcyIsImNoaWxkcmVuIiwidGhlbWUiLCJhcHBlYXJhbmNlIiwic2Vjb25kYXJ5VGV4dCIsImludGVudCIsImljb24iLCJwYXNzdGhyb3VnaFByb3BzIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwidGhlbWVkQ2xhc3NOYW1lIiwiZ2V0TWVudUl0ZW1DbGFzc05hbWUiLCJoYW5kbGVDbGljayIsImhhbmRsZUtleVByZXNzIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwib25lT2ZUeXBlIiwic3RyaW5nIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJub2RlIiwib25lT2YiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztJQUVNQSxROzs7Ozs7Ozs7Ozs7Ozs7Ozs4RkFvRFUsVUFBQUMsS0FBSyxFQUFJO0FBQ3JCLFlBQUtDLEtBQUwsQ0FBV0MsUUFBWCxDQUFvQkYsS0FBcEI7QUFFQTs7O0FBQ0EsK0JBQVcsTUFBS0MsS0FBTCxDQUFXRSxPQUF0QixFQUErQkgsS0FBL0I7QUFDQTtBQUNELEs7aUdBRWdCLFVBQUFBLEtBQUssRUFBSTtBQUN4QixVQUFJQSxLQUFLLENBQUNJLEdBQU4sS0FBYyxPQUFkLElBQXlCSixLQUFLLENBQUNJLEdBQU4sS0FBYyxHQUEzQyxFQUFnRDtBQUM5QyxjQUFLSCxLQUFMLENBQVdDLFFBQVgsQ0FBb0JGLEtBQXBCOztBQUNBQSxRQUFBQSxLQUFLLENBQUNLLGNBQU47QUFDRDtBQUVEOzs7QUFDQSwrQkFBVyxNQUFLSixLQUFMLENBQVdLLFVBQXRC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OzhCQURmN0IsUSxrQkE2Q2tCO0FBQ3BCUSxFQUFBQSxFQUFFLEVBQUUsS0FEZ0I7QUFFcEJLLEVBQUFBLE1BQU0sRUFBRSxNQUZZO0FBR3BCRixFQUFBQSxVQUFVLEVBQUUsU0FIUTtBQUlwQlIsRUFBQUEsUUFBUSxFQUFFLG9CQUFNLENBQUU7QUFKRSxDOztlQW9GVCxzQkFBVUgsUUFBVixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IHsgUGFuZSB9IGZyb20gJy4uLy4uL2xheWVycydcbmltcG9ydCB7IFRleHQgfSBmcm9tICcuLi8uLi90eXBvZ3JhcGh5J1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJy4uLy4uL2ljb24nXG5pbXBvcnQgeyB3aXRoVGhlbWUgfSBmcm9tICcuLi8uLi90aGVtZSdcbmltcG9ydCBzYWZlSW52b2tlIGZyb20gJy4uLy4uL2xpYi9zYWZlLWludm9rZSdcbmltcG9ydCB3YXJuaW5nIGZyb20gJy4uLy4uL2xpYi93YXJuaW5nJ1xuXG5jbGFzcyBNZW51SXRlbSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIC8qKlxuICAgICAqIEVsZW1lbnQgdHlwZSB0byB1c2UgZm9yIHRoZSBtZW51IGl0ZW0uXG4gICAgICogRm9yIGV4YW1wbGU6IGA8TWVudUl0ZW0gaXM9e1JlYWN0Um91dGVyTGlua30+Li4uPC9NZW51SXRlbT5gXG4gICAgICovXG4gICAgaXM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5mdW5jXSkuaXNSZXF1aXJlZCxcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIG9uIGNsaWNrIGFuZCBlbnRlci9zcGFjZSBrZXlwcmVzcy5cbiAgICAgKi9cbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgaWNvbiBiZWZvcmUgdGhlIGxhYmVsLlxuICAgICAqL1xuICAgIGljb246IFByb3BUeXBlcy5ub2RlLFxuXG4gICAgLyoqXG4gICAgICogVGhlIGNoaWxkcmVuIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICovXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuXG4gICAgLyoqXG4gICAgICogU2Vjb25kYXJ5IHRleHQgc2hvd24gb24gdGhlIHJpZ2h0LlxuICAgICAqL1xuICAgIHNlY29uZGFyeVRleHQ6IFByb3BUeXBlcy5ub2RlLFxuXG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQgdGhlbWUgb25seSBzdXBwb3J0cyBvbmUgZGVmYXVsdCBhcHBlYXJhbmNlLlxuICAgICAqL1xuICAgIGFwcGVhcmFuY2U6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbnRlbnQgb2YgdGhlIG1lbnUgaXRlbS5cbiAgICAgKi9cbiAgICBpbnRlbnQ6IFByb3BUeXBlcy5vbmVPZihbJ25vbmUnLCAnc3VjY2VzcycsICd3YXJuaW5nJywgJ2RhbmdlciddKVxuICAgICAgLmlzUmVxdWlyZWQsXG5cbiAgICAvKipcbiAgICAgKiBUaGVtZSBwcm92aWRlZCBieSBUaGVtZVByb3ZpZGVyLlxuICAgICAqL1xuICAgIHRoZW1lOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaXM6ICdkaXYnLFxuICAgIGludGVudDogJ25vbmUnLFxuICAgIGFwcGVhcmFuY2U6ICdkZWZhdWx0JyxcbiAgICBvblNlbGVjdDogKCkgPT4ge31cbiAgfVxuXG4gIGhhbmRsZUNsaWNrID0gZXZlbnQgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QoZXZlbnQpXG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4gICAgc2FmZUludm9rZSh0aGlzLnByb3BzLm9uQ2xpY2ssIGV2ZW50KVxuICAgIC8qIGVzbGludC1lbmFibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuICB9XG5cbiAgaGFuZGxlS2V5UHJlc3MgPSBldmVudCA9PiB7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJyB8fCBldmVudC5rZXkgPT09ICcgJykge1xuICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChldmVudClcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4gICAgc2FmZUludm9rZSh0aGlzLnByb3BzLm9uS2V5UHJlc3MsIGV2ZW50KVxuICAgIC8qIGVzbGludC1lbmFibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGlzLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICB0aGVtZSxcbiAgICAgIGFwcGVhcmFuY2UsXG4gICAgICBzZWNvbmRhcnlUZXh0LFxuICAgICAgaW50ZW50LFxuICAgICAgaWNvbixcbiAgICAgIC4uLnBhc3N0aHJvdWdoUHJvcHNcbiAgICB9ID0gdGhpcy5wcm9wc1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHdhcm5pbmcoXG4gICAgICAgICdvbkNsaWNrJyBpbiB0aGlzLnByb3BzLFxuICAgICAgICAnPE1lbnUuSXRlbT4gZXhwZWN0cyBgb25TZWxlY3RgIHByb3AsIGJ1dCB5b3UgcGFzc2VkIGBvbkNsaWNrYC4nXG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgdGhlbWVkQ2xhc3NOYW1lID0gdGhlbWUuZ2V0TWVudUl0ZW1DbGFzc05hbWUoYXBwZWFyYW5jZSwgJ25vbmUnKVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxQYW5lXG4gICAgICAgIGlzPXtpc31cbiAgICAgICAgcm9sZT1cIm1lbnVpdGVtXCJcbiAgICAgICAgY2xhc3NOYW1lPXt0aGVtZWRDbGFzc05hbWV9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgIG9uS2V5UHJlc3M9e3RoaXMuaGFuZGxlS2V5UHJlc3N9XG4gICAgICAgIGhlaWdodD17aWNvbiA/IDQwIDogMzJ9XG4gICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICBkYXRhLWlzc2VsZWN0YWJsZT1cInRydWVcIlxuICAgICAgICBkaXNwbGF5PVwiZmxleFwiXG4gICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuICAgICAgICB7Li4ucGFzc3Rocm91Z2hQcm9wc31cbiAgICAgID5cbiAgICAgICAge2ljb24gJiYgKFxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICBjb2xvcj17aW50ZW50ID09PSAnbm9uZScgPyAnZGVmYXVsdCcgOiBpbnRlbnR9XG4gICAgICAgICAgICBpY29uPXtpY29ufVxuICAgICAgICAgICAgbWFyZ2luTGVmdD17MTZ9XG4gICAgICAgICAgICBtYXJnaW5SaWdodD17LTR9XG4gICAgICAgICAgICBzaXplPXsxNn1cbiAgICAgICAgICAgIGZsZXhTaHJpbms9ezB9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAgPFRleHQgY29sb3I9e2ludGVudH0gbWFyZ2luTGVmdD17MTZ9IG1hcmdpblJpZ2h0PXsxNn0gZmxleD17MX0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L1RleHQ+XG4gICAgICAgIHtzZWNvbmRhcnlUZXh0ICYmIChcbiAgICAgICAgICA8VGV4dCBtYXJnaW5SaWdodD17MTZ9IGNvbG9yPVwibXV0ZWRcIj5cbiAgICAgICAgICAgIHtzZWNvbmRhcnlUZXh0fVxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgKX1cbiAgICAgIDwvUGFuZT5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFRoZW1lKE1lbnVJdGVtKVxuIl19