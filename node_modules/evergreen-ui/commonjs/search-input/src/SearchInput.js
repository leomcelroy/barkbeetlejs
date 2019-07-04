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

var _uiBox = _interopRequireWildcard(require("ui-box"));

var _icon = require("../../icon");

var _textInput = require("../../text-input");

var _theme = require("../../theme");

var _constants = require("../../constants");

var SearchInput =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(SearchInput, _PureComponent);

  function SearchInput() {
    (0, _classCallCheck2.default)(this, SearchInput);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SearchInput).apply(this, arguments));
  }

  (0, _createClass2.default)(SearchInput, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          appearance = _this$props.appearance,
          disabled = _this$props.disabled,
          height = _this$props.height,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["theme", "appearance", "disabled", "height"]);

      var _splitBoxProps = (0, _uiBox.splitBoxProps)(props),
          matchedProps = _splitBoxProps.matchedProps,
          remainingProps = _splitBoxProps.remainingProps;

      var width = matchedProps.width;
      var iconSize = theme.getIconSizeForInput(height);
      return _react.default.createElement(_uiBox.default, (0, _extends2.default)({
        position: "relative",
        display: "inline-flex",
        height: height
      }, matchedProps), _react.default.createElement(_uiBox.default, {
        height: height,
        width: height,
        pointerEvents: "none",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }, _react.default.createElement(_icon.Icon, {
        icon: "search",
        color: "default",
        zIndex: _constants.StackingOrder.FOCUSED + 1,
        size: iconSize
      })), _react.default.createElement(_textInput.TextInput, (0, _extends2.default)({
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
}(_react.PureComponent);

SearchInput.displayName = "SearchInput";
(0, _defineProperty2.default)(SearchInput, "propTypes", (0, _objectSpread2.default)({}, _textInput.TextInput.propTypes));
(0, _defineProperty2.default)(SearchInput, "defaultProps", {
  height: 32,
  appearance: 'default'
});

var _default = (0, _theme.withTheme)(SearchInput);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZWFyY2gtaW5wdXQvc3JjL1NlYXJjaElucHV0LmpzIl0sIm5hbWVzIjpbIlNlYXJjaElucHV0IiwicHJvcHMiLCJ0aGVtZSIsImFwcGVhcmFuY2UiLCJkaXNhYmxlZCIsImhlaWdodCIsIm1hdGNoZWRQcm9wcyIsInJlbWFpbmluZ1Byb3BzIiwid2lkdGgiLCJpY29uU2l6ZSIsImdldEljb25TaXplRm9ySW5wdXQiLCJTdGFja2luZ09yZGVyIiwiRk9DVVNFRCIsIlB1cmVDb21wb25lbnQiLCJUZXh0SW5wdXQiLCJwcm9wVHlwZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0lBRU1BLFc7Ozs7Ozs7Ozs7Ozs2QkFhSztBQUFBLHdCQUNtRCxLQUFLQyxLQUR4RDtBQUFBLFVBQ0NDLEtBREQsZUFDQ0EsS0FERDtBQUFBLFVBQ1FDLFVBRFIsZUFDUUEsVUFEUjtBQUFBLFVBQ29CQyxRQURwQixlQUNvQkEsUUFEcEI7QUFBQSxVQUM4QkMsTUFEOUIsZUFDOEJBLE1BRDlCO0FBQUEsVUFDeUNKLEtBRHpDOztBQUFBLDJCQUVrQywwQkFBY0EsS0FBZCxDQUZsQztBQUFBLFVBRUNLLFlBRkQsa0JBRUNBLFlBRkQ7QUFBQSxVQUVlQyxjQUZmLGtCQUVlQSxjQUZmOztBQUFBLFVBR0NDLEtBSEQsR0FHV0YsWUFIWCxDQUdDRSxLQUhEO0FBSVAsVUFBTUMsUUFBUSxHQUFHUCxLQUFLLENBQUNRLG1CQUFOLENBQTBCTCxNQUExQixDQUFqQjtBQUVBLGFBQ0UsNkJBQUMsY0FBRDtBQUNFLFFBQUEsUUFBUSxFQUFDLFVBRFg7QUFFRSxRQUFBLE9BQU8sRUFBQyxhQUZWO0FBR0UsUUFBQSxNQUFNLEVBQUVBO0FBSFYsU0FJTUMsWUFKTixHQU1FLDZCQUFDLGNBQUQ7QUFDRSxRQUFBLE1BQU0sRUFBRUQsTUFEVjtBQUVFLFFBQUEsS0FBSyxFQUFFQSxNQUZUO0FBR0UsUUFBQSxhQUFhLEVBQUMsTUFIaEI7QUFJRSxRQUFBLFFBQVEsRUFBQyxVQUpYO0FBS0UsUUFBQSxPQUFPLEVBQUMsTUFMVjtBQU1FLFFBQUEsY0FBYyxFQUFDLFFBTmpCO0FBT0UsUUFBQSxVQUFVLEVBQUM7QUFQYixTQVNFLDZCQUFDLFVBQUQ7QUFDRSxRQUFBLElBQUksRUFBQyxRQURQO0FBRUUsUUFBQSxLQUFLLEVBQUMsU0FGUjtBQUdFLFFBQUEsTUFBTSxFQUFFTSx5QkFBY0MsT0FBZCxHQUF3QixDQUhsQztBQUlFLFFBQUEsSUFBSSxFQUFFSDtBQUpSLFFBVEYsQ0FORixFQXNCRSw2QkFBQyxvQkFBRDtBQUNFLFFBQUEsTUFBTSxFQUFFSixNQURWO0FBRUUsUUFBQSxXQUFXLEVBQUVBLE1BRmY7QUFHRSxRQUFBLFVBQVUsRUFBRUYsVUFIZDtBQUlFLFFBQUEsUUFBUSxFQUFFQyxRQUpaO0FBS0UsUUFBQSxLQUFLLEVBQUVJLEtBTFQ7QUFNRSxRQUFBLElBQUksRUFBQztBQU5QLFNBT01ELGNBUE4sRUF0QkYsQ0FERjtBQWtDRDs7O0VBckR1Qk0sb0I7O0FBQXBCYixXOzhCQUFBQSxXLCtDQUtDYyxxQkFBVUMsUzs4QkFMWGYsVyxrQkFRa0I7QUFDcEJLLEVBQUFBLE1BQU0sRUFBRSxFQURZO0FBRXBCRixFQUFBQSxVQUFVLEVBQUU7QUFGUSxDOztlQWdEVCxzQkFBVUgsV0FBVixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBCb3gsIHsgc3BsaXRCb3hQcm9wcyB9IGZyb20gJ3VpLWJveCdcbmltcG9ydCB7IEljb24gfSBmcm9tICcuLi8uLi9pY29uJ1xuaW1wb3J0IHsgVGV4dElucHV0IH0gZnJvbSAnLi4vLi4vdGV4dC1pbnB1dCdcbmltcG9ydCB7IHdpdGhUaGVtZSB9IGZyb20gJy4uLy4uL3RoZW1lJ1xuaW1wb3J0IHsgU3RhY2tpbmdPcmRlciB9IGZyb20gJy4uLy4uL2NvbnN0YW50cydcblxuY2xhc3MgU2VhcmNoSW5wdXQgZXh0ZW5kcyBQdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAvKipcbiAgICAgKiBDb21wb3NlcyB0aGUgVGV4dElucHV0IGNvbXBvbmVudCBhcyB0aGUgYmFzZS5cbiAgICAgKi9cbiAgICAuLi5UZXh0SW5wdXQucHJvcFR5cGVzXG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGhlaWdodDogMzIsXG4gICAgYXBwZWFyYW5jZTogJ2RlZmF1bHQnXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB0aGVtZSwgYXBwZWFyYW5jZSwgZGlzYWJsZWQsIGhlaWdodCwgLi4ucHJvcHMgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB7IG1hdGNoZWRQcm9wcywgcmVtYWluaW5nUHJvcHMgfSA9IHNwbGl0Qm94UHJvcHMocHJvcHMpXG4gICAgY29uc3QgeyB3aWR0aCB9ID0gbWF0Y2hlZFByb3BzXG4gICAgY29uc3QgaWNvblNpemUgPSB0aGVtZS5nZXRJY29uU2l6ZUZvcklucHV0KGhlaWdodClcblxuICAgIHJldHVybiAoXG4gICAgICA8Qm94XG4gICAgICAgIHBvc2l0aW9uPVwicmVsYXRpdmVcIlxuICAgICAgICBkaXNwbGF5PVwiaW5saW5lLWZsZXhcIlxuICAgICAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICAgICAgey4uLm1hdGNoZWRQcm9wc31cbiAgICAgID5cbiAgICAgICAgPEJveFxuICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICAgIHdpZHRoPXtoZWlnaHR9XG4gICAgICAgICAgcG9pbnRlckV2ZW50cz1cIm5vbmVcIlxuICAgICAgICAgIHBvc2l0aW9uPVwiYWJzb2x1dGVcIlxuICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXG4gICAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICAgID5cbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgaWNvbj1cInNlYXJjaFwiXG4gICAgICAgICAgICBjb2xvcj1cImRlZmF1bHRcIlxuICAgICAgICAgICAgekluZGV4PXtTdGFja2luZ09yZGVyLkZPQ1VTRUQgKyAxfVxuICAgICAgICAgICAgc2l6ZT17aWNvblNpemV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Cb3g+XG4gICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICAgICAgICBwYWRkaW5nTGVmdD17aGVpZ2h0fVxuICAgICAgICAgIGFwcGVhcmFuY2U9e2FwcGVhcmFuY2V9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIHdpZHRoPXt3aWR0aH1cbiAgICAgICAgICB0eXBlPVwic2VhcmNoXCJcbiAgICAgICAgICB7Li4ucmVtYWluaW5nUHJvcHN9XG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFRoZW1lKFNlYXJjaElucHV0KVxuIl19