import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from '../../layers';
import { Text } from '../../typography';
import { Icon } from '../../icon';
import { withTheme } from '../../theme';
import safeInvoke from '../../lib/safe-invoke';
import warning from '../../lib/warning';

var MenuItem =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(MenuItem, _React$PureComponent);

  function MenuItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MenuItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MenuItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
      _this.props.onSelect(event);
      /* eslint-disable react/prop-types */


      safeInvoke(_this.props.onClick, event);
      /* eslint-enable react/prop-types */
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyPress", function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        _this.props.onSelect(event);

        event.preventDefault();
      }
      /* eslint-disable react/prop-types */


      safeInvoke(_this.props.onKeyPress, event);
      /* eslint-enable react/prop-types */
    });

    return _this;
  }

  _createClass(MenuItem, [{
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
          passthroughProps = _objectWithoutProperties(_this$props, ["is", "children", "theme", "appearance", "secondaryText", "intent", "icon"]);

      if (process.env.NODE_ENV !== 'production') {
        warning('onClick' in this.props, '<Menu.Item> expects `onSelect` prop, but you passed `onClick`.');
      }

      var themedClassName = theme.getMenuItemClassName(appearance, 'none');
      return React.createElement(Pane, _extends({
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
      }, passthroughProps), icon && React.createElement(Icon, {
        color: intent === 'none' ? 'default' : intent,
        icon: icon,
        marginLeft: 16,
        marginRight: -4,
        size: 16,
        flexShrink: 0
      }), React.createElement(Text, {
        color: intent,
        marginLeft: 16,
        marginRight: 16,
        flex: 1
      }, children), secondaryText && React.createElement(Text, {
        marginRight: 16,
        color: "muted"
      }, secondaryText));
    }
  }]);

  return MenuItem;
}(React.PureComponent);

MenuItem.displayName = "MenuItem";

_defineProperty(MenuItem, "propTypes", {
  /**
   * Element type to use for the menu item.
   * For example: `<MenuItem is={ReactRouterLink}>...</MenuItem>`
   */
  is: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,

  /**
   * Function that is called on click and enter/space keypress.
   */
  onSelect: PropTypes.func,

  /**
   * The icon before the label.
   */
  icon: PropTypes.node,

  /**
   * The children of the component.
   */
  children: PropTypes.node,

  /**
   * Secondary text shown on the right.
   */
  secondaryText: PropTypes.node,

  /**
   * The default theme only supports one default appearance.
   */
  appearance: PropTypes.string.isRequired,

  /**
   * The intent of the menu item.
   */
  intent: PropTypes.oneOf(['none', 'success', 'warning', 'danger']).isRequired,

  /**
   * Theme provided by ThemeProvider.
   */
  theme: PropTypes.object.isRequired
});

_defineProperty(MenuItem, "defaultProps", {
  is: 'div',
  intent: 'none',
  appearance: 'default',
  onSelect: function onSelect() {}
});

export default withTheme(MenuItem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tZW51L3NyYy9NZW51SXRlbS5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlBhbmUiLCJUZXh0IiwiSWNvbiIsIndpdGhUaGVtZSIsInNhZmVJbnZva2UiLCJ3YXJuaW5nIiwiTWVudUl0ZW0iLCJldmVudCIsInByb3BzIiwib25TZWxlY3QiLCJvbkNsaWNrIiwia2V5IiwicHJldmVudERlZmF1bHQiLCJvbktleVByZXNzIiwiaXMiLCJjaGlsZHJlbiIsInRoZW1lIiwiYXBwZWFyYW5jZSIsInNlY29uZGFyeVRleHQiLCJpbnRlbnQiLCJpY29uIiwicGFzc3Rocm91Z2hQcm9wcyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInRoZW1lZENsYXNzTmFtZSIsImdldE1lbnVJdGVtQ2xhc3NOYW1lIiwiaGFuZGxlQ2xpY2siLCJoYW5kbGVLZXlQcmVzcyIsIlB1cmVDb21wb25lbnQiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJmdW5jIiwiaXNSZXF1aXJlZCIsIm5vZGUiLCJvbmVPZiIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxJQUFULFFBQXFCLGNBQXJCO0FBQ0EsU0FBU0MsSUFBVCxRQUFxQixrQkFBckI7QUFDQSxTQUFTQyxJQUFULFFBQXFCLFlBQXJCO0FBQ0EsU0FBU0MsU0FBVCxRQUEwQixhQUExQjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsdUJBQXZCO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQixtQkFBcEI7O0lBRU1DLFE7Ozs7Ozs7Ozs7Ozs7Ozs7OztrRUFvRFUsVUFBQUMsS0FBSyxFQUFJO0FBQ3JCLFlBQUtDLEtBQUwsQ0FBV0MsUUFBWCxDQUFvQkYsS0FBcEI7QUFFQTs7O0FBQ0FILE1BQUFBLFVBQVUsQ0FBQyxNQUFLSSxLQUFMLENBQVdFLE9BQVosRUFBcUJILEtBQXJC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QUFFaEIsU0FBUyxDQUFDbUMsSUFwQkg7O0FBc0JqQjs7O0FBR0FoQixFQUFBQSxhQUFhLEVBQUVuQixTQUFTLENBQUNtQyxJQXpCUjs7QUEyQmpCOzs7QUFHQWpCLEVBQUFBLFVBQVUsRUFBRWxCLFNBQVMsQ0FBQ2dDLE1BQVYsQ0FBaUJFLFVBOUJaOztBQWdDakI7OztBQUdBZCxFQUFBQSxNQUFNLEVBQUVwQixTQUFTLENBQUNvQyxLQUFWLENBQWdCLENBQUMsTUFBRCxFQUFTLFNBQVQsRUFBb0IsU0FBcEIsRUFBK0IsUUFBL0IsQ0FBaEIsRUFDTEYsVUFwQ2M7O0FBc0NqQjs7O0FBR0FqQixFQUFBQSxLQUFLLEVBQUVqQixTQUFTLENBQUNxQyxNQUFWLENBQWlCSDtBQXpDUCxDOztnQkFEZjNCLFEsa0JBNkNrQjtBQUNwQlEsRUFBQUEsRUFBRSxFQUFFLEtBRGdCO0FBRXBCSyxFQUFBQSxNQUFNLEVBQUUsTUFGWTtBQUdwQkYsRUFBQUEsVUFBVSxFQUFFLFNBSFE7QUFJcEJSLEVBQUFBLFFBQVEsRUFBRSxvQkFBTSxDQUFFO0FBSkUsQzs7QUFvRnhCLGVBQWVOLFNBQVMsQ0FBQ0csUUFBRCxDQUF4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCB7IFBhbmUgfSBmcm9tICcuLi8uLi9sYXllcnMnXG5pbXBvcnQgeyBUZXh0IH0gZnJvbSAnLi4vLi4vdHlwb2dyYXBoeSdcbmltcG9ydCB7IEljb24gfSBmcm9tICcuLi8uLi9pY29uJ1xuaW1wb3J0IHsgd2l0aFRoZW1lIH0gZnJvbSAnLi4vLi4vdGhlbWUnXG5pbXBvcnQgc2FmZUludm9rZSBmcm9tICcuLi8uLi9saWIvc2FmZS1pbnZva2UnXG5pbXBvcnQgd2FybmluZyBmcm9tICcuLi8uLi9saWIvd2FybmluZydcblxuY2xhc3MgTWVudUl0ZW0gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAvKipcbiAgICAgKiBFbGVtZW50IHR5cGUgdG8gdXNlIGZvciB0aGUgbWVudSBpdGVtLlxuICAgICAqIEZvciBleGFtcGxlOiBgPE1lbnVJdGVtIGlzPXtSZWFjdFJvdXRlckxpbmt9Pi4uLjwvTWVudUl0ZW0+YFxuICAgICAqL1xuICAgIGlzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuY10pLmlzUmVxdWlyZWQsXG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBvbiBjbGljayBhbmQgZW50ZXIvc3BhY2Uga2V5cHJlc3MuXG4gICAgICovXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgLyoqXG4gICAgICogVGhlIGljb24gYmVmb3JlIHRoZSBsYWJlbC5cbiAgICAgKi9cbiAgICBpY29uOiBQcm9wVHlwZXMubm9kZSxcblxuICAgIC8qKlxuICAgICAqIFRoZSBjaGlsZHJlbiBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqL1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcblxuICAgIC8qKlxuICAgICAqIFNlY29uZGFyeSB0ZXh0IHNob3duIG9uIHRoZSByaWdodC5cbiAgICAgKi9cbiAgICBzZWNvbmRhcnlUZXh0OiBQcm9wVHlwZXMubm9kZSxcblxuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IHRoZW1lIG9ubHkgc3VwcG9ydHMgb25lIGRlZmF1bHQgYXBwZWFyYW5jZS5cbiAgICAgKi9cbiAgICBhcHBlYXJhbmNlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW50ZW50IG9mIHRoZSBtZW51IGl0ZW0uXG4gICAgICovXG4gICAgaW50ZW50OiBQcm9wVHlwZXMub25lT2YoWydub25lJywgJ3N1Y2Nlc3MnLCAnd2FybmluZycsICdkYW5nZXInXSlcbiAgICAgIC5pc1JlcXVpcmVkLFxuXG4gICAgLyoqXG4gICAgICogVGhlbWUgcHJvdmlkZWQgYnkgVGhlbWVQcm92aWRlci5cbiAgICAgKi9cbiAgICB0aGVtZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlzOiAnZGl2JyxcbiAgICBpbnRlbnQ6ICdub25lJyxcbiAgICBhcHBlYXJhbmNlOiAnZGVmYXVsdCcsXG4gICAgb25TZWxlY3Q6ICgpID0+IHt9XG4gIH1cblxuICBoYW5kbGVDbGljayA9IGV2ZW50ID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGV2ZW50KVxuXG4gICAgLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuICAgIHNhZmVJbnZva2UodGhpcy5wcm9wcy5vbkNsaWNrLCBldmVudClcbiAgICAvKiBlc2xpbnQtZW5hYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbiAgfVxuXG4gIGhhbmRsZUtleVByZXNzID0gZXZlbnQgPT4ge1xuICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgfHwgZXZlbnQua2V5ID09PSAnICcpIHtcbiAgICAgIHRoaXMucHJvcHMub25TZWxlY3QoZXZlbnQpXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuICAgIHNhZmVJbnZva2UodGhpcy5wcm9wcy5vbktleVByZXNzLCBldmVudClcbiAgICAvKiBlc2xpbnQtZW5hYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBpcyxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgdGhlbWUsXG4gICAgICBhcHBlYXJhbmNlLFxuICAgICAgc2Vjb25kYXJ5VGV4dCxcbiAgICAgIGludGVudCxcbiAgICAgIGljb24sXG4gICAgICAuLi5wYXNzdGhyb3VnaFByb3BzXG4gICAgfSA9IHRoaXMucHJvcHNcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB3YXJuaW5nKFxuICAgICAgICAnb25DbGljaycgaW4gdGhpcy5wcm9wcyxcbiAgICAgICAgJzxNZW51Lkl0ZW0+IGV4cGVjdHMgYG9uU2VsZWN0YCBwcm9wLCBidXQgeW91IHBhc3NlZCBgb25DbGlja2AuJ1xuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IHRoZW1lZENsYXNzTmFtZSA9IHRoZW1lLmdldE1lbnVJdGVtQ2xhc3NOYW1lKGFwcGVhcmFuY2UsICdub25lJylcblxuICAgIHJldHVybiAoXG4gICAgICA8UGFuZVxuICAgICAgICBpcz17aXN9XG4gICAgICAgIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICAgIGNsYXNzTmFtZT17dGhlbWVkQ2xhc3NOYW1lfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgICBvbktleVByZXNzPXt0aGlzLmhhbmRsZUtleVByZXNzfVxuICAgICAgICBoZWlnaHQ9e2ljb24gPyA0MCA6IDMyfVxuICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgZGF0YS1pc3NlbGVjdGFibGU9XCJ0cnVlXCJcbiAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgICAgey4uLnBhc3N0aHJvdWdoUHJvcHN9XG4gICAgICA+XG4gICAgICAgIHtpY29uICYmIChcbiAgICAgICAgICA8SWNvblxuICAgICAgICAgICAgY29sb3I9e2ludGVudCA9PT0gJ25vbmUnID8gJ2RlZmF1bHQnIDogaW50ZW50fVxuICAgICAgICAgICAgaWNvbj17aWNvbn1cbiAgICAgICAgICAgIG1hcmdpbkxlZnQ9ezE2fVxuICAgICAgICAgICAgbWFyZ2luUmlnaHQ9ey00fVxuICAgICAgICAgICAgc2l6ZT17MTZ9XG4gICAgICAgICAgICBmbGV4U2hyaW5rPXswfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIDxUZXh0IGNvbG9yPXtpbnRlbnR9IG1hcmdpbkxlZnQ9ezE2fSBtYXJnaW5SaWdodD17MTZ9IGZsZXg9ezF9PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9UZXh0PlxuICAgICAgICB7c2Vjb25kYXJ5VGV4dCAmJiAoXG4gICAgICAgICAgPFRleHQgbWFyZ2luUmlnaHQ9ezE2fSBjb2xvcj1cIm11dGVkXCI+XG4gICAgICAgICAgICB7c2Vjb25kYXJ5VGV4dH1cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICl9XG4gICAgICA8L1BhbmU+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhUaGVtZShNZW51SXRlbSlcbiJdfQ==