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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uiBox = _interopRequireWildcard(require("ui-box"));

var _safeInvoke = _interopRequireDefault(require("../../lib/safe-invoke"));

var _SegmentedControlRadio = _interopRequireDefault(require("./SegmentedControlRadio"));

var radioCount = 1; // Used for generating unique input names

var SegmentedControl =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(SegmentedControl, _PureComponent);

  function SegmentedControl(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, SegmentedControl);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SegmentedControl).call(this, props, context));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "isControlled", function () {
      return typeof _this.props.value !== 'undefined' && _this.props.value !== null;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleChange", function (value) {
      // Save a render cycle when it's a controlled input
      if (!_this.isControlled()) {
        _this.setState({
          value: value
        });
      }

      (0, _safeInvoke.default)(_this.props.onChange, value);
    });
    var _value = props.defaultValue;

    if (typeof _value === 'undefined' || _value === null) {
      _value = props.options[0].value;
    }

    _this.state = {
      value: _value
    };
    _this.name = "SegmentedControl-".concat(radioCount);
    radioCount += 1;
    return _this;
  }

  (0, _createClass2.default)(SegmentedControl, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          filterOutValue = _this$props.value,
          name = _this$props.name,
          height = _this$props.height,
          options = _this$props.options,
          onChange = _this$props.onChange,
          defaultValue = _this$props.defaultValue,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["value", "name", "height", "options", "onChange", "defaultValue"]); // Allows it to behave like a controlled input

      var value = this.state.value;

      if (this.isControlled()) {
        value = this.props.value;
      }

      return _react.default.createElement(_uiBox.default, (0, _extends2.default)({
        display: "flex",
        marginRight: -1,
        height: height
      }, props), options.map(function (option, index) {
        return _react.default.createElement(_SegmentedControlRadio.default, {
          key: option.value,
          id: _this2.name + index,
          name: name || _this2.name,
          label: option.label,
          value: String(option.value),
          height: height,
          checked: value === option.value,
          onChange: _this2.handleChange.bind(null, option.value),
          appearance: "default",
          isFirstItem: index === 0,
          isLastItem: index === options.length - 1
        });
      }));
    }
  }]);
  return SegmentedControl;
}(_react.PureComponent);

exports.default = SegmentedControl;
SegmentedControl.displayName = "SegmentedControl";
(0, _defineProperty2.default)(SegmentedControl, "propTypes", (0, _objectSpread2.default)({}, _uiBox.spacing.propTypes, _uiBox.position.propTypes, _uiBox.layout.propTypes, _uiBox.dimensions.propTypes, {
  /**
   * The options for the radios of the Segmented Control.
   */
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    label: _propTypes.default.node.isRequired,
    value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.bool]).isRequired
  })).isRequired,

  /**
   * The current value of the Segmented Control when controlled.
   */
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.bool]),

  /**
   * The default value of the Segmented Control when uncontrolled.
   */
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.bool]),

  /**
   * Function called when the value changes.
   */
  onChange: _propTypes.default.func,

  /**
   * The name of the radio group.
   */
  name: _propTypes.default.string,

  /**
   * The height of the Segmented Control.
   */
  height: _propTypes.default.number
}));
(0, _defineProperty2.default)(SegmentedControl, "defaultProps", {
  height: 32
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZWdtZW50ZWQtY29udHJvbC9zcmMvU2VnbWVudGVkQ29udHJvbC5qcyJdLCJuYW1lcyI6WyJyYWRpb0NvdW50IiwiU2VnbWVudGVkQ29udHJvbCIsInByb3BzIiwiY29udGV4dCIsInZhbHVlIiwiaXNDb250cm9sbGVkIiwic2V0U3RhdGUiLCJvbkNoYW5nZSIsImRlZmF1bHRWYWx1ZSIsIm9wdGlvbnMiLCJzdGF0ZSIsIm5hbWUiLCJmaWx0ZXJPdXRWYWx1ZSIsImhlaWdodCIsIm1hcCIsIm9wdGlvbiIsImluZGV4IiwibGFiZWwiLCJTdHJpbmciLCJoYW5kbGVDaGFuZ2UiLCJiaW5kIiwibGVuZ3RoIiwiUHVyZUNvbXBvbmVudCIsInNwYWNpbmciLCJwcm9wVHlwZXMiLCJwb3NpdGlvbiIsImxheW91dCIsImRpbWVuc2lvbnMiLCJQcm9wVHlwZXMiLCJhcnJheU9mIiwic2hhcGUiLCJub2RlIiwiaXNSZXF1aXJlZCIsIm9uZU9mVHlwZSIsIm51bWJlciIsInN0cmluZyIsImJvb2wiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBSUEsVUFBVSxHQUFHLENBQWpCLEMsQ0FBbUI7O0lBRUVDLGdCOzs7OztBQThEbkIsNEJBQVlDLEtBQVosRUFBbUJDLE9BQW5CLEVBQTRCO0FBQUE7O0FBQUE7QUFDMUIsc0hBQU1ELEtBQU4sRUFBYUMsT0FBYjtBQUQwQiwrRkFnQmIsWUFBTTtBQUNuQixhQUFPLE9BQU8sTUFBS0QsS0FBTCxDQUFXRSxLQUFsQixLQUE0QixXQUE1QixJQUEyQyxNQUFLRixLQUFMLENBQVdFLEtBQVgsS0FBcUIsSUFBdkU7QUFDRCxLQWxCMkI7QUFBQSwrRkFvQmIsVUFBQUEsS0FBSyxFQUFJO0FBQ3RCO0FBQ0EsVUFBSSxDQUFDLE1BQUtDLFlBQUwsRUFBTCxFQUEwQjtBQUN4QixjQUFLQyxRQUFMLENBQWM7QUFBRUYsVUFBQUEsS0FBSyxFQUFMQTtBQUFGLFNBQWQ7QUFDRDs7QUFFRCwrQkFBVyxNQUFLRixLQUFMLENBQVdLLFFBQXRCLEVBQWdDSCxLQUFoQztBQUNELEtBM0IyQjtBQUcxQixRQUFJQSxNQUFLLEdBQUdGLEtBQUssQ0FBQ00sWUFBbEI7O0FBQ0EsUUFBSSxPQUFPSixNQUFQLEtBQWlCLFdBQWpCLElBQWdDQSxNQUFLLEtBQUssSUFBOUMsRUFBb0Q7QUFDbERBLE1BQUFBLE1BQUssR0FBR0YsS0FBSyxDQUFDTyxPQUFOLENBQWMsQ0FBZCxFQUFpQkwsS0FBekI7QUFDRDs7QUFFRCxVQUFLTSxLQUFMLEdBQWE7QUFDWE4sTUFBQUEsS0FBSyxFQUFMQTtBQURXLEtBQWI7QUFJQSxVQUFLTyxJQUFMLDhCQUFnQ1gsVUFBaEM7QUFDQUEsSUFBQUEsVUFBVSxJQUFJLENBQWQ7QUFiMEI7QUFjM0I7Ozs7NkJBZVE7QUFBQTs7QUFBQSx3QkFTSCxLQUFLRSxLQVRGO0FBQUEsVUFFRVUsY0FGRixlQUVMUixLQUZLO0FBQUEsVUFHTE8sSUFISyxlQUdMQSxJQUhLO0FBQUEsVUFJTEUsTUFKSyxlQUlMQSxNQUpLO0FBQUEsVUFLTEosT0FMSyxlQUtMQSxPQUxLO0FBQUEsVUFNTEYsUUFOSyxlQU1MQSxRQU5LO0FBQUEsVUFPTEMsWUFQSyxlQU9MQSxZQVBLO0FBQUEsVUFRRk4sS0FSRSw0SEFXUDs7QUFYTyxVQVlERSxLQVpDLEdBWVMsS0FBS00sS0FaZCxDQVlETixLQVpDOztBQWFQLFVBQUksS0FBS0MsWUFBTCxFQUFKLEVBQXlCO0FBQ3ZCRCxRQUFBQSxLQUFLLEdBQUcsS0FBS0YsS0FBTCxDQUFXRSxLQUFuQjtBQUNEOztBQUVELGFBQ0UsNkJBQUMsY0FBRDtBQUFLLFFBQUEsT0FBTyxFQUFDLE1BQWI7QUFBb0IsUUFBQSxXQUFXLEVBQUUsQ0FBQyxDQUFsQztBQUFxQyxRQUFBLE1BQU0sRUFBRVM7QUFBN0MsU0FBeURYLEtBQXpELEdBQ0dPLE9BQU8sQ0FBQ0ssR0FBUixDQUFZLFVBQUNDLE1BQUQsRUFBU0MsS0FBVDtBQUFBLGVBQ1gsNkJBQUMsOEJBQUQ7QUFDRSxVQUFBLEdBQUcsRUFBRUQsTUFBTSxDQUFDWCxLQURkO0FBRUUsVUFBQSxFQUFFLEVBQUUsTUFBSSxDQUFDTyxJQUFMLEdBQVlLLEtBRmxCO0FBR0UsVUFBQSxJQUFJLEVBQUVMLElBQUksSUFBSSxNQUFJLENBQUNBLElBSHJCO0FBSUUsVUFBQSxLQUFLLEVBQUVJLE1BQU0sQ0FBQ0UsS0FKaEI7QUFLRSxVQUFBLEtBQUssRUFBRUMsTUFBTSxDQUFDSCxNQUFNLENBQUNYLEtBQVIsQ0FMZjtBQU1FLFVBQUEsTUFBTSxFQUFFUyxNQU5WO0FBT0UsVUFBQSxPQUFPLEVBQUVULEtBQUssS0FBS1csTUFBTSxDQUFDWCxLQVA1QjtBQVFFLFVBQUEsUUFBUSxFQUFFLE1BQUksQ0FBQ2UsWUFBTCxDQUFrQkMsSUFBbEIsQ0FBdUIsSUFBdkIsRUFBNkJMLE1BQU0sQ0FBQ1gsS0FBcEMsQ0FSWjtBQVNFLFVBQUEsVUFBVSxFQUFDLFNBVGI7QUFVRSxVQUFBLFdBQVcsRUFBRVksS0FBSyxLQUFLLENBVnpCO0FBV0UsVUFBQSxVQUFVLEVBQUVBLEtBQUssS0FBS1AsT0FBTyxDQUFDWSxNQUFSLEdBQWlCO0FBWHpDLFVBRFc7QUFBQSxPQUFaLENBREgsQ0FERjtBQW1CRDs7O0VBL0gyQ0Msb0I7OztBQUF6QnJCLGdCOzhCQUFBQSxnQiwrQ0FLZHNCLGVBQVFDLFMsRUFDUkMsZ0JBQVNELFMsRUFDVEUsY0FBT0YsUyxFQUNQRyxrQkFBV0gsUztBQUVkOzs7QUFHQWYsRUFBQUEsT0FBTyxFQUFFbUIsbUJBQVVDLE9BQVYsQ0FDUEQsbUJBQVVFLEtBQVYsQ0FBZ0I7QUFDZGIsSUFBQUEsS0FBSyxFQUFFVyxtQkFBVUcsSUFBVixDQUFlQyxVQURSO0FBRWQ1QixJQUFBQSxLQUFLLEVBQUV3QixtQkFBVUssU0FBVixDQUFvQixDQUN6QkwsbUJBQVVNLE1BRGUsRUFFekJOLG1CQUFVTyxNQUZlLEVBR3pCUCxtQkFBVVEsSUFIZSxDQUFwQixFQUlKSjtBQU5XLEdBQWhCLENBRE8sRUFTUEEsVTs7QUFFRjs7O0FBR0E1QixFQUFBQSxLQUFLLEVBQUV3QixtQkFBVUssU0FBVixDQUFvQixDQUN6QkwsbUJBQVVNLE1BRGUsRUFFekJOLG1CQUFVTyxNQUZlLEVBR3pCUCxtQkFBVVEsSUFIZSxDQUFwQixDOztBQU1QOzs7QUFHQTVCLEVBQUFBLFlBQVksRUFBRW9CLG1CQUFVSyxTQUFWLENBQW9CLENBQ2hDTCxtQkFBVU0sTUFEc0IsRUFFaENOLG1CQUFVTyxNQUZzQixFQUdoQ1AsbUJBQVVRLElBSHNCLENBQXBCLEM7O0FBTWQ7OztBQUdBN0IsRUFBQUEsUUFBUSxFQUFFcUIsbUJBQVVTLEk7O0FBRXBCOzs7QUFHQTFCLEVBQUFBLElBQUksRUFBRWlCLG1CQUFVTyxNOztBQUVoQjs7O0FBR0F0QixFQUFBQSxNQUFNLEVBQUVlLG1CQUFVTTs7OEJBdkREakMsZ0Isa0JBMERHO0FBQ3BCWSxFQUFBQSxNQUFNLEVBQUU7QUFEWSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBCb3gsIHsgc3BhY2luZywgcG9zaXRpb24sIGxheW91dCwgZGltZW5zaW9ucyB9IGZyb20gJ3VpLWJveCdcbmltcG9ydCBzYWZlSW52b2tlIGZyb20gJy4uLy4uL2xpYi9zYWZlLWludm9rZSdcbmltcG9ydCBTZWdtZW50ZWRDb250cm9sUmFkaW8gZnJvbSAnLi9TZWdtZW50ZWRDb250cm9sUmFkaW8nXG5cbmxldCByYWRpb0NvdW50ID0gMSAvLyBVc2VkIGZvciBnZW5lcmF0aW5nIHVuaXF1ZSBpbnB1dCBuYW1lc1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWdtZW50ZWRDb250cm9sIGV4dGVuZHMgUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLyoqXG4gICAgICogQ29tcG9zZXMgc29tZSBCb3ggQVBJcy5cbiAgICAgKi9cbiAgICAuLi5zcGFjaW5nLnByb3BUeXBlcyxcbiAgICAuLi5wb3NpdGlvbi5wcm9wVHlwZXMsXG4gICAgLi4ubGF5b3V0LnByb3BUeXBlcyxcbiAgICAuLi5kaW1lbnNpb25zLnByb3BUeXBlcyxcblxuICAgIC8qKlxuICAgICAqIFRoZSBvcHRpb25zIGZvciB0aGUgcmFkaW9zIG9mIHRoZSBTZWdtZW50ZWQgQ29udHJvbC5cbiAgICAgKi9cbiAgICBvcHRpb25zOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIGxhYmVsOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgIFByb3BUeXBlcy5ib29sXG4gICAgICAgIF0pLmlzUmVxdWlyZWRcbiAgICAgIH0pXG4gICAgKS5pc1JlcXVpcmVkLFxuXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIFNlZ21lbnRlZCBDb250cm9sIHdoZW4gY29udHJvbGxlZC5cbiAgICAgKi9cbiAgICB2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ib29sXG4gICAgXSksXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZGVmYXVsdCB2YWx1ZSBvZiB0aGUgU2VnbWVudGVkIENvbnRyb2wgd2hlbiB1bmNvbnRyb2xsZWQuXG4gICAgICovXG4gICAgZGVmYXVsdFZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLmJvb2xcbiAgICBdKSxcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGNhbGxlZCB3aGVuIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICAgICAqL1xuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcblxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSByYWRpbyBncm91cC5cbiAgICAgKi9cbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gICAgLyoqXG4gICAgICogVGhlIGhlaWdodCBvZiB0aGUgU2VnbWVudGVkIENvbnRyb2wuXG4gICAgICovXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyXG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGhlaWdodDogMzJcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgc3VwZXIocHJvcHMsIGNvbnRleHQpXG5cbiAgICBsZXQgdmFsdWUgPSBwcm9wcy5kZWZhdWx0VmFsdWVcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgdmFsdWUgPSBwcm9wcy5vcHRpb25zWzBdLnZhbHVlXG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlXG4gICAgfVxuXG4gICAgdGhpcy5uYW1lID0gYFNlZ21lbnRlZENvbnRyb2wtJHtyYWRpb0NvdW50fWBcbiAgICByYWRpb0NvdW50ICs9IDFcbiAgfVxuXG4gIGlzQ29udHJvbGxlZCA9ICgpID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMucHJvcHMudmFsdWUgIT09ICd1bmRlZmluZWQnICYmIHRoaXMucHJvcHMudmFsdWUgIT09IG51bGxcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZSA9IHZhbHVlID0+IHtcbiAgICAvLyBTYXZlIGEgcmVuZGVyIGN5Y2xlIHdoZW4gaXQncyBhIGNvbnRyb2xsZWQgaW5wdXRcbiAgICBpZiAoIXRoaXMuaXNDb250cm9sbGVkKCkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZSB9KVxuICAgIH1cblxuICAgIHNhZmVJbnZva2UodGhpcy5wcm9wcy5vbkNoYW5nZSwgdmFsdWUpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdmFsdWU6IGZpbHRlck91dFZhbHVlLCAvLyBGaWx0ZXIgb3V0LlxuICAgICAgbmFtZSxcbiAgICAgIGhlaWdodCxcbiAgICAgIG9wdGlvbnMsXG4gICAgICBvbkNoYW5nZSxcbiAgICAgIGRlZmF1bHRWYWx1ZSxcbiAgICAgIC4uLnByb3BzXG4gICAgfSA9IHRoaXMucHJvcHNcblxuICAgIC8vIEFsbG93cyBpdCB0byBiZWhhdmUgbGlrZSBhIGNvbnRyb2xsZWQgaW5wdXRcbiAgICBsZXQgeyB2YWx1ZSB9ID0gdGhpcy5zdGF0ZVxuICAgIGlmICh0aGlzLmlzQ29udHJvbGxlZCgpKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucHJvcHMudmFsdWVcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEJveCBkaXNwbGF5PVwiZmxleFwiIG1hcmdpblJpZ2h0PXstMX0gaGVpZ2h0PXtoZWlnaHR9IHsuLi5wcm9wc30+XG4gICAgICAgIHtvcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4gKFxuICAgICAgICAgIDxTZWdtZW50ZWRDb250cm9sUmFkaW9cbiAgICAgICAgICAgIGtleT17b3B0aW9uLnZhbHVlfVxuICAgICAgICAgICAgaWQ9e3RoaXMubmFtZSArIGluZGV4fVxuICAgICAgICAgICAgbmFtZT17bmFtZSB8fCB0aGlzLm5hbWV9XG4gICAgICAgICAgICBsYWJlbD17b3B0aW9uLmxhYmVsfVxuICAgICAgICAgICAgdmFsdWU9e1N0cmluZyhvcHRpb24udmFsdWUpfVxuICAgICAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgICAgICBjaGVja2VkPXt2YWx1ZSA9PT0gb3B0aW9uLnZhbHVlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQobnVsbCwgb3B0aW9uLnZhbHVlKX1cbiAgICAgICAgICAgIGFwcGVhcmFuY2U9XCJkZWZhdWx0XCJcbiAgICAgICAgICAgIGlzRmlyc3RJdGVtPXtpbmRleCA9PT0gMH1cbiAgICAgICAgICAgIGlzTGFzdEl0ZW09e2luZGV4ID09PSBvcHRpb25zLmxlbmd0aCAtIDF9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSl9XG4gICAgICA8L0JveD5cbiAgICApXG4gIH1cbn1cbiJdfQ==