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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _toaster = require("../../toaster");

var _theme = require("../../theme");

var _layers = require("../../layers");

var _safeInvoke = _interopRequireDefault(require("../../lib/safe-invoke"));

var _TableRowContext = require("./TableRowContext");

var _manageTableCellFocusInteraction = _interopRequireDefault(require("./manageTableCellFocusInteraction"));

function executeArrowKeyOverride(override) {
  if (!override) {
    return;
  }

  if (typeof override === 'function') {
    override();
    return;
  }

  if (typeof override === 'string') {
    document.querySelector(override).focus();
    return;
  } // This needs to be the node, not a React ref.


  override.focus();
}

var TableCell =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(TableCell, _PureComponent);

  function TableCell() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, TableCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(TableCell)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleKeyDown", function (e) {
      var _this$props$arrowKeys = _this.props.arrowKeysOverrides,
          arrowKeysOverrides = _this$props$arrowKeys === void 0 ? {} : _this$props$arrowKeys;

      if (_this.props.isSelectable) {
        var key = e.key;

        if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
          e.preventDefault();

          try {
            // Support arrow key overrides.
            var override = arrowKeysOverrides[key.substr('Arrow'.length).toLowerCase()];
            if (override === false) return;
            if (override) return executeArrowKeyOverride(override);
            (0, _manageTableCellFocusInteraction.default)(key, _this.mainRef);
          } catch (error) {
            _toaster.toaster.danger('Keyboard interaction not possible');

            console.error('Keyboard interaction not possible', error);
          }
        } else if (key === 'Escape') {
          _this.mainRef.blur();
        }
      }

      (0, _safeInvoke.default)(_this.props.onKeyDown, e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onRef", function (ref) {
      _this.mainRef = ref;
      (0, _safeInvoke.default)(_this.props.innerRef, ref);
    });
    return _this;
  }

  (0, _createClass2.default)(TableCell, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          innerRef = _this$props.innerRef,
          theme = _this$props.theme,
          children = _this$props.children,
          appearance = _this$props.appearance,
          onClick = _this$props.onClick,
          onKeyPress = _this$props.onKeyPress,
          onKeyDown = _this$props.onKeyDown,
          isSelectable = _this$props.isSelectable,
          _this$props$tabIndex = _this$props.tabIndex,
          tabIndex = _this$props$tabIndex === void 0 ? -1 : _this$props$tabIndex,
          className = _this$props.className,
          rightView = _this$props.rightView,
          arrowKeysOverrides = _this$props.arrowKeysOverrides,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["innerRef", "theme", "children", "appearance", "onClick", "onKeyPress", "onKeyDown", "isSelectable", "tabIndex", "className", "rightView", "arrowKeysOverrides"]);
      var themedClassName = theme.getTableCellClassName(appearance);
      return _react.default.createElement(_TableRowContext.TableRowConsumer, null, function (height) {
        return _react.default.createElement(_layers.Pane, (0, _extends2.default)({
          innerRef: _this2.onRef,
          height: height,
          className: (0, _classnames.default)(themedClassName, className),
          tabIndex: isSelectable ? tabIndex : undefined,
          "data-isselectable": isSelectable,
          onClick: onClick,
          onKeyDown: _this2.handleKeyDown
        }, TableCell.styles, props), children, rightView ? rightView : null);
      });
    }
  }]);
  return TableCell;
}(_react.PureComponent);

TableCell.displayName = "TableCell";
(0, _defineProperty2.default)(TableCell, "propTypes", (0, _objectSpread2.default)({}, _layers.Pane.propTypes, {
  /*
   * Makes the TableCell focusable. Used by EditableCell.
   * Will add tabIndex={-1 || this.props.tabIndex}.
   */
  isSelectable: _propTypes.default.bool,

  /**
   * The appearance of the table row. Default theme only support default.
   */
  appearance: _propTypes.default.string.isRequired,

  /**
   * Optional node to be placed on the right side of the table cell.
   * Useful for icons and icon buttons.
   */
  rightView: _propTypes.default.node,

  /**
   * Theme provided by ThemeProvider.
   */
  theme: _propTypes.default.object.isRequired,

  /**
   * Advanced arrow keys overrides for selectable cells.
   * A string will be used as a selector.
   */
  arrowKeysOverrides: _propTypes.default.shape({
    up: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func, _propTypes.default.element, _propTypes.default.oneOf([false])]),
    down: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func, _propTypes.default.element, _propTypes.default.oneOf([false])]),
    left: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func, _propTypes.default.element, _propTypes.default.oneOf([false])]),
    right: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func, _propTypes.default.element, _propTypes.default.oneOf([false])])
  }),

  /**
   * Class name passed to the table cell.
   * Only use if you know what you are doing.
   */
  className: _propTypes.default.string
}));
(0, _defineProperty2.default)(TableCell, "defaultProps", {
  appearance: 'default'
});
(0, _defineProperty2.default)(TableCell, "styles", {
  paddingX: 12,
  boxSizing: 'border-box',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  overflow: 'hidden'
});

var _default = (0, _theme.withTheme)(TableCell);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90YWJsZS9zcmMvVGFibGVDZWxsLmpzIl0sIm5hbWVzIjpbImV4ZWN1dGVBcnJvd0tleU92ZXJyaWRlIiwib3ZlcnJpZGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJmb2N1cyIsIlRhYmxlQ2VsbCIsImUiLCJwcm9wcyIsImFycm93S2V5c092ZXJyaWRlcyIsImlzU2VsZWN0YWJsZSIsImtleSIsInByZXZlbnREZWZhdWx0Iiwic3Vic3RyIiwibGVuZ3RoIiwidG9Mb3dlckNhc2UiLCJtYWluUmVmIiwiZXJyb3IiLCJ0b2FzdGVyIiwiZGFuZ2VyIiwiY29uc29sZSIsImJsdXIiLCJvbktleURvd24iLCJyZWYiLCJpbm5lclJlZiIsInRoZW1lIiwiY2hpbGRyZW4iLCJhcHBlYXJhbmNlIiwib25DbGljayIsIm9uS2V5UHJlc3MiLCJ0YWJJbmRleCIsImNsYXNzTmFtZSIsInJpZ2h0VmlldyIsInRoZW1lZENsYXNzTmFtZSIsImdldFRhYmxlQ2VsbENsYXNzTmFtZSIsImhlaWdodCIsIm9uUmVmIiwidW5kZWZpbmVkIiwiaGFuZGxlS2V5RG93biIsInN0eWxlcyIsIlB1cmVDb21wb25lbnQiLCJQYW5lIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiYm9vbCIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJub2RlIiwib2JqZWN0Iiwic2hhcGUiLCJ1cCIsIm9uZU9mVHlwZSIsImZ1bmMiLCJlbGVtZW50Iiwib25lT2YiLCJkb3duIiwibGVmdCIsInJpZ2h0IiwicGFkZGluZ1giLCJib3hTaXppbmciLCJmbGV4IiwiZGlzcGxheSIsImFsaWduSXRlbXMiLCJmbGV4U2hyaW5rIiwib3ZlcmZsb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSxTQUFTQSx1QkFBVCxDQUFpQ0MsUUFBakMsRUFB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QUFVUSxTQUFWLENBQW9CLENBQ3hCUixtQkFBVUUsTUFEYyxFQUV4QkYsbUJBQVVTLElBRmMsRUFHeEJULG1CQUFVVSxPQUhjLEVBSXhCVixtQkFBVVcsS0FBVixDQUFnQixDQUFDLEtBQUQsQ0FBaEIsQ0FKd0IsQ0FBcEIsQ0FiNEI7QUFtQmxDRyxJQUFBQSxLQUFLLEVBQUVkLG1CQUFVUSxTQUFWLENBQW9CLENBQ3pCUixtQkFBVUUsTUFEZSxFQUV6QkYsbUJBQVVTLElBRmUsRUFHekJULG1CQUFVVSxPQUhlLEVBSXpCVixtQkFBVVcsS0FBVixDQUFnQixDQUFDLEtBQUQsQ0FBaEIsQ0FKeUIsQ0FBcEI7QUFuQjJCLEdBQWhCLEM7O0FBMkJwQjs7OztBQUlBdkIsRUFBQUEsU0FBUyxFQUFFWSxtQkFBVUU7OzhCQWhFbkJ2QyxTLGtCQW1Fa0I7QUFDcEJxQixFQUFBQSxVQUFVLEVBQUU7QUFEUSxDOzhCQW5FbEJyQixTLFlBdUVZO0FBQ2RvRCxFQUFBQSxRQUFRLEVBQUUsRUFESTtBQUVkQyxFQUFBQSxTQUFTLEVBQUUsWUFGRztBQUdkQyxFQUFBQSxJQUFJLEVBQUUsQ0FIUTtBQUlkQyxFQUFBQSxPQUFPLEVBQUUsTUFKSztBQUtkQyxFQUFBQSxVQUFVLEVBQUUsUUFMRTtBQU1kQyxFQUFBQSxVQUFVLEVBQUUsQ0FORTtBQU9kQyxFQUFBQSxRQUFRLEVBQUU7QUFQSSxDOztlQTJGSCxzQkFBVTFELFNBQVYsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcydcbmltcG9ydCB7IHRvYXN0ZXIgfSBmcm9tICcuLi8uLi90b2FzdGVyJ1xuaW1wb3J0IHsgd2l0aFRoZW1lIH0gZnJvbSAnLi4vLi4vdGhlbWUnXG5pbXBvcnQgeyBQYW5lIH0gZnJvbSAnLi4vLi4vbGF5ZXJzJ1xuaW1wb3J0IHNhZmVJbnZva2UgZnJvbSAnLi4vLi4vbGliL3NhZmUtaW52b2tlJ1xuaW1wb3J0IHsgVGFibGVSb3dDb25zdW1lciB9IGZyb20gJy4vVGFibGVSb3dDb250ZXh0J1xuaW1wb3J0IG1hbmFnZVRhYmxlQ2VsbEZvY3VzSW50ZXJhY3Rpb24gZnJvbSAnLi9tYW5hZ2VUYWJsZUNlbGxGb2N1c0ludGVyYWN0aW9uJ1xuXG5mdW5jdGlvbiBleGVjdXRlQXJyb3dLZXlPdmVycmlkZShvdmVycmlkZSkge1xuICBpZiAoIW92ZXJyaWRlKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAodHlwZW9mIG92ZXJyaWRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb3ZlcnJpZGUoKVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKHR5cGVvZiBvdmVycmlkZSA9PT0gJ3N0cmluZycpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG92ZXJyaWRlKS5mb2N1cygpXG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBUaGlzIG5lZWRzIHRvIGJlIHRoZSBub2RlLCBub3QgYSBSZWFjdCByZWYuXG4gIG92ZXJyaWRlLmZvY3VzKClcbn1cblxuY2xhc3MgVGFibGVDZWxsIGV4dGVuZHMgUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLyoqXG4gICAgICogQ29tcG9zZXMgdGhlIFBhbmUgY29tcG9uZW50IGFzIHRoZSBiYXNlLlxuICAgICAqL1xuICAgIC4uLlBhbmUucHJvcFR5cGVzLFxuXG4gICAgLypcbiAgICAgKiBNYWtlcyB0aGUgVGFibGVDZWxsIGZvY3VzYWJsZS4gVXNlZCBieSBFZGl0YWJsZUNlbGwuXG4gICAgICogV2lsbCBhZGQgdGFiSW5kZXg9ey0xIHx8IHRoaXMucHJvcHMudGFiSW5kZXh9LlxuICAgICAqL1xuICAgIGlzU2VsZWN0YWJsZTogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgYXBwZWFyYW5jZSBvZiB0aGUgdGFibGUgcm93LiBEZWZhdWx0IHRoZW1lIG9ubHkgc3VwcG9ydCBkZWZhdWx0LlxuICAgICAqL1xuICAgIGFwcGVhcmFuY2U6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblxuICAgIC8qKlxuICAgICAqIE9wdGlvbmFsIG5vZGUgdG8gYmUgcGxhY2VkIG9uIHRoZSByaWdodCBzaWRlIG9mIHRoZSB0YWJsZSBjZWxsLlxuICAgICAqIFVzZWZ1bCBmb3IgaWNvbnMgYW5kIGljb24gYnV0dG9ucy5cbiAgICAgKi9cbiAgICByaWdodFZpZXc6IFByb3BUeXBlcy5ub2RlLFxuXG4gICAgLyoqXG4gICAgICogVGhlbWUgcHJvdmlkZWQgYnkgVGhlbWVQcm92aWRlci5cbiAgICAgKi9cbiAgICB0aGVtZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuXG4gICAgLyoqXG4gICAgICogQWR2YW5jZWQgYXJyb3cga2V5cyBvdmVycmlkZXMgZm9yIHNlbGVjdGFibGUgY2VsbHMuXG4gICAgICogQSBzdHJpbmcgd2lsbCBiZSB1c2VkIGFzIGEgc2VsZWN0b3IuXG4gICAgICovXG4gICAgYXJyb3dLZXlzT3ZlcnJpZGVzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgdXA6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgICAgIFByb3BUeXBlcy5vbmVPZihbZmFsc2VdKVxuICAgICAgXSksXG4gICAgICBkb3duOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIFByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgICBQcm9wVHlwZXMub25lT2YoW2ZhbHNlXSlcbiAgICAgIF0pLFxuICAgICAgbGVmdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICAgICAgUHJvcFR5cGVzLm9uZU9mKFtmYWxzZV0pXG4gICAgICBdKSxcbiAgICAgIHJpZ2h0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIFByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgICBQcm9wVHlwZXMub25lT2YoW2ZhbHNlXSlcbiAgICAgIF0pXG4gICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBDbGFzcyBuYW1lIHBhc3NlZCB0byB0aGUgdGFibGUgY2VsbC5cbiAgICAgKiBPbmx5IHVzZSBpZiB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuXG4gICAgICovXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nXG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGFwcGVhcmFuY2U6ICdkZWZhdWx0J1xuICB9XG5cbiAgc3RhdGljIHN0eWxlcyA9IHtcbiAgICBwYWRkaW5nWDogMTIsXG4gICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgZmxleDogMSxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgZmxleFNocmluazogMCxcbiAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgfVxuXG4gIGhhbmRsZUtleURvd24gPSBlID0+IHtcbiAgICBjb25zdCB7IGFycm93S2V5c092ZXJyaWRlcyA9IHt9IH0gPSB0aGlzLnByb3BzXG5cbiAgICBpZiAodGhpcy5wcm9wcy5pc1NlbGVjdGFibGUpIHtcbiAgICAgIGNvbnN0IHsga2V5IH0gPSBlXG4gICAgICBpZiAoXG4gICAgICAgIGtleSA9PT0gJ0Fycm93VXAnIHx8XG4gICAgICAgIGtleSA9PT0gJ0Fycm93RG93bicgfHxcbiAgICAgICAga2V5ID09PSAnQXJyb3dMZWZ0JyB8fFxuICAgICAgICBrZXkgPT09ICdBcnJvd1JpZ2h0J1xuICAgICAgKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFN1cHBvcnQgYXJyb3cga2V5IG92ZXJyaWRlcy5cbiAgICAgICAgICBjb25zdCBvdmVycmlkZSA9XG4gICAgICAgICAgICBhcnJvd0tleXNPdmVycmlkZXNba2V5LnN1YnN0cignQXJyb3cnLmxlbmd0aCkudG9Mb3dlckNhc2UoKV1cbiAgICAgICAgICBpZiAob3ZlcnJpZGUgPT09IGZhbHNlKSByZXR1cm5cbiAgICAgICAgICBpZiAob3ZlcnJpZGUpIHJldHVybiBleGVjdXRlQXJyb3dLZXlPdmVycmlkZShvdmVycmlkZSlcblxuICAgICAgICAgIG1hbmFnZVRhYmxlQ2VsbEZvY3VzSW50ZXJhY3Rpb24oa2V5LCB0aGlzLm1haW5SZWYpXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgdG9hc3Rlci5kYW5nZXIoJ0tleWJvYXJkIGludGVyYWN0aW9uIG5vdCBwb3NzaWJsZScpXG4gICAgICAgICAgY29uc29sZS5lcnJvcignS2V5Ym9hcmQgaW50ZXJhY3Rpb24gbm90IHBvc3NpYmxlJywgZXJyb3IpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICB0aGlzLm1haW5SZWYuYmx1cigpXG4gICAgICB9XG4gICAgfVxuXG4gICAgc2FmZUludm9rZSh0aGlzLnByb3BzLm9uS2V5RG93biwgZSlcbiAgfVxuXG4gIG9uUmVmID0gcmVmID0+IHtcbiAgICB0aGlzLm1haW5SZWYgPSByZWZcbiAgICBzYWZlSW52b2tlKHRoaXMucHJvcHMuaW5uZXJSZWYsIHJlZilcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBpbm5lclJlZixcbiAgICAgIHRoZW1lLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBhcHBlYXJhbmNlLFxuICAgICAgb25DbGljayxcbiAgICAgIG9uS2V5UHJlc3MsXG4gICAgICBvbktleURvd24sXG4gICAgICBpc1NlbGVjdGFibGUsXG4gICAgICB0YWJJbmRleCA9IC0xLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgcmlnaHRWaWV3LFxuICAgICAgYXJyb3dLZXlzT3ZlcnJpZGVzLFxuICAgICAgLi4ucHJvcHNcbiAgICB9ID0gdGhpcy5wcm9wc1xuXG4gICAgY29uc3QgdGhlbWVkQ2xhc3NOYW1lID0gdGhlbWUuZ2V0VGFibGVDZWxsQ2xhc3NOYW1lKGFwcGVhcmFuY2UpXG5cbiAgICByZXR1cm4gKFxuICAgICAgPFRhYmxlUm93Q29uc3VtZXI+XG4gICAgICAgIHtoZWlnaHQgPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UGFuZVxuICAgICAgICAgICAgICBpbm5lclJlZj17dGhpcy5vblJlZn1cbiAgICAgICAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3godGhlbWVkQ2xhc3NOYW1lLCBjbGFzc05hbWUpfVxuICAgICAgICAgICAgICB0YWJJbmRleD17aXNTZWxlY3RhYmxlID8gdGFiSW5kZXggOiB1bmRlZmluZWR9XG4gICAgICAgICAgICAgIGRhdGEtaXNzZWxlY3RhYmxlPXtpc1NlbGVjdGFibGV9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICB7Li4uVGFibGVDZWxsLnN0eWxlc31cbiAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICAgIHtyaWdodFZpZXcgPyByaWdodFZpZXcgOiBudWxsfVxuICAgICAgICAgICAgPC9QYW5lPlxuICAgICAgICAgIClcbiAgICAgICAgfX1cbiAgICAgIDwvVGFibGVSb3dDb25zdW1lcj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFRoZW1lKFRhYmxlQ2VsbClcbiJdfQ==