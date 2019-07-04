import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Box, { dimensions, spacing, position, layout } from 'ui-box';
import { Text } from '../../typography';
import { Icon } from '../../icon';
import { withTheme } from '../../theme';

var Select =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Select, _PureComponent);

  function Select() {
    _classCallCheck(this, Select);

    return _possibleConstructorReturn(this, _getPrototypeOf(Select).apply(this, arguments));
  }

  _createClass(Select, [{
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
          props = _objectWithoutProperties(_this$props, ["theme", "id", "name", "height", "children", "defaultValue", "disabled", "onChange", "value", "required", "autoFocus", "isInvalid", "appearance"]);

      var themedClassName = theme.getSelectClassName(appearance);
      var textSize = theme.getTextSizeForControlHeight(height);
      var borderRadius = theme.getBorderRadiusForControlHeight(height);
      var iconSize = theme.getIconSizeForSelect(height);
      var iconMargin = height >= 36 ? 12 : 8;
      return React.createElement(Box, _extends({
        display: "inline-flex",
        flex: 1,
        position: "relative",
        width: "auto",
        height: height
      }, props), React.createElement(Text, {
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
      }, children), React.createElement(Icon, {
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
}(PureComponent);

Select.displayName = "Select";

_defineProperty(Select, "propTypes", _objectSpread({}, dimensions.propTypes, spacing.propTypes, position.propTypes, layout.propTypes, {
  /**
   * The id attribute for the select.
   */
  id: PropTypes.string,

  /**
   * The name attribute for the select.
   */
  name: PropTypes.string,

  /**
   * The options that are passed to the select.
   */
  children: PropTypes.node,

  /**
   * The initial value of an uncontrolled select
   */
  defaultValue: PropTypes.any,

  /**
   * Function called when value changes.
   */
  onChange: PropTypes.func,

  /**
   * The value of the select.
   */
  value: PropTypes.any,

  /**
   * When true, the select is required.
   */
  required: PropTypes.bool,

  /**
   * When true, the select should auto focus.
   */
  autoFocus: PropTypes.bool,

  /**
   * When true, the select is invalid.
   */
  isInvalid: PropTypes.bool,

  /**
   * The appearance of the select. The default theme only supports default.
   */
  appearance: PropTypes.string.isRequired,

  /**
   * Theme provided by ThemeProvider.
   */
  theme: PropTypes.object.isRequired
}));

_defineProperty(Select, "defaultProps", {
  appearance: 'default',
  height: 32,
  isInvalid: false
});

export default withTheme(Select);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZWxlY3Qvc3JjL1NlbGVjdC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJCb3giLCJkaW1lbnNpb25zIiwic3BhY2luZyIsInBvc2l0aW9uIiwibGF5b3V0IiwiVGV4dCIsIkljb24iLCJ3aXRoVGhlbWUiLCJTZWxlY3QiLCJwcm9wcyIsInRoZW1lIiwiaWQiLCJuYW1lIiwiaGVpZ2h0IiwiY2hpbGRyZW4iLCJkZWZhdWx0VmFsdWUiLCJkaXNhYmxlZCIsIm9uQ2hhbmdlIiwidmFsdWUiLCJyZXF1aXJlZCIsImF1dG9Gb2N1cyIsImlzSW52YWxpZCIsImFwcGVhcmFuY2UiLCJ0aGVtZWRDbGFzc05hbWUiLCJnZXRTZWxlY3RDbGFzc05hbWUiLCJ0ZXh0U2l6ZSIsImdldFRleHRTaXplRm9yQ29udHJvbEhlaWdodCIsImJvcmRlclJhZGl1cyIsImdldEJvcmRlclJhZGl1c0ZvckNvbnRyb2xIZWlnaHQiLCJpY29uU2l6ZSIsImdldEljb25TaXplRm9yU2VsZWN0IiwiaWNvbk1hcmdpbiIsIlN0cmluZyIsIk1hdGgiLCJyb3VuZCIsInByb3BUeXBlcyIsInN0cmluZyIsIm5vZGUiLCJhbnkiLCJmdW5jIiwiYm9vbCIsImlzUmVxdWlyZWQiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLGFBQWhCLFFBQXFDLE9BQXJDO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLEdBQVAsSUFBY0MsVUFBZCxFQUEwQkMsT0FBMUIsRUFBbUNDLFFBQW5DLEVBQTZDQyxNQUE3QyxRQUEyRCxRQUEzRDtBQUNBLFNBQVNDLElBQVQsUUFBcUIsa0JBQXJCO0FBQ0EsU0FBU0MsSUFBVCxRQUFxQixZQUFyQjtBQUNBLFNBQVNDLFNBQVQsUUFBMEIsYUFBMUI7O0lBRU1DLE07Ozs7Ozs7Ozs7Ozs7NkJBb0ZLO0FBQUEsd0JBaUJILEtBQUtD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QXhCLEVBQUFBLElBQUksRUFBRWIsU0FBUyxDQUFDcUMsTTs7QUFFaEI7OztBQUdBdEIsRUFBQUEsUUFBUSxFQUFFZixTQUFTLENBQUNzQyxJOztBQUVwQjs7O0FBR0F0QixFQUFBQSxZQUFZLEVBQUVoQixTQUFTLENBQUN1QyxHOztBQUV4Qjs7O0FBR0FyQixFQUFBQSxRQUFRLEVBQUVsQixTQUFTLENBQUN3QyxJOztBQUVwQjs7O0FBR0FyQixFQUFBQSxLQUFLLEVBQUVuQixTQUFTLENBQUN1QyxHOztBQUVqQjs7O0FBR0FuQixFQUFBQSxRQUFRLEVBQUVwQixTQUFTLENBQUN5QyxJOztBQUVwQjs7O0FBR0FwQixFQUFBQSxTQUFTLEVBQUVyQixTQUFTLENBQUN5QyxJOztBQUVyQjs7O0FBR0FuQixFQUFBQSxTQUFTLEVBQUV0QixTQUFTLENBQUN5QyxJOztBQUVyQjs7O0FBR0FsQixFQUFBQSxVQUFVLEVBQUV2QixTQUFTLENBQUNxQyxNQUFWLENBQWlCSyxVOztBQUU3Qjs7O0FBR0EvQixFQUFBQSxLQUFLLEVBQUVYLFNBQVMsQ0FBQzJDLE1BQVYsQ0FBaUJEOzs7Z0JBM0V0QmpDLE0sa0JBOEVrQjtBQUNwQmMsRUFBQUEsVUFBVSxFQUFFLFNBRFE7QUFFcEJULEVBQUFBLE1BQU0sRUFBRSxFQUZZO0FBR3BCUSxFQUFBQSxTQUFTLEVBQUU7QUFIUyxDOztBQTRFeEIsZUFBZWQsU0FBUyxDQUFDQyxNQUFELENBQXhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBCb3gsIHsgZGltZW5zaW9ucywgc3BhY2luZywgcG9zaXRpb24sIGxheW91dCB9IGZyb20gJ3VpLWJveCdcbmltcG9ydCB7IFRleHQgfSBmcm9tICcuLi8uLi90eXBvZ3JhcGh5J1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJy4uLy4uL2ljb24nXG5pbXBvcnQgeyB3aXRoVGhlbWUgfSBmcm9tICcuLi8uLi90aGVtZSdcblxuY2xhc3MgU2VsZWN0IGV4dGVuZHMgUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLyoqXG4gICAgICogQ29tcG9zZXMgdGhlIGRpbWVuc2lvbnMgc3BlYyBmcm9tIHRoZSBCb3ggcHJpbWl0aXZpZS5cbiAgICAgKi9cbiAgICAuLi5kaW1lbnNpb25zLnByb3BUeXBlcyxcblxuICAgIC8qKlxuICAgICAqIENvbXBvc2VzIHRoZSBzcGFjaW5nIHNwZWMgZnJvbSB0aGUgQm94IHByaW1pdGl2aWUuXG4gICAgICovXG4gICAgLi4uc3BhY2luZy5wcm9wVHlwZXMsXG5cbiAgICAvKipcbiAgICAgKiBDb21wb3NlcyB0aGUgcG9zaXRpb24gc3BlYyBmcm9tIHRoZSBCb3ggcHJpbWl0aXZpZS5cbiAgICAgKi9cbiAgICAuLi5wb3NpdGlvbi5wcm9wVHlwZXMsXG5cbiAgICAvKipcbiAgICAgKiBDb21wb3NlcyB0aGUgbGF5b3V0IHNwZWMgZnJvbSB0aGUgQm94IHByaW1pdGl2aWUuXG4gICAgICovXG4gICAgLi4ubGF5b3V0LnByb3BUeXBlcyxcblxuICAgIC8qKlxuICAgICAqIFRoZSBpZCBhdHRyaWJ1dGUgZm9yIHRoZSBzZWxlY3QuXG4gICAgICovXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBhdHRyaWJ1dGUgZm9yIHRoZSBzZWxlY3QuXG4gICAgICovXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblxuICAgIC8qKlxuICAgICAqIFRoZSBvcHRpb25zIHRoYXQgYXJlIHBhc3NlZCB0byB0aGUgc2VsZWN0LlxuICAgICAqL1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbml0aWFsIHZhbHVlIG9mIGFuIHVuY29udHJvbGxlZCBzZWxlY3RcbiAgICAgKi9cbiAgICBkZWZhdWx0VmFsdWU6IFByb3BUeXBlcy5hbnksXG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiBjYWxsZWQgd2hlbiB2YWx1ZSBjaGFuZ2VzLlxuICAgICAqL1xuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBvZiB0aGUgc2VsZWN0LlxuICAgICAqL1xuICAgIHZhbHVlOiBQcm9wVHlwZXMuYW55LFxuXG4gICAgLyoqXG4gICAgICogV2hlbiB0cnVlLCB0aGUgc2VsZWN0IGlzIHJlcXVpcmVkLlxuICAgICAqL1xuICAgIHJlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIC8qKlxuICAgICAqIFdoZW4gdHJ1ZSwgdGhlIHNlbGVjdCBzaG91bGQgYXV0byBmb2N1cy5cbiAgICAgKi9cbiAgICBhdXRvRm9jdXM6IFByb3BUeXBlcy5ib29sLFxuXG4gICAgLyoqXG4gICAgICogV2hlbiB0cnVlLCB0aGUgc2VsZWN0IGlzIGludmFsaWQuXG4gICAgICovXG4gICAgaXNJbnZhbGlkOiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIC8qKlxuICAgICAqIFRoZSBhcHBlYXJhbmNlIG9mIHRoZSBzZWxlY3QuIFRoZSBkZWZhdWx0IHRoZW1lIG9ubHkgc3VwcG9ydHMgZGVmYXVsdC5cbiAgICAgKi9cbiAgICBhcHBlYXJhbmNlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cbiAgICAvKipcbiAgICAgKiBUaGVtZSBwcm92aWRlZCBieSBUaGVtZVByb3ZpZGVyLlxuICAgICAqL1xuICAgIHRoZW1lOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgYXBwZWFyYW5jZTogJ2RlZmF1bHQnLFxuICAgIGhlaWdodDogMzIsXG4gICAgaXNJbnZhbGlkOiBmYWxzZVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHRoZW1lLFxuXG4gICAgICBpZCxcbiAgICAgIG5hbWUsXG4gICAgICBoZWlnaHQsXG4gICAgICBjaGlsZHJlbixcbiAgICAgIGRlZmF1bHRWYWx1ZSxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgb25DaGFuZ2UsXG4gICAgICB2YWx1ZSxcbiAgICAgIHJlcXVpcmVkLFxuICAgICAgYXV0b0ZvY3VzLFxuICAgICAgaXNJbnZhbGlkLFxuICAgICAgYXBwZWFyYW5jZSxcbiAgICAgIC4uLnByb3BzXG4gICAgfSA9IHRoaXMucHJvcHNcblxuICAgIGNvbnN0IHRoZW1lZENsYXNzTmFtZSA9IHRoZW1lLmdldFNlbGVjdENsYXNzTmFtZShhcHBlYXJhbmNlKVxuICAgIGNvbnN0IHRleHRTaXplID0gdGhlbWUuZ2V0VGV4dFNpemVGb3JDb250cm9sSGVpZ2h0KGhlaWdodClcbiAgICBjb25zdCBib3JkZXJSYWRpdXMgPSB0aGVtZS5nZXRCb3JkZXJSYWRpdXNGb3JDb250cm9sSGVpZ2h0KGhlaWdodClcbiAgICBjb25zdCBpY29uU2l6ZSA9IHRoZW1lLmdldEljb25TaXplRm9yU2VsZWN0KGhlaWdodClcbiAgICBjb25zdCBpY29uTWFyZ2luID0gaGVpZ2h0ID49IDM2ID8gMTIgOiA4XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEJveFxuICAgICAgICBkaXNwbGF5PVwiaW5saW5lLWZsZXhcIlxuICAgICAgICBmbGV4PXsxfVxuICAgICAgICBwb3NpdGlvbj1cInJlbGF0aXZlXCJcbiAgICAgICAgd2lkdGg9XCJhdXRvXCJcbiAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgID5cbiAgICAgICAgPFRleHRcbiAgICAgICAgICBpcz1cInNlbGVjdFwiXG4gICAgICAgICAgY2xhc3NOYW1lPXt0aGVtZWRDbGFzc05hbWV9XG4gICAgICAgICAgaWQ9e2lkfVxuICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgIGRlZmF1bHRWYWx1ZT17ZGVmYXVsdFZhbHVlfVxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICByZXF1aXJlZD17cmVxdWlyZWR9XG4gICAgICAgICAgYXV0b0ZvY3VzPXthdXRvRm9jdXN9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIGFyaWEtaW52YWxpZD17U3RyaW5nKGlzSW52YWxpZCl9XG4gICAgICAgICAgc2l6ZT17dGV4dFNpemV9XG4gICAgICAgICAgYm9yZGVyUmFkaXVzPXtib3JkZXJSYWRpdXN9XG4gICAgICAgICAgdGV4dFRyYW5zZm9ybT1cImRlZmF1bHRcIlxuICAgICAgICAgIHBhZGRpbmdMZWZ0PXtNYXRoLnJvdW5kKGhlaWdodCAvIDMuMil9XG4gICAgICAgICAgLy8gUHJvdmlkZSBlbm91Z2ggc3BhY2UgZm9yIGF1dG8tc2l6aW5nIHNlbGVjdCBpbmNsdWRpbmcgdGhlIGljb25cbiAgICAgICAgICBwYWRkaW5nUmlnaHQ9e2ljb25NYXJnaW4gKiAyICsgaWNvblNpemV9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvVGV4dD5cbiAgICAgICAgPEljb25cbiAgICAgICAgICBpY29uPVwiY2FyZXQtZG93blwiXG4gICAgICAgICAgY29sb3I9XCJkZWZhdWx0XCJcbiAgICAgICAgICBzaXplPXtpY29uU2l6ZX1cbiAgICAgICAgICBwb3NpdGlvbj1cImFic29sdXRlXCJcbiAgICAgICAgICB0b3A9XCI1MCVcIlxuICAgICAgICAgIG1hcmdpblRvcD17LWljb25TaXplIC8gMn1cbiAgICAgICAgICByaWdodD17aWNvbk1hcmdpbn1cbiAgICAgICAgICBwb2ludGVyRXZlbnRzPVwibm9uZVwiXG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFRoZW1lKFNlbGVjdClcbiJdfQ==