"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _textarea = require("../../textarea");

var EditableCellField =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inherits2.default)(EditableCellField, _React$PureComponent);

  function EditableCellField() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, EditableCellField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(EditableCellField)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      top: 0,
      left: 0,
      height: 0,
      width: 0
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getTableBodyRef", function (targetRef) {
      if (_this.tableBodyRef) return _this.tableBodyRef;
      var ref = targetRef;

      while (ref) {
        var isTableBody = ref.hasAttribute('data-evergreen-table-body');

        if (isTableBody) {
          return ref;
        }

        if (ref.parentElement) {
          ref = ref.parentElement;
        } else {
          return null;
        }
      }

      _this.tableBodyRef = ref;
      return _this.tableBodyRef;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "update", function () {
      var getTargetRef = _this.props.getTargetRef;
      var targetRef = getTargetRef();
      if (!targetRef) return;

      var tableBodyRef = _this.getTableBodyRef(targetRef);

      var _targetRef$getBoundin = targetRef.getBoundingClientRect(),
          left = _targetRef$getBoundin.left,
          targetTop = _targetRef$getBoundin.top,
          height = _targetRef$getBoundin.height,
          width = _targetRef$getBoundin.width;

      var top;

      if (tableBodyRef) {
        var bounds = tableBodyRef.getBoundingClientRect();
        top = Math.min(Math.max(targetTop, bounds.top), bounds.bottom - height);
      } else {
        top = targetTop;
      }

      _this.setState(function () {
        return {
          left: left,
          top: top,
          height: height,
          width: width
        };
      }, function () {
        _this.latestAnimationFrame = requestAnimationFrame(function () {
          _this.update();
        });
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onRef", function (ref) {
      _this.textareaRef = ref;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleBlur", function () {
      if (_this.textareaRef) _this.props.onChangeComplete(_this.textareaRef.value);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleKeyDown", function (e) {
      switch (e.key) {
        case 'Escape':
          _this.props.onCancel();

          _this.textareaRef.blur();

          break;

        case 'Enter':
          _this.textareaRef.blur();

          e.preventDefault();
          break;

        case 'Tab':
          _this.textareaRef.blur();

          break;

        default:
          break;
      }
    });
    return _this;
  }

  (0, _createClass2.default)(EditableCellField, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.update();
      requestAnimationFrame(function () {
        _this2.textareaRef.focus();
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      cancelAnimationFrame(this.latestAnimationFrame);
      this.props.onCancel();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          size = _this$props.size,
          value = _this$props.value,
          minWidth = _this$props.minWidth,
          minHeight = _this$props.minHeight,
          zIndex = _this$props.zIndex;
      var _this$state = this.state,
          left = _this$state.left,
          top = _this$state.top,
          height = _this$state.height,
          width = _this$state.width;
      return _react.default.createElement(_textarea.Textarea, {
        innerRef: this.onRef,
        onKeyDown: this.handleKeyDown,
        onBlur: this.handleBlur,
        appearance: "editable-cell",
        size: size,
        style: {
          left: left,
          top: top,
          height: height,
          minHeight: Math.max(height, minHeight),
          width: width,
          minWidth: Math.max(width, minWidth),
          zIndex: zIndex
        },
        height: null,
        width: null,
        minHeight: null,
        position: "fixed",
        defaultValue: value
      });
    }
  }]);
  return EditableCellField;
}(_react.default.PureComponent);

exports.default = EditableCellField;
EditableCellField.displayName = "EditableCellField";
(0, _defineProperty2.default)(EditableCellField, "propTypes", {
  /**
   * Used as the defaultValue of the textarea.
   */
  value: _propTypes.default.string.isRequired,

  /**
   * The z-index placed on the element.
   */
  zIndex: _propTypes.default.number.isRequired,

  /**
   * Function to get the target ref of the parent.
   * Used to mirror the position.
   */
  getTargetRef: _propTypes.default.func.isRequired,

  /**
   * Min width of the textarea.
   * The textarea can never be smaller than the cell.
   */
  minWidth: _propTypes.default.number.isRequired,

  /**
   * Min height of the textarea.
   * The textarea can never be smaller than the cell.
   */
  minHeight: _propTypes.default.number.isRequired,

  /**
   * Called when the textarea is blurred, pass the value back to the cell.
   */
  onChangeComplete: _propTypes.default.func.isRequired,

  /**
   * Called when Escape is hit or componentWillUnmount.
   */
  onCancel: _propTypes.default.func.isRequired,

  /**
   * Text size of the textarea.
   */
  size: _propTypes.default.number
});
(0, _defineProperty2.default)(EditableCellField, "defaultProps", {
  minWidth: 80,
  minHeight: 40
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90YWJsZS9zcmMvRWRpdGFibGVDZWxsRmllbGQuanMiXSwibmFtZXMiOlsiRWRpdGFibGVDZWxsRmllbGQiLCJ0b3AiLCJsZWZ0IiwiaGVpZ2h0Iiwid2lkdGgiLCJ0YXJnZXRSZWYiLCJ0YWJsZUJvZHlSZWYiLCJyZWYiLCJpc1RhYmxlQm9keSIsImhhc0F0dHJpYnV0ZSIsInBhcmVudEVsZW1lbnQiLCJnZXRUYXJnZXRSZWYiLCJwcm9wcyIsImdldFRhYmxlQm9keVJlZiIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRhcmdldFRvcCIsImJvdW5kcyIsIk1hdGgiLCJtaW4iLCJtYXgiLCJib3R0b20iLCJzZXRTdGF0ZSIsImxhdGVzdEFuaW1hdGlvbkZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidXBkYXRlIiwidGV4dGFyZWFSZWYiLCJvbkNoYW5nZUNvbXBsZXRlIiwidmFsdWUiLCJlIiwia2V5Iiwib25DYW5jZWwiLCJibHVyIiwicHJldmVudERlZmF1bHQiLCJmb2N1cyIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwic2l6ZSIsIm1pbldpZHRoIiwibWluSGVpZ2h0IiwiekluZGV4Iiwic3RhdGUiLCJvblJlZiIsImhhbmRsZUtleURvd24iLCJoYW5kbGVCbHVyIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsIm51bWJlciIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0lBRXFCQSxpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7d0ZBbURYO0FBQ05DLE1BQUFBLEdBQUcsRUFBRSxDQURDO0FBRU5DLE1BQUFBLElBQUksRUFBRSxDQUZBO0FBR05DLE1BQUFBLE1BQU0sRUFBRSxDQUhGO0FBSU5DLE1BQUFBLEtBQUssRUFBRTtBQUpELEs7a0dBb0JVLFVBQUFDLFNBQVMsRUFBSTtBQUM3QixVQUFJLE1BQUtD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UUFBQSxLQUFLLEVBQUUsSUFoQlQ7QUFpQkUsUUFBQSxTQUFTLEVBQUUsSUFqQmI7QUFrQkUsUUFBQSxRQUFRLEVBQUMsT0FsQlg7QUFtQkUsUUFBQSxZQUFZLEVBQUVYO0FBbkJoQixRQURGO0FBdUJEOzs7RUF2TDRDZ0IsZUFBTUMsYTs7O0FBQWhDNUMsaUI7OEJBQUFBLGlCLGVBQ0E7QUFDakI7OztBQUdBMkIsRUFBQUEsS0FBSyxFQUFFa0IsbUJBQVVDLE1BQVYsQ0FBaUJDLFVBSlA7O0FBTWpCOzs7QUFHQVQsRUFBQUEsTUFBTSxFQUFFTyxtQkFBVUcsTUFBVixDQUFpQkQsVUFUUjs7QUFXakI7Ozs7QUFJQXBDLEVBQUFBLFlBQVksRUFBRWtDLG1CQUFVSSxJQUFWLENBQWVGLFVBZlo7O0FBaUJqQjs7OztBQUlBWCxFQUFBQSxRQUFRLEVBQUVTLG1CQUFVRyxNQUFWLENBQWlCRCxVQXJCVjs7QUF1QmpCOzs7O0FBSUFWLEVBQUFBLFNBQVMsRUFBRVEsbUJBQVVHLE1BQVYsQ0FBaUJELFVBM0JYOztBQTZCakI7OztBQUdBckIsRUFBQUEsZ0JBQWdCLEVBQUVtQixtQkFBVUksSUFBVixDQUFlRixVQWhDaEI7O0FBa0NqQjs7O0FBR0FqQixFQUFBQSxRQUFRLEVBQUVlLG1CQUFVSSxJQUFWLENBQWVGLFVBckNSOztBQXVDakI7OztBQUdBWixFQUFBQSxJQUFJLEVBQUVVLG1CQUFVRztBQTFDQyxDOzhCQURBaEQsaUIsa0JBOENHO0FBQ3BCb0MsRUFBQUEsUUFBUSxFQUFFLEVBRFU7QUFFcEJDLEVBQUFBLFNBQVMsRUFBRTtBQUZTLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgeyBUZXh0YXJlYSB9IGZyb20gJy4uLy4uL3RleHRhcmVhJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0YWJsZUNlbGxGaWVsZCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIC8qKlxuICAgICAqIFVzZWQgYXMgdGhlIGRlZmF1bHRWYWx1ZSBvZiB0aGUgdGV4dGFyZWEuXG4gICAgICovXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblxuICAgIC8qKlxuICAgICAqIFRoZSB6LWluZGV4IHBsYWNlZCBvbiB0aGUgZWxlbWVudC5cbiAgICAgKi9cbiAgICB6SW5kZXg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIGdldCB0aGUgdGFyZ2V0IHJlZiBvZiB0aGUgcGFyZW50LlxuICAgICAqIFVzZWQgdG8gbWlycm9yIHRoZSBwb3NpdGlvbi5cbiAgICAgKi9cbiAgICBnZXRUYXJnZXRSZWY6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgICAvKipcbiAgICAgKiBNaW4gd2lkdGggb2YgdGhlIHRleHRhcmVhLlxuICAgICAqIFRoZSB0ZXh0YXJlYSBjYW4gbmV2ZXIgYmUgc21hbGxlciB0aGFuIHRoZSBjZWxsLlxuICAgICAqL1xuICAgIG1pbldpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgICAvKipcbiAgICAgKiBNaW4gaGVpZ2h0IG9mIHRoZSB0ZXh0YXJlYS5cbiAgICAgKiBUaGUgdGV4dGFyZWEgY2FuIG5ldmVyIGJlIHNtYWxsZXIgdGhhbiB0aGUgY2VsbC5cbiAgICAgKi9cbiAgICBtaW5IZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIHRoZSB0ZXh0YXJlYSBpcyBibHVycmVkLCBwYXNzIHRoZSB2YWx1ZSBiYWNrIHRvIHRoZSBjZWxsLlxuICAgICAqL1xuICAgIG9uQ2hhbmdlQ29tcGxldGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBFc2NhcGUgaXMgaGl0IG9yIGNvbXBvbmVudFdpbGxVbm1vdW50LlxuICAgICAqL1xuICAgIG9uQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gICAgLyoqXG4gICAgICogVGV4dCBzaXplIG9mIHRoZSB0ZXh0YXJlYS5cbiAgICAgKi9cbiAgICBzaXplOiBQcm9wVHlwZXMubnVtYmVyXG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIG1pbldpZHRoOiA4MCxcbiAgICBtaW5IZWlnaHQ6IDQwXG4gIH1cblxuICBzdGF0ZSA9IHtcbiAgICB0b3A6IDAsXG4gICAgbGVmdDogMCxcbiAgICBoZWlnaHQ6IDAsXG4gICAgd2lkdGg6IDBcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMudXBkYXRlKClcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnRleHRhcmVhUmVmLmZvY3VzKClcbiAgICB9KVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXRlc3RBbmltYXRpb25GcmFtZSlcbiAgICB0aGlzLnByb3BzLm9uQ2FuY2VsKClcbiAgfVxuXG4gIGdldFRhYmxlQm9keVJlZiA9IHRhcmdldFJlZiA9PiB7XG4gICAgaWYgKHRoaXMudGFibGVCb2R5UmVmKSByZXR1cm4gdGhpcy50YWJsZUJvZHlSZWZcblxuICAgIGxldCByZWYgPSB0YXJnZXRSZWZcbiAgICB3aGlsZSAocmVmKSB7XG4gICAgICBjb25zdCBpc1RhYmxlQm9keSA9IHJlZi5oYXNBdHRyaWJ1dGUoJ2RhdGEtZXZlcmdyZWVuLXRhYmxlLWJvZHknKVxuICAgICAgaWYgKGlzVGFibGVCb2R5KSB7XG4gICAgICAgIHJldHVybiByZWZcbiAgICAgIH1cblxuICAgICAgaWYgKHJlZi5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgIHJlZiA9IHJlZi5wYXJlbnRFbGVtZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudGFibGVCb2R5UmVmID0gcmVmXG4gICAgcmV0dXJuIHRoaXMudGFibGVCb2R5UmVmXG4gIH1cblxuICB1cGRhdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBnZXRUYXJnZXRSZWYgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB0YXJnZXRSZWYgPSBnZXRUYXJnZXRSZWYoKVxuICAgIGlmICghdGFyZ2V0UmVmKSByZXR1cm5cbiAgICBjb25zdCB0YWJsZUJvZHlSZWYgPSB0aGlzLmdldFRhYmxlQm9keVJlZih0YXJnZXRSZWYpXG5cbiAgICBjb25zdCB7XG4gICAgICBsZWZ0LFxuICAgICAgdG9wOiB0YXJnZXRUb3AsXG4gICAgICBoZWlnaHQsXG4gICAgICB3aWR0aFxuICAgIH0gPSB0YXJnZXRSZWYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgIGxldCB0b3BcbiAgICBpZiAodGFibGVCb2R5UmVmKSB7XG4gICAgICBjb25zdCBib3VuZHMgPSB0YWJsZUJvZHlSZWYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgIHRvcCA9IE1hdGgubWluKE1hdGgubWF4KHRhcmdldFRvcCwgYm91bmRzLnRvcCksIGJvdW5kcy5ib3R0b20gLSBoZWlnaHQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRvcCA9IHRhcmdldFRvcFxuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbGVmdCxcbiAgICAgICAgICB0b3AsXG4gICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgIHdpZHRoXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMubGF0ZXN0QW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMudXBkYXRlKClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICApXG4gIH1cblxuICBvblJlZiA9IHJlZiA9PiB7XG4gICAgdGhpcy50ZXh0YXJlYVJlZiA9IHJlZlxuICB9XG5cbiAgaGFuZGxlQmx1ciA9ICgpID0+IHtcbiAgICBpZiAodGhpcy50ZXh0YXJlYVJlZikgdGhpcy5wcm9wcy5vbkNoYW5nZUNvbXBsZXRlKHRoaXMudGV4dGFyZWFSZWYudmFsdWUpXG4gIH1cblxuICBoYW5kbGVLZXlEb3duID0gZSA9PiB7XG4gICAgc3dpdGNoIChlLmtleSkge1xuICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNhbmNlbCgpXG4gICAgICAgIHRoaXMudGV4dGFyZWFSZWYuYmx1cigpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgIHRoaXMudGV4dGFyZWFSZWYuYmx1cigpXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgdGhpcy50ZXh0YXJlYVJlZi5ibHVyKClcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgc2l6ZSwgdmFsdWUsIG1pbldpZHRoLCBtaW5IZWlnaHQsIHpJbmRleCB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHsgbGVmdCwgdG9wLCBoZWlnaHQsIHdpZHRoIH0gPSB0aGlzLnN0YXRlXG5cbiAgICByZXR1cm4gKFxuICAgICAgPFRleHRhcmVhXG4gICAgICAgIGlubmVyUmVmPXt0aGlzLm9uUmVmfVxuICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn1cbiAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZUJsdXJ9XG4gICAgICAgIGFwcGVhcmFuY2U9XCJlZGl0YWJsZS1jZWxsXCJcbiAgICAgICAgc2l6ZT17c2l6ZX1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBsZWZ0LFxuICAgICAgICAgIHRvcCxcbiAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgbWluSGVpZ2h0OiBNYXRoLm1heChoZWlnaHQsIG1pbkhlaWdodCksXG4gICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgbWluV2lkdGg6IE1hdGgubWF4KHdpZHRoLCBtaW5XaWR0aCksXG4gICAgICAgICAgekluZGV4XG4gICAgICAgIH19XG4gICAgICAgIGhlaWdodD17bnVsbH1cbiAgICAgICAgd2lkdGg9e251bGx9XG4gICAgICAgIG1pbkhlaWdodD17bnVsbH1cbiAgICAgICAgcG9zaXRpb249XCJmaXhlZFwiXG4gICAgICAgIGRlZmF1bHRWYWx1ZT17dmFsdWV9XG4gICAgICAvPlxuICAgIClcbiAgfVxufVxuIl19