"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _theme = require("../../theme");

var _portal = require("../../portal");

var _stack = require("../../stack");

var _safeInvoke = _interopRequireDefault(require("../../lib/safe-invoke"));

var _TextTableCell = _interopRequireDefault(require("./TextTableCell"));

var _TableCell = _interopRequireDefault(require("./TableCell"));

var _EditableCellField = _interopRequireDefault(require("./EditableCellField"));

var EditableCell =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(EditableCell, _React$PureComponent);

  function EditableCell() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, EditableCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(EditableCell)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      value: _this.props.children,
      isEditing: _this.props.autoFocus
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onMainRef", function (ref) {
      _this.mainRef = ref;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onOverlayRef", function (ref) {
      _this.overlayRef = ref;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleDoubleClick", function () {
      if (_this.props.disabled || !_this.props.isSelectable) return;

      _this.setState({
        isEditing: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleKeyDown", function (e) {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleFieldChangeComplete", function (value) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          isSelectable = _this$props.isSelectable;

      _this.setState({
        isEditing: false,
        value: value
      });

      (0, _safeInvoke.default)(onChange, value);

      if (_this.mainRef && isSelectable) {
        _this.mainRef.focus();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleFieldCancel", function () {
      _this.setState({
        isEditing: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleClick", function () {
      _this.mainRef.focus();
    });
    return _this;
  }

  (0, _createClass2.default)(EditableCell, [{
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
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["children", "theme", "size", "disabled", "placeholder", "isSelectable", "textProps"]);
      var _this$state = this.state,
          isEditing = _this$state.isEditing,
          value = _this$state.value;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_TextTableCell.default, (0, _extends2.default)({
        innerRef: this.onMainRef,
        isSelectable: isSelectable,
        onClick: this.handleClick,
        onDoubleClick: this.handleDoubleClick,
        onKeyDown: this.handleKeyDown,
        cursor: disabled ? 'not-allowed' : isSelectable ? 'default' : 'text',
        textProps: (0, _objectSpread2.default)({
          size: size,
          opacity: disabled || !children && placeholder ? 0.5 : 1
        }, textProps)
      }, props), children ? children : placeholder), isEditing && _react.default.createElement(_portal.Portal, null, _react.default.createElement(_stack.Stack, null, function (zIndex) {
        return _react.default.createElement(_EditableCellField.default, {
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
}(_react.default.PureComponent);

EditableCell.displayName = "EditableCell";
(0, _defineProperty2.default)(EditableCell, "propTypes", (0, _objectSpread2.default)({}, _TableCell.default.propTypes, {
  /*
  * Makes the TableCell focusable.
  * Will add tabIndex={-1 || this.props.tabIndex}.
  */
  isSelectable: _propTypes.default.bool.isRequired,

  /**
   * When true, the cell can't be edited.
   */
  disabled: _propTypes.default.bool,

  /**
   * Optional placeholder when children is falsy.
   */
  placeholder: _propTypes.default.node,

  /**
   * The size used for the TextTableCell and Textarea.
   */
  size: _propTypes.default.oneOf([300, 400]).isRequired,

  /**
   * This is the value of the cell.
   */
  children: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * Function called when value changes. (value: string) => void.
   */
  onChange: _propTypes.default.func,

  /**
   * When true, the cell will initialize in the editing state.
   */
  autoFocus: _propTypes.default.bool
}));
(0, _defineProperty2.default)(EditableCell, "defaultProps", {
  size: 300,
  isSelectable: true,
  autoFocus: false
});

var _default = (0, _theme.withTheme)(EditableCell);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90YWJsZS9zcmMvRWRpdGFibGVDZWxsLmpzIl0sIm5hbWVzIjpbIkVkaXRhYmxlQ2VsbCIsInZhbHVlIiwicHJvcHMiLCJjaGlsZHJlbiIsImlzRWRpdGluZyIsImF1dG9Gb2N1cyIsInJlZiIsIm1haW5SZWYiLCJvdmVybGF5UmVmIiwiZGlzYWJsZWQiLCJpc1NlbGVjdGFibGUiLCJzZXRTdGF0ZSIsImUiLCJrZXkiLCJtYXRjaCIsIm1ldGFLZXkiLCJjdHJsS2V5IiwiYWx0S2V5IiwicHJldlN0YXRlIiwib25DaGFuZ2UiLCJmb2N1cyIsInRoZW1lIiwic2l6ZSIsInBsYWNlaG9sZGVyIiwidGV4dFByb3BzIiwic3RhdGUiLCJvbk1haW5SZWYiLCJoYW5kbGVDbGljayIsImhhbmRsZURvdWJsZUNsaWNrIiwiaGFuZGxlS2V5RG93biIsIm9wYWNpdHkiLCJ6SW5kZXgiLCJoYW5kbGVGaWVsZEVzY2FwZSIsImhhbmRsZUZpZWxkQ2hhbmdlQ29tcGxldGUiLCJoYW5kbGVGaWVsZENhbmNlbCIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsIlRhYmxlQ2VsbCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImJvb2wiLCJpc1JlcXVpcmVkIiwibm9kZSIsIm9uZU9mIiwib25lT2ZUeXBlIiwic3RyaW5nIiwibnVtYmVyIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7SUFFTUEsWTs7Ozs7Ozs7Ozs7Ozs7Ozs7d0ZBa0RJO0FBQ05DLE1BQUFBLEtBQUssRUFBRSxNQUFLQyxLQUFMLENBQVdDLFFBRFo7QUFFTkMsTUFBQUEsU0FBUyxFQUFFLE1BQUtGLEtBQUwsQ0FBV0c7QUFGaEIsSzs0RkFLSSxVQUFBQyxHQUFHLEVBQUk7QUFDakIsWUFBS0MsT0FBTCxHQUFlRCxHQUFmO0FBQ0QsSzsrRkFFYyxVQUFB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QUVWOzs7QUFHQTNCLEVBQUFBLFFBQVEsRUFBRW9CLG1CQUFVUSxJOztBQUVwQjs7O0FBR0ExQyxFQUFBQSxTQUFTLEVBQUVrQyxtQkFBVUM7OzhCQXpDbkJ4QyxZLGtCQTRDa0I7QUFDcEJzQixFQUFBQSxJQUFJLEVBQUUsR0FEYztBQUVwQlosRUFBQUEsWUFBWSxFQUFFLElBRk07QUFHcEJMLEVBQUFBLFNBQVMsRUFBRTtBQUhTLEM7O2VBZ0lULHNCQUFVTCxZQUFWLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgeyB3aXRoVGhlbWUgfSBmcm9tICcuLi8uLi90aGVtZSdcbmltcG9ydCB7IFBvcnRhbCB9IGZyb20gJy4uLy4uL3BvcnRhbCdcbmltcG9ydCB7IFN0YWNrIH0gZnJvbSAnLi4vLi4vc3RhY2snXG5pbXBvcnQgc2FmZUludm9rZSBmcm9tICcuLi8uLi9saWIvc2FmZS1pbnZva2UnXG5pbXBvcnQgVGV4dFRhYmxlQ2VsbCBmcm9tICcuL1RleHRUYWJsZUNlbGwnXG5pbXBvcnQgVGFibGVDZWxsIGZyb20gJy4vVGFibGVDZWxsJ1xuaW1wb3J0IEVkaXRhYmxlQ2VsbEZpZWxkIGZyb20gJy4vRWRpdGFibGVDZWxsRmllbGQnXG5cbmNsYXNzIEVkaXRhYmxlQ2VsbCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIC8qKlxuICAgICAqIENvbXBvc2VzIHRoZSBUYWJsZUNlbGwgY29tcG9uZW50IGFzIHRoZSBiYXNlLlxuICAgICAqL1xuICAgIC4uLlRhYmxlQ2VsbC5wcm9wVHlwZXMsXG5cbiAgICAvKlxuICAgICogTWFrZXMgdGhlIFRhYmxlQ2VsbCBmb2N1c2FibGUuXG4gICAgKiBXaWxsIGFkZCB0YWJJbmRleD17LTEgfHwgdGhpcy5wcm9wcy50YWJJbmRleH0uXG4gICAgKi9cbiAgICBpc1NlbGVjdGFibGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRydWUsIHRoZSBjZWxsIGNhbid0IGJlIGVkaXRlZC5cbiAgICAgKi9cbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvKipcbiAgICAgKiBPcHRpb25hbCBwbGFjZWhvbGRlciB3aGVuIGNoaWxkcmVuIGlzIGZhbHN5LlxuICAgICAqL1xuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMubm9kZSxcblxuICAgIC8qKlxuICAgICAqIFRoZSBzaXplIHVzZWQgZm9yIHRoZSBUZXh0VGFibGVDZWxsIGFuZCBUZXh0YXJlYS5cbiAgICAgKi9cbiAgICBzaXplOiBQcm9wVHlwZXMub25lT2YoWzMwMCwgNDAwXSkuaXNSZXF1aXJlZCxcblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgdGhlIHZhbHVlIG9mIHRoZSBjZWxsLlxuICAgICAqL1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSksXG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiBjYWxsZWQgd2hlbiB2YWx1ZSBjaGFuZ2VzLiAodmFsdWU6IHN0cmluZykgPT4gdm9pZC5cbiAgICAgKi9cbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRydWUsIHRoZSBjZWxsIHdpbGwgaW5pdGlhbGl6ZSBpbiB0aGUgZWRpdGluZyBzdGF0ZS5cbiAgICAgKi9cbiAgICBhdXRvRm9jdXM6IFByb3BUeXBlcy5ib29sXG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHNpemU6IDMwMCxcbiAgICBpc1NlbGVjdGFibGU6IHRydWUsXG4gICAgYXV0b0ZvY3VzOiBmYWxzZVxuICB9XG5cbiAgc3RhdGUgPSB7XG4gICAgdmFsdWU6IHRoaXMucHJvcHMuY2hpbGRyZW4sXG4gICAgaXNFZGl0aW5nOiB0aGlzLnByb3BzLmF1dG9Gb2N1c1xuICB9XG5cbiAgb25NYWluUmVmID0gcmVmID0+IHtcbiAgICB0aGlzLm1haW5SZWYgPSByZWZcbiAgfVxuXG4gIG9uT3ZlcmxheVJlZiA9IHJlZiA9PiB7XG4gICAgdGhpcy5vdmVybGF5UmVmID0gcmVmXG4gIH1cblxuICBoYW5kbGVEb3VibGVDbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCB8fCAhdGhpcy5wcm9wcy5pc1NlbGVjdGFibGUpIHJldHVyblxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpc0VkaXRpbmc6IHRydWVcbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlS2V5RG93biA9IGUgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSByZXR1cm5cbiAgICBjb25zdCB7IGtleSB9ID0gZVxuXG4gICAgLyoqXG4gICAgICogV2hlbiB0aGUgdXNlciBwcmVzc2VzIGEgY2hhcmFjdGVyIG9uIHRoZSBrZXlib2FyZCwgdXNlIHRoYXQgY2hhcmFjdGVyXG4gICAgICogYXMgdGhlIHZhbHVlIGluIHRoZSB0ZXh0IGZpZWxkLlxuICAgICAqL1xuICAgIGlmIChrZXkgPT09ICdFbnRlcicgfHwga2V5ID09PSAnU2hpZnQnKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaXNFZGl0aW5nOiB0cnVlXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICBrZXkubWF0Y2goL15bYS16XXswLDEwfSQvKSAmJlxuICAgICAgIWUubWV0YUtleSAmJlxuICAgICAgIWUuY3RybEtleSAmJlxuICAgICAgIWUuYWx0S2V5XG4gICAgKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHByZXZTdGF0ZSA9PiAoe1xuICAgICAgICBpc0VkaXRpbmc6IHRydWUsXG4gICAgICAgIHZhbHVlOiBwcmV2U3RhdGUudmFsdWUgKyBrZXlcbiAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZpZWxkQ2hhbmdlQ29tcGxldGUgPSB2YWx1ZSA9PiB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgaXNTZWxlY3RhYmxlIH0gPSB0aGlzLnByb3BzXG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzRWRpdGluZzogZmFsc2UsXG4gICAgICB2YWx1ZVxuICAgIH0pXG5cbiAgICBzYWZlSW52b2tlKG9uQ2hhbmdlLCB2YWx1ZSlcblxuICAgIGlmICh0aGlzLm1haW5SZWYgJiYgaXNTZWxlY3RhYmxlKSB7XG4gICAgICB0aGlzLm1haW5SZWYuZm9jdXMoKVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZpZWxkQ2FuY2VsID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc0VkaXRpbmc6IGZhbHNlIH0pXG4gIH1cblxuICBoYW5kbGVDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLm1haW5SZWYuZm9jdXMoKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgdGhlbWUsXG4gICAgICBzaXplLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICBwbGFjZWhvbGRlcixcbiAgICAgIGlzU2VsZWN0YWJsZSxcbiAgICAgIHRleHRQcm9wcyA9IHt9LFxuICAgICAgLi4ucHJvcHNcbiAgICB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHsgaXNFZGl0aW5nLCB2YWx1ZSB9ID0gdGhpcy5zdGF0ZVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPFRleHRUYWJsZUNlbGxcbiAgICAgICAgICBpbm5lclJlZj17dGhpcy5vbk1haW5SZWZ9XG4gICAgICAgICAgaXNTZWxlY3RhYmxlPXtpc1NlbGVjdGFibGV9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgICBvbkRvdWJsZUNsaWNrPXt0aGlzLmhhbmRsZURvdWJsZUNsaWNrfVxuICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgIGN1cnNvcj17ZGlzYWJsZWQgPyAnbm90LWFsbG93ZWQnIDogaXNTZWxlY3RhYmxlID8gJ2RlZmF1bHQnIDogJ3RleHQnfVxuICAgICAgICAgIHRleHRQcm9wcz17e1xuICAgICAgICAgICAgc2l6ZSxcbiAgICAgICAgICAgIG9wYWNpdHk6IGRpc2FibGVkIHx8ICghY2hpbGRyZW4gJiYgcGxhY2Vob2xkZXIpID8gMC41IDogMSxcbiAgICAgICAgICAgIC4uLnRleHRQcm9wc1xuICAgICAgICAgIH19XG4gICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICA+XG4gICAgICAgICAge2NoaWxkcmVuID8gY2hpbGRyZW4gOiBwbGFjZWhvbGRlcn1cbiAgICAgICAgPC9UZXh0VGFibGVDZWxsPlxuICAgICAgICB7aXNFZGl0aW5nICYmIChcbiAgICAgICAgICA8UG9ydGFsPlxuICAgICAgICAgICAgPFN0YWNrPlxuICAgICAgICAgICAgICB7ekluZGV4ID0+IChcbiAgICAgICAgICAgICAgICA8RWRpdGFibGVDZWxsRmllbGRcbiAgICAgICAgICAgICAgICAgIHpJbmRleD17ekluZGV4fVxuICAgICAgICAgICAgICAgICAgZ2V0VGFyZ2V0UmVmPXsoKSA9PiB0aGlzLm1haW5SZWZ9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgICBvbkVzY2FwZT17dGhpcy5oYW5kbGVGaWVsZEVzY2FwZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlQ29tcGxldGU9e3RoaXMuaGFuZGxlRmllbGRDaGFuZ2VDb21wbGV0ZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2FuY2VsPXt0aGlzLmhhbmRsZUZpZWxkQ2FuY2VsfVxuICAgICAgICAgICAgICAgICAgc2l6ZT17c2l6ZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9TdGFjaz5cbiAgICAgICAgICA8L1BvcnRhbD5cbiAgICAgICAgKX1cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhUaGVtZShFZGl0YWJsZUNlbGwpXG4iXX0=