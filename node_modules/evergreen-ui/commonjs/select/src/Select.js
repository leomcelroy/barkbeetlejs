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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uiBox = _interopRequireWildcard(require("ui-box"));

var _typography = require("../../typography");

var _icon = require("../../icon");

var _theme = require("../../theme");

var Select =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Select, _PureComponent);

  function Select() {
    (0, _classCallCheck2.default)(this, Select);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Select).apply(this, arguments));
  }

  (0, _createClass2.default)(Select, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          id = _this$props.id,
          name = _this$props.name,
          height = _this$props.height,
          children = _this$props.children,
          defaultValue = _this$props.defaultValue,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange,
          value = _this$props.value,
          required = _this$props.required,
          autoFocus = _this$props.autoFocus,
          isInvalid = _this$props.isInvalid,
          appearance = _this$props.appearance,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["theme", "id", "name", "height", "children", "defaultValue", "disabled", "onChange", "value", "required", "autoFocus", "isInvalid", "appearance"]);
      var themedClassName = theme.getSelectClassName(appearance);
      var textSize = theme.getTextSizeForControlHeight(height);
      var borderRadius = theme.getBorderRadiusForControlHeight(height);
      var iconSize = theme.getIconSizeForSelect(height);
      var iconMargin = height >= 36 ? 12 : 8;
      return _react.default.createElement(_uiBox.default, (0, _extends2.default)({
        display: "inline-flex",
        flex: 1,
        position: "relative",
        width: "auto",
        height: height
      }, props), _react.default.createElement(_typography.Text, {
        is: "select",
        className: themedClassName,
        id: id,
        name: name,
        onChange: onChange,
        defaultValue: defaultValue,
        value: value,
        required: required,
        autoFocus: autoFocus,
        disabled: disabled,
        "aria-invalid": String(isInvalid),
        size: textSize,
        borderRadius: borderRadius,
        textTransform: "default",
        paddingLeft: Math.round(height / 3.2) // Provide enough space for auto-sizing select including the icon
        ,
        paddingRight: iconMargin * 2 + iconSize
      }, children), _react.default.createElement(_icon.Icon, {
        icon: "caret-down",
        color: "default",
        size: iconSize,
        position: "absolute",
        top: "50%",
        marginTop: -iconSize / 2,
        right: iconMargin,
        pointerEvents: "none"
      }));
    }
  }]);
  return Select;
}(_react.PureComponent);

Select.displayName = "Select";
(0, _defineProperty2.default)(Select, "propTypes", (0, _objectSpread2.default)({}, _uiBox.dimensions.propTypes, _uiBox.spacing.propTypes, _uiBox.position.propTypes, _uiBox.layout.propTypes, {
  /**
   * The id attribute for the select.
   */
  id: _propTypes.default.string,

  /**
   * The name attribute for the select.
   */
  name: _propTypes.default.string,

  /**
   * The options that are passed to the select.
   */
  children: _propTypes.default.node,

  /**
   * The initial value of an uncontrolled select
   */
  defaultValue: _propTypes.default.any,

  /**
   * Function called when value changes.
   */
  onChange: _propTypes.default.func,

  /**
   * The value of the select.
   */
  value: _propTypes.default.any,

  /**
   * When true, the select is required.
   */
  required: _propTypes.default.bool,

  /**
   * When true, the select should auto focus.
   */
  autoFocus: _propTypes.default.bool,

  /**
   * When true, the select is invalid.
   */
  isInvalid: _propTypes.default.bool,

  /**
   * The appearance of the select. The default theme only supports default.
   */
  appearance: _propTypes.default.string.isRequired,

  /**
   * Theme provided by ThemeProvider.
   */
  theme: _propTypes.default.object.isRequired
}));
(0, _defineProperty2.default)(Select, "defaultProps", {
  appearance: 'default',
  height: 32,
  isInvalid: false
});

var _default = (0, _theme.withTheme)(Select);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZWxlY3Qvc3JjL1NlbGVjdC5qcyJdLCJuYW1lcyI6WyJTZWxlY3QiLCJwcm9wcyIsInRoZW1lIiwiaWQiLCJuYW1lIiwiaGVpZ2h0IiwiY2hpbGRyZW4iLCJkZWZhdWx0VmFsdWUiLCJkaXNhYmxlZCIsIm9uQ2hhbmdlIiwidmFsdWUiLCJyZXF1aXJlZCIsImF1dG9Gb2N1cyIsImlzSW52YWxpZCIsImFwcGVhcmFuY2UiLCJ0aGVtZWRDbGFzc05hbWUiLCJnZXRTZWxlY3RDbGFzc05hbWUiLCJ0ZXh0U2l6ZSIsImdldFRleHRTaXplRm9yQ29udHJvbEhlaWdodCIsImJvcmRlclJhZGl1cyIsImdldEJvcmRlclJhZGl1c0ZvckNvbnRyb2xIZWlnaHQiLCJpY29uU2l6ZSIsImdldEljb25TaXplRm9yU2VsZWN0IiwiaWNvbk1hcmdpbiIsIlN0cmluZyIsIk1hdGgiLCJyb3VuZCIsIlB1cmVDb21wb25lbnQiLCJkaW1lbnNpb25zIiwicHJvcFR5cGVzIiwic3BhY2luZyIsInBvc2l0aW9uIiwibGF5b3V0IiwiUHJvcFR5cGVzIiwic3RyaW5nIiwibm9kZSIsImFueSIsImZ1bmMiLCJib29sIiwiaXNSZXF1aXJlZCIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7SUFFTUEsTTs7Ozs7Ozs7Ozs7OzZCQW9GSztBQUFBLHdCQWlCSCxLQUFLQyxLQWpCRjtBQUFBLFVBRUxDLEtBRkssZUFFTEEsS0FGSztBQUFBLFVBSUxDLEVBSkssZUFJTEEsRUFKSztBQUFBLFVBS0xDLElBTEssZUFLTEEsSUFMSztBQUFBLFVBTUxDLE1BTkssZUFNTEEsTUFOSztBQUFBLFVBT0xDLFFBUEssZUFPTEEsUUFQSztBQUFBLFVBUUxDLFlBUkssZUFRTEEsWUFSSztBQUFBLFVBU0xDLFFBVEssZUFTTEEsUUFUSztBQUFBLFVBVUxDLFFBVkssZUFVTEEs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QUFFcEI7OztBQUdBMUIsRUFBQUEsU0FBUyxFQUFFcUIsbUJBQVVLLEk7O0FBRXJCOzs7QUFHQXpCLEVBQUFBLFNBQVMsRUFBRW9CLG1CQUFVSyxJOztBQUVyQjs7O0FBR0F4QixFQUFBQSxVQUFVLEVBQUVtQixtQkFBVUMsTUFBVixDQUFpQkssVTs7QUFFN0I7OztBQUdBckMsRUFBQUEsS0FBSyxFQUFFK0IsbUJBQVVPLE1BQVYsQ0FBaUJEOzs4QkEzRXRCdkMsTSxrQkE4RWtCO0FBQ3BCYyxFQUFBQSxVQUFVLEVBQUUsU0FEUTtBQUVwQlQsRUFBQUEsTUFBTSxFQUFFLEVBRlk7QUFHcEJRLEVBQUFBLFNBQVMsRUFBRTtBQUhTLEM7O2VBNEVULHNCQUFVYixNQUFWLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IEJveCwgeyBkaW1lbnNpb25zLCBzcGFjaW5nLCBwb3NpdGlvbiwgbGF5b3V0IH0gZnJvbSAndWktYm94J1xuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4uLy4uL3R5cG9ncmFwaHknXG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnLi4vLi4vaWNvbidcbmltcG9ydCB7IHdpdGhUaGVtZSB9IGZyb20gJy4uLy4uL3RoZW1lJ1xuXG5jbGFzcyBTZWxlY3QgZXh0ZW5kcyBQdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAvKipcbiAgICAgKiBDb21wb3NlcyB0aGUgZGltZW5zaW9ucyBzcGVjIGZyb20gdGhlIEJveCBwcmltaXRpdmllLlxuICAgICAqL1xuICAgIC4uLmRpbWVuc2lvbnMucHJvcFR5cGVzLFxuXG4gICAgLyoqXG4gICAgICogQ29tcG9zZXMgdGhlIHNwYWNpbmcgc3BlYyBmcm9tIHRoZSBCb3ggcHJpbWl0aXZpZS5cbiAgICAgKi9cbiAgICAuLi5zcGFjaW5nLnByb3BUeXBlcyxcblxuICAgIC8qKlxuICAgICAqIENvbXBvc2VzIHRoZSBwb3NpdGlvbiBzcGVjIGZyb20gdGhlIEJveCBwcmltaXRpdmllLlxuICAgICAqL1xuICAgIC4uLnBvc2l0aW9uLnByb3BUeXBlcyxcblxuICAgIC8qKlxuICAgICAqIENvbXBvc2VzIHRoZSBsYXlvdXQgc3BlYyBmcm9tIHRoZSBCb3ggcHJpbWl0aXZpZS5cbiAgICAgKi9cbiAgICAuLi5sYXlvdXQucHJvcFR5cGVzLFxuXG4gICAgLyoqXG4gICAgICogVGhlIGlkIGF0dHJpYnV0ZSBmb3IgdGhlIHNlbGVjdC5cbiAgICAgKi9cbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcblxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIGF0dHJpYnV0ZSBmb3IgdGhlIHNlbGVjdC5cbiAgICAgKi9cbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gICAgLyoqXG4gICAgICogVGhlIG9wdGlvbnMgdGhhdCBhcmUgcGFzc2VkIHRvIHRoZSBzZWxlY3QuXG4gICAgICovXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuXG4gICAgLyoqXG4gICAgICogVGhlIGluaXRpYWwgdmFsdWUgb2YgYW4gdW5jb250cm9sbGVkIHNlbGVjdFxuICAgICAqL1xuICAgIGRlZmF1bHRWYWx1ZTogUHJvcFR5cGVzLmFueSxcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGNhbGxlZCB3aGVuIHZhbHVlIGNoYW5nZXMuXG4gICAgICovXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIG9mIHRoZSBzZWxlY3QuXG4gICAgICovXG4gICAgdmFsdWU6IFByb3BUeXBlcy5hbnksXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRydWUsIHRoZSBzZWxlY3QgaXMgcmVxdWlyZWQuXG4gICAgICovXG4gICAgcmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLFxuXG4gICAgLyoqXG4gICAgICogV2hlbiB0cnVlLCB0aGUgc2VsZWN0IHNob3VsZCBhdXRvIGZvY3VzLlxuICAgICAqL1xuICAgIGF1dG9Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRydWUsIHRoZSBzZWxlY3QgaXMgaW52YWxpZC5cbiAgICAgKi9cbiAgICBpc0ludmFsaWQ6IFByb3BUeXBlcy5ib29sLFxuXG4gICAgLyoqXG4gICAgICogVGhlIGFwcGVhcmFuY2Ugb2YgdGhlIHNlbGVjdC4gVGhlIGRlZmF1bHQgdGhlbWUgb25seSBzdXBwb3J0cyBkZWZhdWx0LlxuICAgICAqL1xuICAgIGFwcGVhcmFuY2U6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblxuICAgIC8qKlxuICAgICAqIFRoZW1lIHByb3ZpZGVkIGJ5IFRoZW1lUHJvdmlkZXIuXG4gICAgICovXG4gICAgdGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBhcHBlYXJhbmNlOiAnZGVmYXVsdCcsXG4gICAgaGVpZ2h0OiAzMixcbiAgICBpc0ludmFsaWQ6IGZhbHNlXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdGhlbWUsXG5cbiAgICAgIGlkLFxuICAgICAgbmFtZSxcbiAgICAgIGhlaWdodCxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgZGVmYXVsdFZhbHVlLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICBvbkNoYW5nZSxcbiAgICAgIHZhbHVlLFxuICAgICAgcmVxdWlyZWQsXG4gICAgICBhdXRvRm9jdXMsXG4gICAgICBpc0ludmFsaWQsXG4gICAgICBhcHBlYXJhbmNlLFxuICAgICAgLi4ucHJvcHNcbiAgICB9ID0gdGhpcy5wcm9wc1xuXG4gICAgY29uc3QgdGhlbWVkQ2xhc3NOYW1lID0gdGhlbWUuZ2V0U2VsZWN0Q2xhc3NOYW1lKGFwcGVhcmFuY2UpXG4gICAgY29uc3QgdGV4dFNpemUgPSB0aGVtZS5nZXRUZXh0U2l6ZUZvckNvbnRyb2xIZWlnaHQoaGVpZ2h0KVxuICAgIGNvbnN0IGJvcmRlclJhZGl1cyA9IHRoZW1lLmdldEJvcmRlclJhZGl1c0ZvckNvbnRyb2xIZWlnaHQoaGVpZ2h0KVxuICAgIGNvbnN0IGljb25TaXplID0gdGhlbWUuZ2V0SWNvblNpemVGb3JTZWxlY3QoaGVpZ2h0KVxuICAgIGNvbnN0IGljb25NYXJnaW4gPSBoZWlnaHQgPj0gMzYgPyAxMiA6IDhcblxuICAgIHJldHVybiAoXG4gICAgICA8Qm94XG4gICAgICAgIGRpc3BsYXk9XCJpbmxpbmUtZmxleFwiXG4gICAgICAgIGZsZXg9ezF9XG4gICAgICAgIHBvc2l0aW9uPVwicmVsYXRpdmVcIlxuICAgICAgICB3aWR0aD1cImF1dG9cIlxuICAgICAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICAgICAgey4uLnByb3BzfVxuICAgICAgPlxuICAgICAgICA8VGV4dFxuICAgICAgICAgIGlzPVwic2VsZWN0XCJcbiAgICAgICAgICBjbGFzc05hbWU9e3RoZW1lZENsYXNzTmFtZX1cbiAgICAgICAgICBpZD17aWR9XG4gICAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9XG4gICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cbiAgICAgICAgICBhdXRvRm9jdXM9e2F1dG9Gb2N1c31cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgYXJpYS1pbnZhbGlkPXtTdHJpbmcoaXNJbnZhbGlkKX1cbiAgICAgICAgICBzaXplPXt0ZXh0U2l6ZX1cbiAgICAgICAgICBib3JkZXJSYWRpdXM9e2JvcmRlclJhZGl1c31cbiAgICAgICAgICB0ZXh0VHJhbnNmb3JtPVwiZGVmYXVsdFwiXG4gICAgICAgICAgcGFkZGluZ0xlZnQ9e01hdGgucm91bmQoaGVpZ2h0IC8gMy4yKX1cbiAgICAgICAgICAvLyBQcm92aWRlIGVub3VnaCBzcGFjZSBmb3IgYXV0by1zaXppbmcgc2VsZWN0IGluY2x1ZGluZyB0aGUgaWNvblxuICAgICAgICAgIHBhZGRpbmdSaWdodD17aWNvbk1hcmdpbiAqIDIgKyBpY29uU2l6ZX1cbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9UZXh0PlxuICAgICAgICA8SWNvblxuICAgICAgICAgIGljb249XCJjYXJldC1kb3duXCJcbiAgICAgICAgICBjb2xvcj1cImRlZmF1bHRcIlxuICAgICAgICAgIHNpemU9e2ljb25TaXplfVxuICAgICAgICAgIHBvc2l0aW9uPVwiYWJzb2x1dGVcIlxuICAgICAgICAgIHRvcD1cIjUwJVwiXG4gICAgICAgICAgbWFyZ2luVG9wPXstaWNvblNpemUgLyAyfVxuICAgICAgICAgIHJpZ2h0PXtpY29uTWFyZ2lufVxuICAgICAgICAgIHBvaW50ZXJFdmVudHM9XCJub25lXCJcbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoVGhlbWUoU2VsZWN0KVxuIl19