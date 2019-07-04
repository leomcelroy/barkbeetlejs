"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _typography = require("../../typography");

var _theme = require("../../theme");

var _warning = _interopRequireDefault(require("../../lib/warning"));

var Tab =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Tab, _PureComponent);

  function Tab() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Tab);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Tab)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleClick", function (e) {
      if (typeof _this.props.onClick === 'function') {
        _this.props.onClick(e);
      }

      _this.props.onSelect();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleKeyPress", function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        _this.props.onSelect();

        e.preventDefault();
      }

      _this.props.onKeyPress(e);
    });
    return _this;
  }

  (0, _createClass2.default)(Tab, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          is = _this$props.is,
          height = _this$props.height,
          onSelect = _this$props.onSelect,
          isSelected = _this$props.isSelected,
          appearance = _this$props.appearance,
          disabled = _this$props.disabled,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["theme", "is", "height", "onSelect", "isSelected", "appearance", "disabled"]);

      if (process.env.NODE_ENV !== 'production') {
        (0, _warning.default)(typeof this.props.onClick === 'function', '<Tab> expects `onSelect` prop, but you passed `onClick`.');
      }

      var textSize = theme.getTextSizeForControlHeight(height);
      var elementBasedProps;

      if (disabled) {
        elementBasedProps = {
          'aria-disabled': true
        };
      }

      if (is === 'a') {
        // Use aria-current when it's a link
        // https://tink.uk/using-the-aria-current-attribute/
        elementBasedProps = isSelected ? (0, _objectSpread2.default)({}, elementBasedProps, {
          'aria-current': 'page'
        }) : {};
      } else {
        // Use a role="tablist" around the tabs
        // Also pass down a aria-controls="panelId"
        // https://www.stefanjudis.com/blog/aria-selected-and-when-to-use-it/
        elementBasedProps = (0, _objectSpread2.default)({}, elementBasedProps, {
          'aria-selected': isSelected,
          role: 'tab'
        });
      }

      return _react.default.createElement(_typography.Text, (0, _extends2.default)({
        className: theme.getTabClassName(appearance),
        is: is,
        size: textSize,
        height: height
      }, Tab.styles, props, {
        onClick: this.handleClick,
        onKeyPress: this.handleKeyPress
      }, elementBasedProps));
    }
  }]);
  return Tab;
}(_react.PureComponent);

Tab.displayName = "Tab";
(0, _defineProperty2.default)(Tab, "propTypes", (0, _objectSpread2.default)({}, _typography.Text.propTypes, {
  /**
   * Function triggered when tab is selected.
   */
  onSelect: _propTypes.default.func,

  /**
   * When true, the tab is selected.
   */
  isSelected: _propTypes.default.bool,

  /**
   * The appearance of the tab.
   * The default theme only comes with a default style.
   */
  appearance: _propTypes.default.string,

  /**
   * Theme provided by ThemeProvider.
   */
  theme: _propTypes.default.object.isRequired
}));
(0, _defineProperty2.default)(Tab, "defaultProps", {
  onSelect: function onSelect() {},
  onKeyPress: function onKeyPress() {},
  is: 'span',
  height: 28,
  disabled: false
});
(0, _defineProperty2.default)(Tab, "styles", {
  display: 'inline-flex',
  fontWeight: 500,
  paddingX: 8,
  marginX: 4,
  borderRadius: 3,
  lineHeight: '28px',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  tabIndex: 0
});

var _default = (0, _theme.withTheme)(Tab);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90YWJzL3NyYy9UYWIuanMiXSwibmFtZXMiOlsiVGFiIiwiZSIsInByb3BzIiwib25DbGljayIsIm9uU2VsZWN0Iiwia2V5IiwicHJldmVudERlZmF1bHQiLCJvbktleVByZXNzIiwidGhlbWUiLCJpcyIsImhlaWdodCIsImlzU2VsZWN0ZWQiLCJhcHBlYXJhbmNlIiwiZGlzYWJsZWQiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJ0ZXh0U2l6ZSIsImdldFRleHRTaXplRm9yQ29udHJvbEhlaWdodCIsImVsZW1lbnRCYXNlZFByb3BzIiwicm9sZSIsImdldFRhYkNsYXNzTmFtZSIsInN0eWxlcyIsImhhbmRsZUNsaWNrIiwiaGFuZGxlS2V5UHJlc3MiLCJQdXJlQ29tcG9uZW50IiwiVGV4dCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImZ1bmMiLCJib29sIiwic3RyaW5nIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsImRpc3BsYXkiLCJmb250V2VpZ2h0IiwicGFkZGluZ1giLCJtYXJnaW5YIiwiYm9yZGVyUmFkaXVzIiwibGluZUhlaWdodCIsImFsaWduSXRlbXMiLCJqdXN0aWZ5Q29udGVudCIsInRleHREZWNvcmF0aW9uIiwidGFiSW5kZXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7SUFFTUEsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7OEZBa0RVLFVBQUFDLENBQUMsRUFBSTtBQUNqQixVQUFJLE9BQU8sTUFBS0MsS0FBTCxDQUFXQyxPQUFsQixLQUE4QixVQUFsQyxFQUE4QztBQUM1QyxjQUFLRCxLQUFMLENBQVdDLE9BQVgsQ0FBbUJGLENBQW5CO0FBQ0Q7O0FBRUQsWUFBS0MsS0FBTCxDQUFXRSxRQUFYO0FBQ0QsSztpR0FFZ0IsVUFBQUgsQ0FBQyxFQUFJO0FBQ3BCLFVBQUlBLENBQUMsQ0FBQ0ksR0FBRixLQUFVLE9BQVYsSUFBcUJK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QUFBQSxjQUFjLEVBQUUsUUFSRjtBQVNkQyxFQUFBQSxjQUFjLEVBQUUsTUFURjtBQVVkQyxFQUFBQSxRQUFRLEVBQUU7QUFWSSxDOztlQThGSCxzQkFBVTNDLEdBQVYsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgeyBUZXh0IH0gZnJvbSAnLi4vLi4vdHlwb2dyYXBoeSdcbmltcG9ydCB7IHdpdGhUaGVtZSB9IGZyb20gJy4uLy4uL3RoZW1lJ1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnLi4vLi4vbGliL3dhcm5pbmcnXG5cbmNsYXNzIFRhYiBleHRlbmRzIFB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIC8qKlxuICAgICAqIENvbXBvc2VzIHRoZSBUZXh0IGNvbXBvbmVudCBhcyB0aGUgYmFzZS5cbiAgICAgKi9cbiAgICAuLi5UZXh0LnByb3BUeXBlcyxcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRyaWdnZXJlZCB3aGVuIHRhYiBpcyBzZWxlY3RlZC5cbiAgICAgKi9cbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRydWUsIHRoZSB0YWIgaXMgc2VsZWN0ZWQuXG4gICAgICovXG4gICAgaXNTZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgYXBwZWFyYW5jZSBvZiB0aGUgdGFiLlxuICAgICAqIFRoZSBkZWZhdWx0IHRoZW1lIG9ubHkgY29tZXMgd2l0aCBhIGRlZmF1bHQgc3R5bGUuXG4gICAgICovXG4gICAgYXBwZWFyYW5jZTogUHJvcFR5cGVzLnN0cmluZyxcblxuICAgIC8qKlxuICAgICAqIFRoZW1lIHByb3ZpZGVkIGJ5IFRoZW1lUHJvdmlkZXIuXG4gICAgICovXG4gICAgdGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBvblNlbGVjdDogKCkgPT4ge30sXG4gICAgb25LZXlQcmVzczogKCkgPT4ge30sXG4gICAgaXM6ICdzcGFuJyxcbiAgICBoZWlnaHQ6IDI4LFxuICAgIGRpc2FibGVkOiBmYWxzZVxuICB9XG5cbiAgc3RhdGljIHN0eWxlcyA9IHtcbiAgICBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxuICAgIGZvbnRXZWlnaHQ6IDUwMCxcbiAgICBwYWRkaW5nWDogOCxcbiAgICBtYXJnaW5YOiA0LFxuICAgIGJvcmRlclJhZGl1czogMyxcbiAgICBsaW5lSGVpZ2h0OiAnMjhweCcsXG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgIHRleHREZWNvcmF0aW9uOiAnbm9uZScsXG4gICAgdGFiSW5kZXg6IDBcbiAgfVxuXG4gIGhhbmRsZUNsaWNrID0gZSA9PiB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMucHJvcHMub25DbGljayhlKVxuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25TZWxlY3QoKVxuICB9XG5cbiAgaGFuZGxlS2V5UHJlc3MgPSBlID0+IHtcbiAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicgfHwgZS5rZXkgPT09ICcgJykge1xuICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdCgpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLm9uS2V5UHJlc3MoZSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB0aGVtZSxcbiAgICAgIGlzLFxuICAgICAgaGVpZ2h0LFxuICAgICAgb25TZWxlY3QsXG4gICAgICBpc1NlbGVjdGVkLFxuICAgICAgYXBwZWFyYW5jZSxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgLi4ucHJvcHNcbiAgICB9ID0gdGhpcy5wcm9wc1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHdhcm5pbmcoXG4gICAgICAgIHR5cGVvZiB0aGlzLnByb3BzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicsXG4gICAgICAgICc8VGFiPiBleHBlY3RzIGBvblNlbGVjdGAgcHJvcCwgYnV0IHlvdSBwYXNzZWQgYG9uQ2xpY2tgLidcbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0U2l6ZSA9IHRoZW1lLmdldFRleHRTaXplRm9yQ29udHJvbEhlaWdodChoZWlnaHQpXG5cbiAgICBsZXQgZWxlbWVudEJhc2VkUHJvcHNcbiAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgIGVsZW1lbnRCYXNlZFByb3BzID0ge1xuICAgICAgICAnYXJpYS1kaXNhYmxlZCc6IHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXMgPT09ICdhJykge1xuICAgICAgLy8gVXNlIGFyaWEtY3VycmVudCB3aGVuIGl0J3MgYSBsaW5rXG4gICAgICAvLyBodHRwczovL3RpbmsudWsvdXNpbmctdGhlLWFyaWEtY3VycmVudC1hdHRyaWJ1dGUvXG4gICAgICBlbGVtZW50QmFzZWRQcm9wcyA9IGlzU2VsZWN0ZWRcbiAgICAgICAgPyB7XG4gICAgICAgICAgICAuLi5lbGVtZW50QmFzZWRQcm9wcyxcbiAgICAgICAgICAgICdhcmlhLWN1cnJlbnQnOiAncGFnZSdcbiAgICAgICAgICB9XG4gICAgICAgIDoge31cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVXNlIGEgcm9sZT1cInRhYmxpc3RcIiBhcm91bmQgdGhlIHRhYnNcbiAgICAgIC8vIEFsc28gcGFzcyBkb3duIGEgYXJpYS1jb250cm9scz1cInBhbmVsSWRcIlxuICAgICAgLy8gaHR0cHM6Ly93d3cuc3RlZmFuanVkaXMuY29tL2Jsb2cvYXJpYS1zZWxlY3RlZC1hbmQtd2hlbi10by11c2UtaXQvXG4gICAgICBlbGVtZW50QmFzZWRQcm9wcyA9IHtcbiAgICAgICAgLi4uZWxlbWVudEJhc2VkUHJvcHMsXG4gICAgICAgICdhcmlhLXNlbGVjdGVkJzogaXNTZWxlY3RlZCxcbiAgICAgICAgcm9sZTogJ3RhYidcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFRleHRcbiAgICAgICAgY2xhc3NOYW1lPXt0aGVtZS5nZXRUYWJDbGFzc05hbWUoYXBwZWFyYW5jZSl9XG4gICAgICAgIGlzPXtpc31cbiAgICAgICAgc2l6ZT17dGV4dFNpemV9XG4gICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICB7Li4uVGFiLnN0eWxlc31cbiAgICAgICAgey4uLnByb3BzfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgICBvbktleVByZXNzPXt0aGlzLmhhbmRsZUtleVByZXNzfVxuICAgICAgICB7Li4uZWxlbWVudEJhc2VkUHJvcHN9XG4gICAgICAvPlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoVGhlbWUoVGFiKVxuIl19