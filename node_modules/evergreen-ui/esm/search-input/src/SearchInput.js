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
import Box, { splitBoxProps } from 'ui-box';
import { Icon } from '../../icon';
import { TextInput } from '../../text-input';
import { withTheme } from '../../theme';
import { StackingOrder } from '../../constants';

var SearchInput =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(SearchInput, _PureComponent);

  function SearchInput() {
    _classCallCheck(this, SearchInput);

    return _possibleConstructorReturn(this, _getPrototypeOf(SearchInput).apply(this, arguments));
  }

  _createClass(SearchInput, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          appearance = _this$props.appearance,
          disabled = _this$props.disabled,
          height = _this$props.height,
          props = _objectWithoutProperties(_this$props, ["theme", "appearance", "disabled", "height"]);

      var _splitBoxProps = splitBoxProps(props),
          matchedProps = _splitBoxProps.matchedProps,
          remainingProps = _splitBoxProps.remainingProps;

      var width = matchedProps.width;
      var iconSize = theme.getIconSizeForInput(height);
      return React.createElement(Box, _extends({
        position: "relative",
        display: "inline-flex",
        height: height
      }, matchedProps), React.createElement(Box, {
        height: height,
        width: height,
        pointerEvents: "none",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }, React.createElement(Icon, {
        icon: "search",
        color: "default",
        zIndex: StackingOrder.FOCUSED + 1,
        size: iconSize
      })), React.createElement(TextInput, _extends({
        height: height,
        paddingLeft: height,
        appearance: appearance,
        disabled: disabled,
        width: width,
        type: "search"
      }, remainingProps)));
    }
  }]);

  return SearchInput;
}(PureComponent);

SearchInput.displayName = "SearchInput";

_defineProperty(SearchInput, "propTypes", _objectSpread({}, TextInput.propTypes));

_defineProperty(SearchInput, "defaultProps", {
  height: 32,
  appearance: 'default'
});

export default withTheme(SearchInput);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZWFyY2gtaW5wdXQvc3JjL1NlYXJjaElucHV0LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsIkJveCIsInNwbGl0Qm94UHJvcHMiLCJJY29uIiwiVGV4dElucHV0Iiwid2l0aFRoZW1lIiwiU3RhY2tpbmdPcmRlciIsIlNlYXJjaElucHV0IiwicHJvcHMiLCJ0aGVtZSIsImFwcGVhcmFuY2UiLCJkaXNhYmxlZCIsImhlaWdodCIsIm1hdGNoZWRQcm9wcyIsInJlbWFpbmluZ1Byb3BzIiwid2lkdGgiLCJpY29uU2l6ZSIsImdldEljb25TaXplRm9ySW5wdXQiLCJGT0NVU0VEIiwicHJvcFR5cGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLElBQWdCQyxhQUFoQixRQUFxQyxPQUFyQztBQUNBLE9BQU9DLEdBQVAsSUFBY0MsYUFBZCxRQUFtQyxRQUFuQztBQUNBLFNBQVNDLElBQVQsUUFBcUIsWUFBckI7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGtCQUExQjtBQUNBLFNBQVNDLFNBQVQsUUFBMEIsYUFBMUI7QUFDQSxTQUFTQyxhQUFULFFBQThCLGlCQUE5Qjs7SUFFTUMsVzs7Ozs7Ozs7Ozs7Ozs2QkFhSztBQUFBLHdCQUNtRCxLQUFLQyxLQUR4RDtBQUFBLFVBQ0NDLEtBREQsZUFDQ0EsS0FERDtBQUFBLFVBQ1FDLFVBRFIsZUFDUUEsVUFEUjtBQUFBLFVBQ29CQyxRQURwQixlQUNvQkEsUUFEcEI7QUFBQSxVQUM4QkMsTUFEOUIsZUFDOEJBLE1BRDlCO0FBQUEsVUFDeUNKLEtBRHpDOztBQUFBLDJCQUVrQ04sYUFBYSxDQUFDTSxLQUFELENBRi9DO0FBQUEsVUFFQ0ssWUFGRCxrQkFFQ0EsWUFGRDtBQUFBLFVBRWVDLGNBRmYsa0JBRWVBLGNBRmY7O0FBQUEsVUFHQ0MsS0FIRCxHQUdXRixZQUhYLENBR0NFLEtBSEQ7QUFJUCxVQUFNQyxRQUFRLEdBQUdQLEtBQUssQ0FBQ1EsbUJBQU4sQ0FBMEJMLE1BQTFCLENBQWpCO0FBRUEsYUFDRSxvQkFBQyxHQUFEO0FBQ0UsUUFBQSxRQUFRLEVBQUMsVUFEWDtBQUVFLFFBQUEsT0FBTyxFQUFDLGFBRlY7QUFHRSxRQUFBLE1BQU0sRUFBRUE7QUFIVixTQUlNQyxZQUpOLEdBTUUsb0JBQUMsR0FBRDtBQUNFLFFBQUEsTUFBTSxFQUFFRCxNQURWO0FBRUUsUUFBQSxLQUFLLEVBQUVBLE1BRlQ7QUFHRSxRQUFBLGFBQWEsRUFBQyxNQUhoQjtBQUlFLFFBQUEsUUFBUSxFQUFDLFVBSlg7QUFLRSxRQUFBLE9BQU8sRUFBQyxNQUxWO0FBTUUsUUFBQSxjQUFjLEVBQUMsUUFOakI7QUFPRSxRQUFBLFVBQVUsRUFBQztBQVBiLFNBU0Usb0JBQUMsSUFBRDtBQUNFLFFBQUEsSUFBSSxFQUFDLFFBRFA7QUFFRSxRQUFBLEtBQUssRUFBQyxTQUZSO0FBR0UsUUFBQSxNQUFNLEVBQUVOLGFBQWEsQ0FBQ1ksT0FBZCxHQUF3QixDQUhsQztBQUlFLFFBQUEsSUFBSSxFQUFFRjtBQUpSLFFBVEYsQ0FORixFQXNCRSxvQkFBQyxTQUFEO0FBQ0UsUUFBQSxNQUFNLEVBQUVKLE1BRFY7QUFFRSxRQUFBLFdBQVcsRUFBRUEsTUFGZjtBQUdFLFFBQUEsVUFBVSxFQUFFRixVQUhkO0FBSUUsUUFBQSxRQUFRLEVBQUVDLFFBSlo7QUFLRSxRQUFBLEtBQUssRUFBRUksS0FMVDtBQU1FLFFBQUEsSUFBSSxFQUFDO0FBTlAsU0FPTUQsY0FQTixFQXRCRixDQURGO0FBa0NEOzs7O0VBckR1QmQsYTs7QUFBcEJPLFc7O2dCQUFBQSxXLGlDQUtDSCxTQUFTLENBQUNlLFM7O2dCQUxYWixXLGtCQVFrQjtBQUNwQkssRUFBQUEsTUFBTSxFQUFFLEVBRFk7QUFFcEJGLEVBQUFBLFVBQVUsRUFBRTtBQUZRLEM7O0FBZ0R4QixlQUFlTCxTQUFTLENBQUNFLFdBQUQsQ0FBeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEJveCwgeyBzcGxpdEJveFByb3BzIH0gZnJvbSAndWktYm94J1xuaW1wb3J0IHsgSWNvbiB9IGZyb20gJy4uLy4uL2ljb24nXG5pbXBvcnQgeyBUZXh0SW5wdXQgfSBmcm9tICcuLi8uLi90ZXh0LWlucHV0J1xuaW1wb3J0IHsgd2l0aFRoZW1lIH0gZnJvbSAnLi4vLi4vdGhlbWUnXG5pbXBvcnQgeyBTdGFja2luZ09yZGVyIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJ1xuXG5jbGFzcyBTZWFyY2hJbnB1dCBleHRlbmRzIFB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIC8qKlxuICAgICAqIENvbXBvc2VzIHRoZSBUZXh0SW5wdXQgY29tcG9uZW50IGFzIHRoZSBiYXNlLlxuICAgICAqL1xuICAgIC4uLlRleHRJbnB1dC5wcm9wVHlwZXNcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaGVpZ2h0OiAzMixcbiAgICBhcHBlYXJhbmNlOiAnZGVmYXVsdCdcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHRoZW1lLCBhcHBlYXJhbmNlLCBkaXNhYmxlZCwgaGVpZ2h0LCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHsgbWF0Y2hlZFByb3BzLCByZW1haW5pbmdQcm9wcyB9ID0gc3BsaXRCb3hQcm9wcyhwcm9wcylcbiAgICBjb25zdCB7IHdpZHRoIH0gPSBtYXRjaGVkUHJvcHNcbiAgICBjb25zdCBpY29uU2l6ZSA9IHRoZW1lLmdldEljb25TaXplRm9ySW5wdXQoaGVpZ2h0KVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxCb3hcbiAgICAgICAgcG9zaXRpb249XCJyZWxhdGl2ZVwiXG4gICAgICAgIGRpc3BsYXk9XCJpbmxpbmUtZmxleFwiXG4gICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICB7Li4ubWF0Y2hlZFByb3BzfVxuICAgICAgPlxuICAgICAgICA8Qm94XG4gICAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgICAgd2lkdGg9e2hlaWdodH1cbiAgICAgICAgICBwb2ludGVyRXZlbnRzPVwibm9uZVwiXG4gICAgICAgICAgcG9zaXRpb249XCJhYnNvbHV0ZVwiXG4gICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCJcbiAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICBpY29uPVwic2VhcmNoXCJcbiAgICAgICAgICAgIGNvbG9yPVwiZGVmYXVsdFwiXG4gICAgICAgICAgICB6SW5kZXg9e1N0YWNraW5nT3JkZXIuRk9DVVNFRCArIDF9XG4gICAgICAgICAgICBzaXplPXtpY29uU2l6ZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0JveD5cbiAgICAgICAgPFRleHRJbnB1dFxuICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICAgIHBhZGRpbmdMZWZ0PXtoZWlnaHR9XG4gICAgICAgICAgYXBwZWFyYW5jZT17YXBwZWFyYW5jZX1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgIHR5cGU9XCJzZWFyY2hcIlxuICAgICAgICAgIHsuLi5yZW1haW5pbmdQcm9wc31cbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoVGhlbWUoU2VhcmNoSW5wdXQpXG4iXX0=