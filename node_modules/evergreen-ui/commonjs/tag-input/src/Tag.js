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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _badges = require("../../badges");

var _icon = require("../../icon");

var _scales = require("../../scales");

/**
 * @overview TagInput accepts multiple values that can be individually removed
 */
var Tag =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(Tag, _React$PureComponent);

  function Tag() {
    (0, _classCallCheck2.default)(this, Tag);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Tag).apply(this, arguments));
  }

  (0, _createClass2.default)(Tag, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          onRemove = _this$props.onRemove,
          isRemovable = _this$props.isRemovable,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["children", "onRemove", "isRemovable"]);
      var badgeStyles = {
        alignItems: 'center',
        display: 'inline-flex',
        fontWeight: 400,
        textTransform: 'none'
      };

      if (isRemovable) {
        badgeStyles.paddingRight = (0, _scales.minorScale)(1);
      }

      return _react.default.createElement(_badges.Badge, (0, _extends2.default)({
        isInteractive: true
      }, badgeStyles, props), children, isRemovable && _react.default.createElement(_icon.Icon, {
        icon: "cross",
        marginLeft: (0, _scales.minorScale)(1),
        onClick: onRemove,
        size: (0, _scales.minorScale)(3)
      }));
    }
  }]);
  return Tag;
}(_react.default.PureComponent);

Tag.displayName = "Tag";
(0, _defineProperty2.default)(Tag, "propTypes", {
  /** The badge content */
  children: _propTypes.default.node,

  /**
   * Callback invoked when the removal icon is clicked.
   * (event) => void
   */
  onRemove: _propTypes.default.func,

  /** Whether or not the tag can be removed. */
  isRemovable: _propTypes.default.bool
});
var _default = Tag;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90YWctaW5wdXQvc3JjL1RhZy5qcyJdLCJuYW1lcyI6WyJUYWciLCJwcm9wcyIsImNoaWxkcmVuIiwib25SZW1vdmUiLCJpc1JlbW92YWJsZSIsImJhZGdlU3R5bGVzIiwiYWxpZ25JdGVtcyIsImRpc3BsYXkiLCJmb250V2VpZ2h0IiwidGV4dFRyYW5zZm9ybSIsInBhZGRpbmdSaWdodCIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsIlByb3BUeXBlcyIsIm5vZGUiLCJmdW5jIiwiYm9vbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQVJBOzs7SUFVTUEsRzs7Ozs7Ozs7Ozs7OzZCQWFLO0FBQUEsd0JBQytDLEtBQUtDLEtBRHBEO0FBQUEsVUFDQ0MsUUFERCxlQUNDQSxRQUREO0FBQUEsVUFDV0MsUUFEWCxlQUNXQSxRQURYO0FBQUEsVUFDcUJDLFdBRHJCLGVBQ3FCQSxXQURyQjtBQUFBLFVBQ3FDSCxLQURyQztBQUdQLFVBQU1JLFdBQVcsR0FBRztBQUNsQkMsUUFBQUEsVUFBVSxFQUFFLFFBRE07QUFFbEJDLFFBQUFBLE9BQU8sRUFBRSxhQUZTO0FBR2xCQyxRQUFBQSxVQUFVLEVBQUUsR0FITTtBQUlsQkMsUUFBQUEsYUFBYSxFQUFFO0FBSkcsT0FBcEI7O0FBT0EsVUFBSUwsV0FBSixFQUFpQjtBQUNmQyxRQUFBQSxXQUFXLENBQUNLLFlBQVosR0FBMkIsd0JBQVcsQ0FBWCxDQUEzQjtBQUNEOztBQUVELGFBQ0UsNkJBQUMsYUFBRDtBQUFPLFFBQUEsYUFBYTtBQUFwQixTQUF5QkwsV0FBekIsRUFBMENKLEtBQTFDLEdBQ0dDLFFBREgsRUFFR0UsV0FBVyxJQUNWLDZCQUFDLFVBQUQ7QUFDRSxRQUFBLElBQUksRUFBQyxPQURQO0FBRUUsUUFBQSxVQUFVLEVBQUUsd0JBQVcsQ0FBWCxDQUZkO0FBR0UsUUFBQSxPQUFPLEVBQUVELFFBSFg7QUFJRSxRQUFBLElBQUksRUFBRSx3QkFBVyxDQUFYO0FBSlIsUUFISixDQURGO0FBYUQ7OztFQXhDZVEsZUFBTUMsYTs7QUFBbEJaLEc7OEJBQUFBLEcsZUFDZTtBQUNqQjtBQUNBRSxFQUFBQSxRQUFRLEVBQUVXLG1CQUFVQyxJQUZIOztBQUdqQjs7OztBQUlBWCxFQUFBQSxRQUFRLEVBQUVVLG1CQUFVRSxJQVBIOztBQVFqQjtBQUNBWCxFQUFBQSxXQUFXLEVBQUVTLG1CQUFVRztBQVROLEM7ZUEwQ05oQixHIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAb3ZlcnZpZXcgVGFnSW5wdXQgYWNjZXB0cyBtdWx0aXBsZSB2YWx1ZXMgdGhhdCBjYW4gYmUgaW5kaXZpZHVhbGx5IHJlbW92ZWRcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgeyBCYWRnZSB9IGZyb20gJy4uLy4uL2JhZGdlcydcbmltcG9ydCB7IEljb24gfSBmcm9tICcuLi8uLi9pY29uJ1xuaW1wb3J0IHsgbWlub3JTY2FsZSB9IGZyb20gJy4uLy4uL3NjYWxlcydcblxuY2xhc3MgVGFnIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLyoqIFRoZSBiYWRnZSBjb250ZW50ICovXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGludm9rZWQgd2hlbiB0aGUgcmVtb3ZhbCBpY29uIGlzIGNsaWNrZWQuXG4gICAgICogKGV2ZW50KSA9PiB2b2lkXG4gICAgICovXG4gICAgb25SZW1vdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGUgdGFnIGNhbiBiZSByZW1vdmVkLiAqL1xuICAgIGlzUmVtb3ZhYmxlOiBQcm9wVHlwZXMuYm9vbFxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIG9uUmVtb3ZlLCBpc1JlbW92YWJsZSwgLi4ucHJvcHMgfSA9IHRoaXMucHJvcHNcblxuICAgIGNvbnN0IGJhZGdlU3R5bGVzID0ge1xuICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxuICAgICAgZm9udFdlaWdodDogNDAwLFxuICAgICAgdGV4dFRyYW5zZm9ybTogJ25vbmUnXG4gICAgfVxuXG4gICAgaWYgKGlzUmVtb3ZhYmxlKSB7XG4gICAgICBiYWRnZVN0eWxlcy5wYWRkaW5nUmlnaHQgPSBtaW5vclNjYWxlKDEpXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxCYWRnZSBpc0ludGVyYWN0aXZlIHsuLi5iYWRnZVN0eWxlc30gey4uLnByb3BzfT5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgICB7aXNSZW1vdmFibGUgJiYgKFxuICAgICAgICAgIDxJY29uXG4gICAgICAgICAgICBpY29uPVwiY3Jvc3NcIlxuICAgICAgICAgICAgbWFyZ2luTGVmdD17bWlub3JTY2FsZSgxKX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uUmVtb3ZlfVxuICAgICAgICAgICAgc2l6ZT17bWlub3JTY2FsZSgzKX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9CYWRnZT5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFnXG4iXX0=