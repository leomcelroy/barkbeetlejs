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
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Strong } from '../../typography';
import { withTheme } from '../../theme';

var Badge =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Badge, _PureComponent);

  function Badge() {
    _classCallCheck(this, Badge);

    return _possibleConstructorReturn(this, _getPrototypeOf(Badge).apply(this, arguments));
  }

  _createClass(Badge, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          className = _this$props.className,
          propsColor = _this$props.color,
          isInteractive = _this$props.isInteractive,
          isSolid = _this$props.isSolid,
          props = _objectWithoutProperties(_this$props, ["theme", "className", "color", "isInteractive", "isSolid"]);

      var _theme$getBadgeProps = theme.getBadgeProps({
        color: propsColor,
        isSolid: isSolid
      }),
          color = _theme$getBadgeProps.color,
          backgroundColor = _theme$getBadgeProps.backgroundColor;

      var appearance = isInteractive ? 'interactive' : 'default';
      var classNames = cx(className, theme.getBadgeClassName(appearance));
      return React.createElement(Strong, _extends({
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
}(PureComponent);

Badge.displayName = "Badge";

_defineProperty(Badge, "propTypes", _objectSpread({}, Strong.propTypes, {
  /**
   * The color used for the badge.
   */
  color: PropTypes.string.isRequired,

  /**
   * Whether or not to apply hover/focus/active styles
   */
  isInteractive: PropTypes.bool,

  /**
   * Theme provided by ThemeProvider.
   */
  theme: PropTypes.object.isRequired
}));

_defineProperty(Badge, "defaultProps", {
  color: 'neutral',
  isInteractive: false,
  isSolid: false
});

_defineProperty(Badge, "styles", {
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

export default withTheme(Badge);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iYWRnZXMvc3JjL0JhZGdlLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImN4IiwiUHJvcFR5cGVzIiwiU3Ryb25nIiwid2l0aFRoZW1lIiwiQmFkZ2UiLCJwcm9wcyIsInRoZW1lIiwiY2xhc3NOYW1lIiwicHJvcHNDb2xvciIsImNvbG9yIiwiaXNJbnRlcmFjdGl2ZSIsImlzU29saWQiLCJnZXRCYWRnZVByb3BzIiwiYmFja2dyb3VuZENvbG9yIiwiYXBwZWFyYW5jZSIsImNsYXNzTmFtZXMiLCJnZXRCYWRnZUNsYXNzTmFtZSIsInN0eWxlcyIsInByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJib29sIiwib2JqZWN0IiwiZGlzcGxheSIsImJveFNpemluZyIsImhlaWdodCIsInBhZGRpbmdUb3AiLCJwYWRkaW5nUmlnaHQiLCJwYWRkaW5nQm90dG9tIiwicGFkZGluZ0xlZnQiLCJib3JkZXJSYWRpdXMiLCJ0ZXh0QWxpZ24iLCJ0ZXh0RGVjb3JhdGlvbiIsInRleHRUcmFuc2Zvcm0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLGFBQWhCLFFBQXFDLE9BQXJDO0FBQ0EsT0FBT0MsRUFBUCxNQUFlLFlBQWY7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsTUFBVCxRQUF1QixrQkFBdkI7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGFBQTFCOztJQUVNQyxLOzs7Ozs7Ozs7Ozs7OzZCQXdDSztBQUFBLHdCQVFILEtBQUtDLEtBUkY7QUFBQSxVQUVMQyxLQUZLLGVBRUxBLEtBRks7QUFBQSxVQUdMQyxTQUhLLGVBR0xBLFNBSEs7QUFBQSxVQUlFQyxVQUpGLGVBSUxDLEtBSks7QUFBQSxVQUtMQyxhQUxLLGVBS0xBLGFBTEs7QUFBQSxVQU1MQyxPQU5LLGVBTUxBLE9BTks7QUFBQSxVQU9GTixLQVBFOztBQUFBLGlDQVU0QkMsS0FBSyxDQUFDTSxhQUFOLENBQW9CO0FBQ3JESCxRQUFBQSxLQUFLLEVBQUVELFVBRDhDO0FBRXJERyxRQUFBQSxPQUFPLEVBQVBBO0FBRnFELE9BQXBCLENBVjVCO0FBQUEsVUFVQ0YsS0FWRCx3QkFVQ0EsS0FWRDtBQUFBLFVBVVFJLGVBVlIsd0JBVVFBLGVBVlI7O0FBZVAsVUFBTUMsVUFBVSxHQUFHSixhQUFhLEdBQUcsYUFBSCxHQUFtQixTQUFuRDtBQUNBLFVBQU1LLFVBQVUsR0FBR2YsRUFBRSxDQUFDTyxTQUFELEVBQVlELEtBQUssQ0FBQ1UsaUJBQU4sQ0FBd0JGLFVBQXhCLENBQVosQ0FBckI7QUFFQSxhQUNFLG9CQUFDLE1BQUQ7QUFDRSxRQUFBLElBQUksRUFBRTtBQURSLFNBRU1WLEtBQUssQ0FBQ2EsTUFGWjtBQUdFLFFBQUEsS0FBSyxFQUFFUixLQUhUO0FBSUUsUUFBQSxlQUFlLEVBQUVJO0FBSm5CLFNBS01SLEtBTE47QUFNRSxRQUFBLFNBQVMsRUFBRVU7QUFOYixTQURGO0FBVUQ7Ozs7RUFwRWlCaEIsYTs7QUFBZEssSzs7Z0JBQUFBLEssaUNBRUNGLE1BQU0sQ0FBQ2dCLFM7QUFFVjs7O0FBR0FULEVBQUFBLEtBQUssRUFBRVIsU0FBUyxDQUFDa0IsTUFBVixDQUFpQkMsVTs7QUFFeEI7OztBQUdBVixFQUFBQSxhQUFhLEVBQUVULFNBQVMsQ0FBQ29CLEk7O0FBRXpCOzs7QUFHQWYsRUFBQUEsS0FBSyxFQUFFTCxTQUFTLENBQUNxQixNQUFWLENBQWlCRjs7O2dCQWpCdEJoQixLLGtCQW9Ca0I7QUFDcEJLLEVBQUFBLEtBQUssRUFBRSxTQURhO0FBRXBCQyxFQUFBQSxhQUFhLEVBQUUsS0FGSztBQUdwQkMsRUFBQUEsT0FBTyxFQUFFO0FBSFcsQzs7Z0JBcEJsQlAsSyxZQTBCWTtBQUNkbUIsRUFBQUEsT0FBTyxFQUFFLGNBREs7QUFFZEMsRUFBQUEsU0FBUyxFQUFFLFlBRkc7QUFHZEMsRUFBQUEsTUFBTSxFQUFFLEVBSE07QUFJZEMsRUFBQUEsVUFBVSxFQUFFLENBSkU7QUFLZEMsRUFBQUEsWUFBWSxFQUFFLENBTEE7QUFNZEMsRUFBQUEsYUFBYSxFQUFFLENBTkQ7QUFPZEMsRUFBQUEsV0FBVyxFQUFFLENBUEM7QUFRZEMsRUFBQUEsWUFBWSxFQUFFLENBUkE7QUFTZEMsRUFBQUEsU0FBUyxFQUFFLFFBVEc7QUFVZEMsRUFBQUEsY0FBYyxFQUFFLE1BVkY7QUFXZEMsRUFBQUEsYUFBYSxFQUFFO0FBWEQsQzs7QUE2Q2xCLGVBQWU5QixTQUFTLENBQUNDLEtBQUQsQ0FBeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgeyBTdHJvbmcgfSBmcm9tICcuLi8uLi90eXBvZ3JhcGh5J1xuaW1wb3J0IHsgd2l0aFRoZW1lIH0gZnJvbSAnLi4vLi4vdGhlbWUnXG5cbmNsYXNzIEJhZGdlIGV4dGVuZHMgUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLi4uU3Ryb25nLnByb3BUeXBlcyxcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb2xvciB1c2VkIGZvciB0aGUgYmFkZ2UuXG4gICAgICovXG4gICAgY29sb3I6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgb3Igbm90IHRvIGFwcGx5IGhvdmVyL2ZvY3VzL2FjdGl2ZSBzdHlsZXNcbiAgICAgKi9cbiAgICBpc0ludGVyYWN0aXZlOiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIC8qKlxuICAgICAqIFRoZW1lIHByb3ZpZGVkIGJ5IFRoZW1lUHJvdmlkZXIuXG4gICAgICovXG4gICAgdGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBjb2xvcjogJ25ldXRyYWwnLFxuICAgIGlzSW50ZXJhY3RpdmU6IGZhbHNlLFxuICAgIGlzU29saWQ6IGZhbHNlXG4gIH1cblxuICBzdGF0aWMgc3R5bGVzID0ge1xuICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgIGhlaWdodDogMTYsXG4gICAgcGFkZGluZ1RvcDogMCxcbiAgICBwYWRkaW5nUmlnaHQ6IDYsXG4gICAgcGFkZGluZ0JvdHRvbTogMCxcbiAgICBwYWRkaW5nTGVmdDogNixcbiAgICBib3JkZXJSYWRpdXM6IDIsXG4gICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICAgIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdGhlbWUsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBjb2xvcjogcHJvcHNDb2xvcixcbiAgICAgIGlzSW50ZXJhY3RpdmUsXG4gICAgICBpc1NvbGlkLFxuICAgICAgLi4ucHJvcHNcbiAgICB9ID0gdGhpcy5wcm9wc1xuXG4gICAgY29uc3QgeyBjb2xvciwgYmFja2dyb3VuZENvbG9yIH0gPSB0aGVtZS5nZXRCYWRnZVByb3BzKHtcbiAgICAgIGNvbG9yOiBwcm9wc0NvbG9yLFxuICAgICAgaXNTb2xpZFxuICAgIH0pXG5cbiAgICBjb25zdCBhcHBlYXJhbmNlID0gaXNJbnRlcmFjdGl2ZSA/ICdpbnRlcmFjdGl2ZScgOiAnZGVmYXVsdCdcbiAgICBjb25zdCBjbGFzc05hbWVzID0gY3goY2xhc3NOYW1lLCB0aGVtZS5nZXRCYWRnZUNsYXNzTmFtZShhcHBlYXJhbmNlKSlcblxuICAgIHJldHVybiAoXG4gICAgICA8U3Ryb25nXG4gICAgICAgIHNpemU9ezMwMH1cbiAgICAgICAgey4uLkJhZGdlLnN0eWxlc31cbiAgICAgICAgY29sb3I9e2NvbG9yfVxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I9e2JhY2tncm91bmRDb2xvcn1cbiAgICAgICAgey4uLnByb3BzfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXN9XG4gICAgICAvPlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoVGhlbWUoQmFkZ2UpXG4iXX0=