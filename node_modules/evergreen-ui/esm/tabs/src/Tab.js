import _extends from "@babel/runtime/helpers/esm/extends";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
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
import { Text } from '../../typography';
import { withTheme } from '../../theme';
import warning from '../../lib/warning';

var Tab =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Tab, _PureComponent);

  function Tab() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tab);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tab)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      if (typeof _this.props.onClick === 'function') {
        _this.props.onClick(e);
      }

      _this.props.onSelect();
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyPress", function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        _this.props.onSelect();

        e.preventDefault();
      }

      _this.props.onKeyPress(e);
    });

    return _this;
  }

  _createClass(Tab, [{
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
          props = _objectWithoutProperties(_this$props, ["theme", "is", "height", "onSelect", "isSelected", "appearance", "disabled"]);

      if (process.env.NODE_ENV !== 'production') {
        warning(typeof this.props.onClick === 'function', '<Tab> expects `onSelect` prop, but you passed `onClick`.');
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
        elementBasedProps = isSelected ? _objectSpread({}, elementBasedProps, {
          'aria-current': 'page'
        }) : {};
      } else {
        // Use a role="tablist" around the tabs
        // Also pass down a aria-controls="panelId"
        // https://www.stefanjudis.com/blog/aria-selected-and-when-to-use-it/
        elementBasedProps = _objectSpread({}, elementBasedProps, {
          'aria-selected': isSelected,
          role: 'tab'
        });
      }

      return React.createElement(Text, _extends({
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
}(PureComponent);

Tab.displayName = "Tab";

_defineProperty(Tab, "propTypes", _objectSpread({}, Text.propTypes, {
  /**
   * Function triggered when tab is selected.
   */
  onSelect: PropTypes.func,

  /**
   * When true, the tab is selected.
   */
  isSelected: PropTypes.bool,

  /**
   * The appearance of the tab.
   * The default theme only comes with a default style.
   */
  appearance: PropTypes.string,

  /**
   * Theme provided by ThemeProvider.
   */
  theme: PropTypes.object.isRequired
}));

_defineProperty(Tab, "defaultProps", {
  onSelect: function onSelect() {},
  onKeyPress: function onKeyPress() {},
  is: 'span',
  height: 28,
  disabled: false
});

_defineProperty(Tab, "styles", {
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

export default withTheme(Tab);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90YWJzL3NyYy9UYWIuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwiVGV4dCIsIndpdGhUaGVtZSIsIndhcm5pbmciLCJUYWIiLCJlIiwicHJvcHMiLCJvbkNsaWNrIiwib25TZWxlY3QiLCJrZXkiLCJwcmV2ZW50RGVmYXVsdCIsIm9uS2V5UHJlc3MiLCJ0aGVtZSIsImlzIiwiaGVpZ2h0IiwiaXNTZWxlY3RlZCIsImFwcGVhcmFuY2UiLCJkaXNhYmxlZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInRleHRTaXplIiwiZ2V0VGV4dFNpemVGb3JDb250cm9sSGVpZ2h0IiwiZWxlbWVudEJhc2VkUHJvcHMiLCJyb2xlIiwiZ2V0VGFiQ2xhc3NOYW1lIiwic3R5bGVzIiwiaGFuZGxlQ2xpY2siLCJoYW5kbGVLZXlQcmVzcyIsInByb3BUeXBlcyIsImZ1bmMiLCJib29sIiwic3RyaW5nIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsImRpc3BsYXkiLCJmb250V2VpZ2h0IiwicGFkZGluZ1giLCJtYXJnaW5YIiwiYm9yZGVyUmFkaXVzIiwibGluZUhlaWdodCIsImFsaWduSXRlbXMiLCJqdXN0aWZ5Q29udGVudCIsInRleHREZWNvcmF0aW9uIiwidGFiSW5kZXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLElBQWdCQyxhQUFoQixRQUFxQyxPQUFyQztBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxJQUFULFFBQXFCLGtCQUFyQjtBQUNBLFNBQVNDLFNBQVQsUUFBMEIsYUFBMUI7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLG1CQUFwQjs7SUFFTUMsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tFQWtEVSxVQUFBQyxDQUFDLEVBQUk7QUFDakIsVUFBSSxPQUFPLE1BQUtDLEtBQUwsQ0FBV0MsT0FBbEIsS0FBOEIsVUFBbEMsRUFBOEM7QUFDNUMsY0FBS0Qs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RSxhQURLO0FBRWRDLEVBQUFBLFVBQVUsRUFBRSxHQUZFO0FBR2RDLEVBQUFBLFFBQVEsRUFBRSxDQUhJO0FBSWRDLEVBQUFBLE9BQU8sRUFBRSxDQUpLO0FBS2RDLEVBQUFBLFlBQVksRUFBRSxDQUxBO0FBTWRDLEVBQUFBLFVBQVUsRUFBRSxNQU5FO0FBT2RDLEVBQUFBLFVBQVUsRUFBRSxRQVBFO0FBUWRDLEVBQUFBLGNBQWMsRUFBRSxRQVJGO0FBU2RDLEVBQUFBLGNBQWMsRUFBRSxNQVRGO0FBVWRDLEVBQUFBLFFBQVEsRUFBRTtBQVZJLEM7O0FBOEZsQixlQUFlMUMsU0FBUyxDQUFDRSxHQUFELENBQXhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCB7IFRleHQgfSBmcm9tICcuLi8uLi90eXBvZ3JhcGh5J1xuaW1wb3J0IHsgd2l0aFRoZW1lIH0gZnJvbSAnLi4vLi4vdGhlbWUnXG5pbXBvcnQgd2FybmluZyBmcm9tICcuLi8uLi9saWIvd2FybmluZydcblxuY2xhc3MgVGFiIGV4dGVuZHMgUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLyoqXG4gICAgICogQ29tcG9zZXMgdGhlIFRleHQgY29tcG9uZW50IGFzIHRoZSBiYXNlLlxuICAgICAqL1xuICAgIC4uLlRleHQucHJvcFR5cGVzLFxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdHJpZ2dlcmVkIHdoZW4gdGFiIGlzIHNlbGVjdGVkLlxuICAgICAqL1xuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcblxuICAgIC8qKlxuICAgICAqIFdoZW4gdHJ1ZSwgdGhlIHRhYiBpcyBzZWxlY3RlZC5cbiAgICAgKi9cbiAgICBpc1NlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIC8qKlxuICAgICAqIFRoZSBhcHBlYXJhbmNlIG9mIHRoZSB0YWIuXG4gICAgICogVGhlIGRlZmF1bHQgdGhlbWUgb25seSBjb21lcyB3aXRoIGEgZGVmYXVsdCBzdHlsZS5cbiAgICAgKi9cbiAgICBhcHBlYXJhbmNlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gICAgLyoqXG4gICAgICogVGhlbWUgcHJvdmlkZWQgYnkgVGhlbWVQcm92aWRlci5cbiAgICAgKi9cbiAgICB0aGVtZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgICBvbktleVByZXNzOiAoKSA9PiB7fSxcbiAgICBpczogJ3NwYW4nLFxuICAgIGhlaWdodDogMjgsXG4gICAgZGlzYWJsZWQ6IGZhbHNlXG4gIH1cblxuICBzdGF0aWMgc3R5bGVzID0ge1xuICAgIGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsXG4gICAgZm9udFdlaWdodDogNTAwLFxuICAgIHBhZGRpbmdYOiA4LFxuICAgIG1hcmdpblg6IDQsXG4gICAgYm9yZGVyUmFkaXVzOiAzLFxuICAgIGxpbmVIZWlnaHQ6ICcyOHB4JyxcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgdGV4dERlY29yYXRpb246ICdub25lJyxcbiAgICB0YWJJbmRleDogMFxuICB9XG5cbiAgaGFuZGxlQ2xpY2sgPSBlID0+IHtcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGUpXG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdCgpXG4gIH1cblxuICBoYW5kbGVLZXlQcmVzcyA9IGUgPT4ge1xuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJyB8fCBlLmtleSA9PT0gJyAnKSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KClcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25LZXlQcmVzcyhlKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHRoZW1lLFxuICAgICAgaXMsXG4gICAgICBoZWlnaHQsXG4gICAgICBvblNlbGVjdCxcbiAgICAgIGlzU2VsZWN0ZWQsXG4gICAgICBhcHBlYXJhbmNlLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICAuLi5wcm9wc1xuICAgIH0gPSB0aGlzLnByb3BzXG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgd2FybmluZyhcbiAgICAgICAgdHlwZW9mIHRoaXMucHJvcHMub25DbGljayA9PT0gJ2Z1bmN0aW9uJyxcbiAgICAgICAgJzxUYWI+IGV4cGVjdHMgYG9uU2VsZWN0YCBwcm9wLCBidXQgeW91IHBhc3NlZCBgb25DbGlja2AuJ1xuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IHRleHRTaXplID0gdGhlbWUuZ2V0VGV4dFNpemVGb3JDb250cm9sSGVpZ2h0KGhlaWdodClcblxuICAgIGxldCBlbGVtZW50QmFzZWRQcm9wc1xuICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgZWxlbWVudEJhc2VkUHJvcHMgPSB7XG4gICAgICAgICdhcmlhLWRpc2FibGVkJzogdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpcyA9PT0gJ2EnKSB7XG4gICAgICAvLyBVc2UgYXJpYS1jdXJyZW50IHdoZW4gaXQncyBhIGxpbmtcbiAgICAgIC8vIGh0dHBzOi8vdGluay51ay91c2luZy10aGUtYXJpYS1jdXJyZW50LWF0dHJpYnV0ZS9cbiAgICAgIGVsZW1lbnRCYXNlZFByb3BzID0gaXNTZWxlY3RlZFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIC4uLmVsZW1lbnRCYXNlZFByb3BzLFxuICAgICAgICAgICAgJ2FyaWEtY3VycmVudCc6ICdwYWdlJ1xuICAgICAgICAgIH1cbiAgICAgICAgOiB7fVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBVc2UgYSByb2xlPVwidGFibGlzdFwiIGFyb3VuZCB0aGUgdGFic1xuICAgICAgLy8gQWxzbyBwYXNzIGRvd24gYSBhcmlhLWNvbnRyb2xzPVwicGFuZWxJZFwiXG4gICAgICAvLyBodHRwczovL3d3dy5zdGVmYW5qdWRpcy5jb20vYmxvZy9hcmlhLXNlbGVjdGVkLWFuZC13aGVuLXRvLXVzZS1pdC9cbiAgICAgIGVsZW1lbnRCYXNlZFByb3BzID0ge1xuICAgICAgICAuLi5lbGVtZW50QmFzZWRQcm9wcyxcbiAgICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiBpc1NlbGVjdGVkLFxuICAgICAgICByb2xlOiAndGFiJ1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8VGV4dFxuICAgICAgICBjbGFzc05hbWU9e3RoZW1lLmdldFRhYkNsYXNzTmFtZShhcHBlYXJhbmNlKX1cbiAgICAgICAgaXM9e2lzfVxuICAgICAgICBzaXplPXt0ZXh0U2l6ZX1cbiAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgIHsuLi5UYWIuc3R5bGVzfVxuICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgIG9uS2V5UHJlc3M9e3RoaXMuaGFuZGxlS2V5UHJlc3N9XG4gICAgICAgIHsuLi5lbGVtZW50QmFzZWRQcm9wc31cbiAgICAgIC8+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhUaGVtZShUYWIpXG4iXX0=