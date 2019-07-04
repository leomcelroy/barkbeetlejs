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
import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '../../theme';
import { Portal } from '../../portal';
import { Stack } from '../../stack';
import safeInvoke from '../../lib/safe-invoke';
import TextTableCell from './TextTableCell';
import TableCell from './TableCell';
import EditableCellField from './EditableCellField';

var EditableCell =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(EditableCell, _React$PureComponent);

  function EditableCell() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EditableCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EditableCell)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: _this.props.children,
      isEditing: _this.props.autoFocus
    });

    _defineProperty(_assertThisInitialized(_this), "onMainRef", function (ref) {
      _this.mainRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "onOverlayRef", function (ref) {
      _this.overlayRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "handleDoubleClick", function () {
      if (_this.props.disabled || !_this.props.isSelectable) return;

      _this.setState({
        isEditing: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (e) {
      if (_this.props.disabled) return;
      var key = e.key;
      /**
       * When the user presses a character on the keyboard, use that character
       * as the value in the text field.
       */

      if (key === 'Enter' || key === 'Shift') {
        _this.setState({
          isEditing: true
        });
      } else if (key.match(/^[a-z]{0,10}$/) && !e.metaKey && !e.ctrlKey && !e.altKey) {
        _this.setState(function (prevState) {
          return {
            isEditing: true,
            value: prevState.value + key
          };
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleFieldChangeComplete", function (value) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          isSelectable = _this$props.isSelectable;

      _this.setState({
        isEditing: false,
        value: value
      });

      safeInvoke(onChange, value);

      if (_this.mainRef && isSelectable) {
        _this.mainRef.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleFieldCancel", function () {
      _this.setState({
        isEditing: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function () {
      _this.mainRef.focus();
    });

    return _this;
  }

  _createClass(EditableCell, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          children = _this$props2.children,
          theme = _this$props2.theme,
          size = _this$props2.size,
          disabled = _this$props2.disabled,
          placeholder = _this$props2.placeholder,
          isSelectable = _this$props2.isSelectable,
          _this$props2$textProp = _this$props2.textProps,
          textProps = _this$props2$textProp === void 0 ? {} : _this$props2$textProp,
          props = _objectWithoutProperties(_this$props2, ["children", "theme", "size", "disabled", "placeholder", "isSelectable", "textProps"]);

      var _this$state = this.state,
          isEditing = _this$state.isEditing,
          value = _this$state.value;
      return React.createElement(React.Fragment, null, React.createElement(TextTableCell, _extends({
        innerRef: this.onMainRef,
        isSelectable: isSelectable,
        onClick: this.handleClick,
        onDoubleClick: this.handleDoubleClick,
        onKeyDown: this.handleKeyDown,
        cursor: disabled ? 'not-allowed' : isSelectable ? 'default' : 'text',
        textProps: _objectSpread({
          size: size,
          opacity: disabled || !children && placeholder ? 0.5 : 1
        }, textProps)
      }, props), children ? children : placeholder), isEditing && React.createElement(Portal, null, React.createElement(Stack, null, function (zIndex) {
        return React.createElement(EditableCellField, {
          zIndex: zIndex,
          getTargetRef: function getTargetRef() {
            return _this2.mainRef;
          },
          value: value,
          onEscape: _this2.handleFieldEscape,
          onChangeComplete: _this2.handleFieldChangeComplete,
          onCancel: _this2.handleFieldCancel,
          size: size
        });
      })));
    }
  }]);

  return EditableCell;
}(React.PureComponent);

EditableCell.displayName = "EditableCell";

_defineProperty(EditableCell, "propTypes", _objectSpread({}, TableCell.propTypes, {
  /*
  * Makes the TableCell focusable.
  * Will add tabIndex={-1 || this.props.tabIndex}.
  */
  isSelectable: PropTypes.bool.isRequired,

  /**
   * When true, the cell can't be edited.
   */
  disabled: PropTypes.bool,

  /**
   * Optional placeholder when children is falsy.
   */
  placeholder: PropTypes.node,

  /**
   * The size used for the TextTableCell and Textarea.
   */
  size: PropTypes.oneOf([300, 400]).isRequired,

  /**
   * This is the value of the cell.
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Function called when value changes. (value: string) => void.
   */
  onChange: PropTypes.func,

  /**
   * When true, the cell will initialize in the editing state.
   */
  autoFocus: PropTypes.bool
}));

_defineProperty(EditableCell, "defaultProps", {
  size: 300,
  isSelectable: true,
  autoFocus: false
});

export default withTheme(EditableCell);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90YWJsZS9zcmMvRWRpdGFibGVDZWxsLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwid2l0aFRoZW1lIiwiUG9ydGFsIiwiU3RhY2siLCJzYWZlSW52b2tlIiwiVGV4dFRhYmxlQ2VsbCIsIlRhYmxlQ2VsbCIsIkVkaXRhYmxlQ2VsbEZpZWxkIiwiRWRpdGFibGVDZWxsIiwidmFsdWUiLCJwcm9wcyIsImNoaWxkcmVuIiwiaXNFZGl0aW5nIiwiYXV0b0ZvY3VzIiwicmVmIiwibWFpblJlZiIsIm92ZXJsYXlSZWYiLCJkaXNhYmxlZCIsImlzU2VsZWN0YWJsZSIsInNldFN0YXRlIiwiZSIsImtleSIsIm1hdGNoIiwibWV0YUtleSIsImN0cmxLZXkiLCJhbHRLZXkiLCJwcmV2U3RhdGUiLCJvbkNoYW5nZSIsImZvY3VzIiwidGhlbWUiLCJzaXplIiwicGxhY2Vob2xkZXIiLCJ0ZXh0UHJvcHMiLCJzdGF0ZSIsIm9uTWFpblJlZiIsImhhbmRsZUNsaWNrIiwiaGFuZGxlRG91YmxlQ2xpY2siLCJoYW5kbGVLZXlEb3duIiwib3BhY2l0eSIsInpJbmRleCIsImhhbmRsZUZpZWxkRXNjYXBlIiwiaGFuZGxlRmllbGRDaGFuZ2VDb21wbGV0ZSIsImhhbmRsZUZpZWxkQ2FuY2VsIiwiUHVyZUNvbXBvbmVudCIsInByb3BUeXBlcyIsImJvb2wiLCJpc1JlcXVpcmVkIiwibm9kZSIsIm9uZU9mIiwib25lT2ZUeXBlIiwic3RyaW5nIiwibnVtYmVyIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsU0FBVCxRQUEwQixhQUExQjtBQUNBLFNBQVNDLE1BQVQsUUFBdUIsY0FBdkI7QUFDQSxTQUFTQyxLQUFULFFBQXNCLGFBQXRCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1Qix1QkFBdkI7QUFDQSxPQUFPQyxhQUFQ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QUVsQixTQUFTLENBQUM2QyxJQUFWLENBQWVDLFU7O0FBRTdCOzs7QUFHQTdCLEVBQUFBLFFBQVEsRUFBRWpCLFNBQVMsQ0FBQzZDLEk7O0FBRXBCOzs7QUFHQWQsRUFBQUEsV0FBVyxFQUFFL0IsU0FBUyxDQUFDK0MsSTs7QUFFdkI7OztBQUdBakIsRUFBQUEsSUFBSSxFQUFFOUIsU0FBUyxDQUFDZ0QsS0FBVixDQUFnQixDQUFDLEdBQUQsRUFBTSxHQUFOLENBQWhCLEVBQTRCRixVOztBQUVsQzs7O0FBR0FuQyxFQUFBQSxRQUFRLEVBQUVYLFNBQVMsQ0FBQ2lELFNBQVYsQ0FBb0IsQ0FBQ2pELFNBQVMsQ0FBQ2tELE1BQVgsRUFBbUJsRCxTQUFTLENBQUNtRCxNQUE3QixDQUFwQixDOztBQUVWOzs7QUFHQXhCLEVBQUFBLFFBQVEsRUFBRTNCLFNBQVMsQ0FBQ29ELEk7O0FBRXBCOzs7QUFHQXZDLEVBQUFBLFNBQVMsRUFBRWIsU0FBUyxDQUFDNkM7OztnQkF6Q25CckMsWSxrQkE0Q2tCO0FBQ3BCc0IsRUFBQUEsSUFBSSxFQUFFLEdBRGM7QUFFcEJaLEVBQUFBLFlBQVksRUFBRSxJQUZNO0FBR3BCTCxFQUFBQSxTQUFTLEVBQUU7QUFIUyxDOztBQWdJeEIsZUFBZVosU0FBUyxDQUFDTyxZQUFELENBQXhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IHsgd2l0aFRoZW1lIH0gZnJvbSAnLi4vLi4vdGhlbWUnXG5pbXBvcnQgeyBQb3J0YWwgfSBmcm9tICcuLi8uLi9wb3J0YWwnXG5pbXBvcnQgeyBTdGFjayB9IGZyb20gJy4uLy4uL3N0YWNrJ1xuaW1wb3J0IHNhZmVJbnZva2UgZnJvbSAnLi4vLi4vbGliL3NhZmUtaW52b2tlJ1xuaW1wb3J0IFRleHRUYWJsZUNlbGwgZnJvbSAnLi9UZXh0VGFibGVDZWxsJ1xuaW1wb3J0IFRhYmxlQ2VsbCBmcm9tICcuL1RhYmxlQ2VsbCdcbmltcG9ydCBFZGl0YWJsZUNlbGxGaWVsZCBmcm9tICcuL0VkaXRhYmxlQ2VsbEZpZWxkJ1xuXG5jbGFzcyBFZGl0YWJsZUNlbGwgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAvKipcbiAgICAgKiBDb21wb3NlcyB0aGUgVGFibGVDZWxsIGNvbXBvbmVudCBhcyB0aGUgYmFzZS5cbiAgICAgKi9cbiAgICAuLi5UYWJsZUNlbGwucHJvcFR5cGVzLFxuXG4gICAgLypcbiAgICAqIE1ha2VzIHRoZSBUYWJsZUNlbGwgZm9jdXNhYmxlLlxuICAgICogV2lsbCBhZGQgdGFiSW5kZXg9ey0xIHx8IHRoaXMucHJvcHMudGFiSW5kZXh9LlxuICAgICovXG4gICAgaXNTZWxlY3RhYmxlOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuXG4gICAgLyoqXG4gICAgICogV2hlbiB0cnVlLCB0aGUgY2VsbCBjYW4ndCBiZSBlZGl0ZWQuXG4gICAgICovXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuXG4gICAgLyoqXG4gICAgICogT3B0aW9uYWwgcGxhY2Vob2xkZXIgd2hlbiBjaGlsZHJlbiBpcyBmYWxzeS5cbiAgICAgKi9cbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLm5vZGUsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2l6ZSB1c2VkIGZvciB0aGUgVGV4dFRhYmxlQ2VsbCBhbmQgVGV4dGFyZWEuXG4gICAgICovXG4gICAgc2l6ZTogUHJvcFR5cGVzLm9uZU9mKFszMDAsIDQwMF0pLmlzUmVxdWlyZWQsXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHRoZSB2YWx1ZSBvZiB0aGUgY2VsbC5cbiAgICAgKi9cbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gY2FsbGVkIHdoZW4gdmFsdWUgY2hhbmdlcy4gKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQuXG4gICAgICovXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgLyoqXG4gICAgICogV2hlbiB0cnVlLCB0aGUgY2VsbCB3aWxsIGluaXRpYWxpemUgaW4gdGhlIGVkaXRpbmcgc3RhdGUuXG4gICAgICovXG4gICAgYXV0b0ZvY3VzOiBQcm9wVHlwZXMuYm9vbFxuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBzaXplOiAzMDAsXG4gICAgaXNTZWxlY3RhYmxlOiB0cnVlLFxuICAgIGF1dG9Gb2N1czogZmFsc2VcbiAgfVxuXG4gIHN0YXRlID0ge1xuICAgIHZhbHVlOiB0aGlzLnByb3BzLmNoaWxkcmVuLFxuICAgIGlzRWRpdGluZzogdGhpcy5wcm9wcy5hdXRvRm9jdXNcbiAgfVxuXG4gIG9uTWFpblJlZiA9IHJlZiA9PiB7XG4gICAgdGhpcy5tYWluUmVmID0gcmVmXG4gIH1cblxuICBvbk92ZXJsYXlSZWYgPSByZWYgPT4ge1xuICAgIHRoaXMub3ZlcmxheVJlZiA9IHJlZlxuICB9XG5cbiAgaGFuZGxlRG91YmxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgIXRoaXMucHJvcHMuaXNTZWxlY3RhYmxlKSByZXR1cm5cblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaXNFZGl0aW5nOiB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIGhhbmRsZUtleURvd24gPSBlID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCkgcmV0dXJuXG4gICAgY29uc3QgeyBrZXkgfSA9IGVcblxuICAgIC8qKlxuICAgICAqIFdoZW4gdGhlIHVzZXIgcHJlc3NlcyBhIGNoYXJhY3RlciBvbiB0aGUga2V5Ym9hcmQsIHVzZSB0aGF0IGNoYXJhY3RlclxuICAgICAqIGFzIHRoZSB2YWx1ZSBpbiB0aGUgdGV4dCBmaWVsZC5cbiAgICAgKi9cbiAgICBpZiAoa2V5ID09PSAnRW50ZXInIHx8IGtleSA9PT0gJ1NoaWZ0Jykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGlzRWRpdGluZzogdHJ1ZVxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKFxuICAgICAga2V5Lm1hdGNoKC9eW2Etel17MCwxMH0kLykgJiZcbiAgICAgICFlLm1ldGFLZXkgJiZcbiAgICAgICFlLmN0cmxLZXkgJiZcbiAgICAgICFlLmFsdEtleVxuICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZShwcmV2U3RhdGUgPT4gKHtcbiAgICAgICAgaXNFZGl0aW5nOiB0cnVlLFxuICAgICAgICB2YWx1ZTogcHJldlN0YXRlLnZhbHVlICsga2V5XG4gICAgICB9KSlcbiAgICB9XG4gIH1cblxuICBoYW5kbGVGaWVsZENoYW5nZUNvbXBsZXRlID0gdmFsdWUgPT4ge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIGlzU2VsZWN0YWJsZSB9ID0gdGhpcy5wcm9wc1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpc0VkaXRpbmc6IGZhbHNlLFxuICAgICAgdmFsdWVcbiAgICB9KVxuXG4gICAgc2FmZUludm9rZShvbkNoYW5nZSwgdmFsdWUpXG5cbiAgICBpZiAodGhpcy5tYWluUmVmICYmIGlzU2VsZWN0YWJsZSkge1xuICAgICAgdGhpcy5tYWluUmVmLmZvY3VzKClcbiAgICB9XG4gIH1cblxuICBoYW5kbGVGaWVsZENhbmNlbCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNFZGl0aW5nOiBmYWxzZSB9KVxuICB9XG5cbiAgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5tYWluUmVmLmZvY3VzKClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIHRoZW1lLFxuICAgICAgc2l6ZSxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICBpc1NlbGVjdGFibGUsXG4gICAgICB0ZXh0UHJvcHMgPSB7fSxcbiAgICAgIC4uLnByb3BzXG4gICAgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB7IGlzRWRpdGluZywgdmFsdWUgfSA9IHRoaXMuc3RhdGVcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxUZXh0VGFibGVDZWxsXG4gICAgICAgICAgaW5uZXJSZWY9e3RoaXMub25NYWluUmVmfVxuICAgICAgICAgIGlzU2VsZWN0YWJsZT17aXNTZWxlY3RhYmxlfVxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XG4gICAgICAgICAgb25Eb3VibGVDbGljaz17dGhpcy5oYW5kbGVEb3VibGVDbGlja31cbiAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn1cbiAgICAgICAgICBjdXJzb3I9e2Rpc2FibGVkID8gJ25vdC1hbGxvd2VkJyA6IGlzU2VsZWN0YWJsZSA/ICdkZWZhdWx0JyA6ICd0ZXh0J31cbiAgICAgICAgICB0ZXh0UHJvcHM9e3tcbiAgICAgICAgICAgIHNpemUsXG4gICAgICAgICAgICBvcGFjaXR5OiBkaXNhYmxlZCB8fCAoIWNoaWxkcmVuICYmIHBsYWNlaG9sZGVyKSA/IDAuNSA6IDEsXG4gICAgICAgICAgICAuLi50ZXh0UHJvcHNcbiAgICAgICAgICB9fVxuICAgICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgPlxuICAgICAgICAgIHtjaGlsZHJlbiA/IGNoaWxkcmVuIDogcGxhY2Vob2xkZXJ9XG4gICAgICAgIDwvVGV4dFRhYmxlQ2VsbD5cbiAgICAgICAge2lzRWRpdGluZyAmJiAoXG4gICAgICAgICAgPFBvcnRhbD5cbiAgICAgICAgICAgIDxTdGFjaz5cbiAgICAgICAgICAgICAge3pJbmRleCA9PiAoXG4gICAgICAgICAgICAgICAgPEVkaXRhYmxlQ2VsbEZpZWxkXG4gICAgICAgICAgICAgICAgICB6SW5kZXg9e3pJbmRleH1cbiAgICAgICAgICAgICAgICAgIGdldFRhcmdldFJlZj17KCkgPT4gdGhpcy5tYWluUmVmfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgICAgICAgICAgb25Fc2NhcGU9e3RoaXMuaGFuZGxlRmllbGRFc2NhcGV9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZUNvbXBsZXRlPXt0aGlzLmhhbmRsZUZpZWxkQ2hhbmdlQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgICBvbkNhbmNlbD17dGhpcy5oYW5kbGVGaWVsZENhbmNlbH1cbiAgICAgICAgICAgICAgICAgIHNpemU9e3NpemV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgPC9Qb3J0YWw+XG4gICAgICAgICl9XG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoVGhlbWUoRWRpdGFibGVDZWxsKVxuIl19