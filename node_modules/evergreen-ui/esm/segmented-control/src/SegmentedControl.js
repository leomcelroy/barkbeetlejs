import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Box, { spacing, position, layout, dimensions } from 'ui-box';
import safeInvoke from '../../lib/safe-invoke';
import SegmentedControlRadio from './SegmentedControlRadio';
var radioCount = 1; // Used for generating unique input names

var SegmentedControl =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(SegmentedControl, _PureComponent);

  function SegmentedControl(props, context) {
    var _this;

    _classCallCheck(this, SegmentedControl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SegmentedControl).call(this, props, context));

    _defineProperty(_assertThisInitialized(_this), "isControlled", function () {
      return typeof _this.props.value !== 'undefined' && _this.props.value !== null;
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (value) {
      // Save a render cycle when it's a controlled input
      if (!_this.isControlled()) {
        _this.setState({
          value: value
        });
      }

      safeInvoke(_this.props.onChange, value);
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

  _createClass(SegmentedControl, [{
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
          props = _objectWithoutProperties(_this$props, ["value", "name", "height", "options", "onChange", "defaultValue"]); // Allows it to behave like a controlled input


      var value = this.state.value;

      if (this.isControlled()) {
        value = this.props.value;
      }

      return React.createElement(Box, _extends({
        display: "flex",
        marginRight: -1,
        height: height
      }, props), options.map(function (option, index) {
        return React.createElement(SegmentedControlRadio, {
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
}(PureComponent);

SegmentedControl.displayName = "SegmentedControl";

_defineProperty(SegmentedControl, "propTypes", _objectSpread({}, spacing.propTypes, position.propTypes, layout.propTypes, dimensions.propTypes, {
  /**
   * The options for the radios of the Segmented Control.
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]).isRequired
  })).isRequired,

  /**
   * The current value of the Segmented Control when controlled.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),

  /**
   * The default value of the Segmented Control when uncontrolled.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),

  /**
   * Function called when the value changes.
   */
  onChange: PropTypes.func,

  /**
   * The name of the radio group.
   */
  name: PropTypes.string,

  /**
   * The height of the Segmented Control.
   */
  height: PropTypes.number
}));

_defineProperty(SegmentedControl, "defaultProps", {
  height: 32
});

export { SegmentedControl as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZWdtZW50ZWQtY29udHJvbC9zcmMvU2VnbWVudGVkQ29udHJvbC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJCb3giLCJzcGFjaW5nIiwicG9zaXRpb24iLCJsYXlvdXQiLCJkaW1lbnNpb25zIiwic2FmZUludm9rZSIsIlNlZ21lbnRlZENvbnRyb2xSYWRpbyIsInJhZGlvQ291bnQiLCJTZWdtZW50ZWRDb250cm9sIiwicHJvcHMiLCJjb250ZXh0IiwidmFsdWUiLCJpc0NvbnRyb2xsZWQiLCJzZXRTdGF0ZSIsIm9uQ2hhbmdlIiwiZGVmYXVsdFZhbHVlIiwib3B0aW9ucyIsInN0YXRlIiwibmFtZSIsImZpbHRlck91dFZhbHVlIiwiaGVpZ2h0IiwibWFwIiwib3B0aW9uIiwiaW5kZXgiLCJsYWJlbCIsIlN0cmluZyIsImhhbmRsZUNoYW5nZSIsImJpbmQiLCJsZW5ndGgiLCJwcm9wVHlwZXMiLCJhcnJheU9mIiwic2hhcGUiLCJub2RlIiwiaXNSZXF1aXJlZCIsIm9uZU9mVHlwZSIsIm51bWJlciIsInN0cmluZyIsImJvb2wiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxJQUFnQkMsYUFBaEIsUUFBcUMsT0FBckM7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsR0FBUCxJQUFjQyxPQUFkLEVBQXVCQyxRQUF2QixFQUFpQ0MsTUFBakMsRUFBeUNDLFVBQXpDLFFBQTJELFFBQTNEO0FBQ0EsT0FBT0MsVUFBUCxNQUF1Qix1QkFBdkI7QUFDQSxPQUFPQyxxQkFBUCxNQUFrQyx5QkFBbEM7QUFFQSxJQUFJQyxVQUFVLEdBQUcsQ0FBakIsQyxDQUFtQjs7SUFFRUMsZ0I7Ozs7O0FBOERuQiw0QkFBWUMsS0FBWixFQUFtQkMsT0FBbkIsRUFBNEI7QUFBQTs7QUFBQTs7QUFDMUIsMEZBQU1ELEtBQU4sRUFBYUMsT0FBYjs7QUFE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LFMsRUFDUHpCLFVBQVUsQ0FBQ3lCLFM7QUFFZDs7O0FBR0FiLEVBQUFBLE9BQU8sRUFBRWpCLFNBQVMsQ0FBQytCLE9BQVYsQ0FDUC9CLFNBQVMsQ0FBQ2dDLEtBQVYsQ0FBZ0I7QUFDZFAsSUFBQUEsS0FBSyxFQUFFekIsU0FBUyxDQUFDaUMsSUFBVixDQUFlQyxVQURSO0FBRWR0QixJQUFBQSxLQUFLLEVBQUVaLFNBQVMsQ0FBQ21DLFNBQVYsQ0FBb0IsQ0FDekJuQyxTQUFTLENBQUNvQyxNQURlLEVBRXpCcEMsU0FBUyxDQUFDcUMsTUFGZSxFQUd6QnJDLFNBQVMsQ0FBQ3NDLElBSGUsQ0FBcEIsRUFJSko7QUFOVyxHQUFoQixDQURPLEVBU1BBLFU7O0FBRUY7OztBQUdBdEIsRUFBQUEsS0FBSyxFQUFFWixTQUFTLENBQUNtQyxTQUFWLENBQW9CLENBQ3pCbkMsU0FBUyxDQUFDb0MsTUFEZSxFQUV6QnBDLFNBQVMsQ0FBQ3FDLE1BRmUsRUFHekJyQyxTQUFTLENBQUNzQyxJQUhlLENBQXBCLEM7O0FBTVA7OztBQUdBdEIsRUFBQUEsWUFBWSxFQUFFaEIsU0FBUyxDQUFDbUMsU0FBVixDQUFvQixDQUNoQ25DLFNBQVMsQ0FBQ29DLE1BRHNCLEVBRWhDcEMsU0FBUyxDQUFDcUMsTUFGc0IsRUFHaENyQyxTQUFTLENBQUNzQyxJQUhzQixDQUFwQixDOztBQU1kOzs7QUFHQXZCLEVBQUFBLFFBQVEsRUFBRWYsU0FBUyxDQUFDdUMsSTs7QUFFcEI7OztBQUdBcEIsRUFBQUEsSUFBSSxFQUFFbkIsU0FBUyxDQUFDcUMsTTs7QUFFaEI7OztBQUdBaEIsRUFBQUEsTUFBTSxFQUFFckIsU0FBUyxDQUFDb0M7OztnQkF2REQzQixnQixrQkEwREc7QUFDcEJZLEVBQUFBLE1BQU0sRUFBRTtBQURZLEM7O1NBMURIWixnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgQm94LCB7IHNwYWNpbmcsIHBvc2l0aW9uLCBsYXlvdXQsIGRpbWVuc2lvbnMgfSBmcm9tICd1aS1ib3gnXG5pbXBvcnQgc2FmZUludm9rZSBmcm9tICcuLi8uLi9saWIvc2FmZS1pbnZva2UnXG5pbXBvcnQgU2VnbWVudGVkQ29udHJvbFJhZGlvIGZyb20gJy4vU2VnbWVudGVkQ29udHJvbFJhZGlvJ1xuXG5sZXQgcmFkaW9Db3VudCA9IDEgLy8gVXNlZCBmb3IgZ2VuZXJhdGluZyB1bmlxdWUgaW5wdXQgbmFtZXNcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VnbWVudGVkQ29udHJvbCBleHRlbmRzIFB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIC8qKlxuICAgICAqIENvbXBvc2VzIHNvbWUgQm94IEFQSXMuXG4gICAgICovXG4gICAgLi4uc3BhY2luZy5wcm9wVHlwZXMsXG4gICAgLi4ucG9zaXRpb24ucHJvcFR5cGVzLFxuICAgIC4uLmxheW91dC5wcm9wVHlwZXMsXG4gICAgLi4uZGltZW5zaW9ucy5wcm9wVHlwZXMsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgb3B0aW9ucyBmb3IgdGhlIHJhZGlvcyBvZiB0aGUgU2VnbWVudGVkIENvbnRyb2wuXG4gICAgICovXG4gICAgb3B0aW9uczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBsYWJlbDogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgIFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICBQcm9wVHlwZXMuYm9vbFxuICAgICAgICBdKS5pc1JlcXVpcmVkXG4gICAgICB9KVxuICAgICkuaXNSZXF1aXJlZCxcblxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBTZWdtZW50ZWQgQ29udHJvbCB3aGVuIGNvbnRyb2xsZWQuXG4gICAgICovXG4gICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuYm9vbFxuICAgIF0pLFxuXG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQgdmFsdWUgb2YgdGhlIFNlZ21lbnRlZCBDb250cm9sIHdoZW4gdW5jb250cm9sbGVkLlxuICAgICAqL1xuICAgIGRlZmF1bHRWYWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ib29sXG4gICAgXSksXG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiBjYWxsZWQgd2hlbiB0aGUgdmFsdWUgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgcmFkaW8gZ3JvdXAuXG4gICAgICovXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblxuICAgIC8qKlxuICAgICAqIFRoZSBoZWlnaHQgb2YgdGhlIFNlZ21lbnRlZCBDb250cm9sLlxuICAgICAqL1xuICAgIGhlaWdodDogUHJvcFR5cGVzLm51bWJlclxuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBoZWlnaHQ6IDMyXG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xuICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KVxuXG4gICAgbGV0IHZhbHVlID0gcHJvcHMuZGVmYXVsdFZhbHVlXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHZhbHVlID0gcHJvcHMub3B0aW9uc1swXS52YWx1ZVxuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWx1ZVxuICAgIH1cblxuICAgIHRoaXMubmFtZSA9IGBTZWdtZW50ZWRDb250cm9sLSR7cmFkaW9Db3VudH1gXG4gICAgcmFkaW9Db3VudCArPSAxXG4gIH1cblxuICBpc0NvbnRyb2xsZWQgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLnByb3BzLnZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLnByb3BzLnZhbHVlICE9PSBudWxsXG4gIH1cblxuICBoYW5kbGVDaGFuZ2UgPSB2YWx1ZSA9PiB7XG4gICAgLy8gU2F2ZSBhIHJlbmRlciBjeWNsZSB3aGVuIGl0J3MgYSBjb250cm9sbGVkIGlucHV0XG4gICAgaWYgKCF0aGlzLmlzQ29udHJvbGxlZCgpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWUgfSlcbiAgICB9XG5cbiAgICBzYWZlSW52b2tlKHRoaXMucHJvcHMub25DaGFuZ2UsIHZhbHVlKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlOiBmaWx0ZXJPdXRWYWx1ZSwgLy8gRmlsdGVyIG91dC5cbiAgICAgIG5hbWUsXG4gICAgICBoZWlnaHQsXG4gICAgICBvcHRpb25zLFxuICAgICAgb25DaGFuZ2UsXG4gICAgICBkZWZhdWx0VmFsdWUsXG4gICAgICAuLi5wcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzXG5cbiAgICAvLyBBbGxvd3MgaXQgdG8gYmVoYXZlIGxpa2UgYSBjb250cm9sbGVkIGlucHV0XG4gICAgbGV0IHsgdmFsdWUgfSA9IHRoaXMuc3RhdGVcbiAgICBpZiAodGhpcy5pc0NvbnRyb2xsZWQoKSkge1xuICAgICAgdmFsdWUgPSB0aGlzLnByb3BzLnZhbHVlXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxCb3ggZGlzcGxheT1cImZsZXhcIiBtYXJnaW5SaWdodD17LTF9IGhlaWdodD17aGVpZ2h0fSB7Li4ucHJvcHN9PlxuICAgICAgICB7b3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IChcbiAgICAgICAgICA8U2VnbWVudGVkQ29udHJvbFJhZGlvXG4gICAgICAgICAgICBrZXk9e29wdGlvbi52YWx1ZX1cbiAgICAgICAgICAgIGlkPXt0aGlzLm5hbWUgKyBpbmRleH1cbiAgICAgICAgICAgIG5hbWU9e25hbWUgfHwgdGhpcy5uYW1lfVxuICAgICAgICAgICAgbGFiZWw9e29wdGlvbi5sYWJlbH1cbiAgICAgICAgICAgIHZhbHVlPXtTdHJpbmcob3B0aW9uLnZhbHVlKX1cbiAgICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICAgICAgY2hlY2tlZD17dmFsdWUgPT09IG9wdGlvbi52YWx1ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKG51bGwsIG9wdGlvbi52YWx1ZSl9XG4gICAgICAgICAgICBhcHBlYXJhbmNlPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICBpc0ZpcnN0SXRlbT17aW5kZXggPT09IDB9XG4gICAgICAgICAgICBpc0xhc3RJdGVtPXtpbmRleCA9PT0gb3B0aW9ucy5sZW5ndGggLSAxfVxuICAgICAgICAgIC8+XG4gICAgICAgICkpfVxuICAgICAgPC9Cb3g+XG4gICAgKVxuICB9XG59XG4iXX0=