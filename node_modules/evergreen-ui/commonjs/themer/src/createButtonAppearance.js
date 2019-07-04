"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _constants = require("../../constants");

var _createAppearance = _interopRequireDefault(require("./createAppearance"));

var _missingStateWarning = _interopRequireDefault(require("./missingStateWarning"));

var baseStyle = {
  WebkitFontSmoothing: 'antialiased',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  verticalAlign: 'middle',
  textDecoration: 'none',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  '&::-moz-focus-inner ': {
    border: 0
  }
};
var disabledState = "[disabled], [data-disabled]";
var hoverState = '&:not([disabled]):not([data-disabled]):hover';
var focusState = '&:not([disabled]):not([data-disabled]):focus';
var focusAndActiveState = '&:not([disabled]):not([data-disabled]):focus:active, &:not([disabled]):not([data-disabled])[aria-expanded="true"]:focus, &:not([disabled]):not([data-disabled])[data-active]:focus';
var activeState = '&:not([disabled]):not([data-disabled]):active, &:not([disabled]):not([data-disabled])[aria-expanded="true"], &:not([disabled]):not([data-disabled])[data-active]';
/**
 * @param {object} items - object with a set of items.
 * @return {object} the final appearance.
 */

var createButtonAppearance = function createButtonAppearance() {
  var _objectSpread2;

  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _missingStateWarning.default)({
    items: items,
    props: ['base', 'hover', 'focus', 'active', 'focusAndActive', 'disabled'],
    cb: function cb(prop) {
      console.error("Themer.createButtonAppearance() is missing a ".concat(prop, " state in items:"), items);
    }
  });
  return (0, _objectSpread3.default)({}, baseStyle, (0, _createAppearance.default)(items.base), (_objectSpread2 = {}, (0, _defineProperty2.default)(_objectSpread2, disabledState, (0, _objectSpread3.default)({
    cursor: 'not-allowed'
  }, (0, _createAppearance.default)(items.disabled))), (0, _defineProperty2.default)(_objectSpread2, hoverState, (0, _createAppearance.default)(items.hover)), (0, _defineProperty2.default)(_objectSpread2, focusState, (0, _objectSpread3.default)({
    zIndex: _constants.StackingOrder.FOCUSED
  }, (0, _createAppearance.default)(items.focus))), (0, _defineProperty2.default)(_objectSpread2, activeState, (0, _createAppearance.default)(items.active)), (0, _defineProperty2.default)(_objectSpread2, focusAndActiveState, (0, _createAppearance.default)(items.focusAndActive)), _objectSpread2));
};

var _default = createButtonAppearance;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aGVtZXIvc3JjL2NyZWF0ZUJ1dHRvbkFwcGVhcmFuY2UuanMiXSwibmFtZXMiOlsiYmFzZVN0eWxlIiwiV2Via2l0Rm9udFNtb290aGluZyIsIldlYmtpdEFwcGVhcmFuY2UiLCJNb3pBcHBlYXJhbmNlIiwidmVydGljYWxBbGlnbiIsInRleHREZWNvcmF0aW9uIiwiYm9yZGVyIiwib3V0bGluZSIsImN1cnNvciIsImRpc2FibGVkU3RhdGUiLCJob3ZlclN0YXRlIiwiZm9jdXNTdGF0ZSIsImZvY3VzQW5kQWN0aXZlU3RhdGUiLCJhY3RpdmVTdGF0ZSIsImNyZWF0ZUJ1dHRvbkFwcGVhcmFuY2UiLCJpdGVtcyIsInByb3BzIiwiY2IiLCJwcm9wIiwiY29uc29sZSIsImVycm9yIiwiYmFzZSIsImRpc2FibGVkIiwiaG92ZXIiLCJ6SW5kZXgiLCJTdGFja2luZ09yZGVyIiwiRk9DVVNFRCIsImZvY3VzIiwiYWN0aXZlIiwiZm9jdXNBbmRBY3RpdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFFQSxJQUFNQSxTQUFTLEdBQUc7QUFDaEJDLEVBQUFBLG1CQUFtQixFQUFFLGFBREw7QUFFaEJDLEVBQUFBLGdCQUFnQixFQUFFLE1BRkY7QUFHaEJDLEVBQUFBLGFBQWEsRUFBRSxNQUhDO0FBSWhCQyxFQUFBQSxhQUFhLEVBQUUsUUFKQztBQUtoQkMsRUFBQUEsY0FBYyxFQUFFLE1BTEE7QUFNaEJDLEVBQUFBLE1BQU0sRUFBRSxNQU5RO0FBT2hCQyxFQUFBQSxPQUFPLEVBQUUsTUFQTztBQVFoQkMsRUFBQUEsTUFBTSxFQUFFLFNBUlE7QUFTaEIsMEJBQXdCO0FBQ3RCRixJQUFBQSxNQUFNLEVBQUU7QUFEYztBQVRSLENBQWxCO0FBY0EsSUFBTUcsYUFBYSxnQ0FBbkI7QUFDQSxJQUFNQyxVQUFVLEdBQUcsOENBQW5CO0FBQ0EsSUFBTUMsVUFBVSxHQUFHLDhDQUFuQjtBQUNBLElBQU1DLG1CQUFtQixHQUN2QixvTEFERjtBQUVBLElBQU1DLFdBQVcsR0FDZixrS0FERjtBQUdBOzs7OztBQUlBLElBQU1DLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBeUIsR0FBZ0I7QUFBQTs7QUFBQSxNQUFmQyxLQUFlLHVFQUFQLEVBQU87QUFDN0Msb0NBQW9CO0FBQ2xCQSxJQUFBQSxLQUFLLEVBQUxBLEtBRGtCO0FBRWxCQyxJQUFBQSxLQUFLLEVBQUUsQ0FBQyxNQUFELEVBQVMsT0FBVCxFQUFrQixPQUFsQixFQUEyQixRQUEzQixFQUFxQyxnQkFBckMsRUFBdUQsVUFBdkQsQ0FGVztBQUdsQkMsSUFBQUEsRUFBRSxFQUFFLFlBQUFDLElBQUksRUFBSTtBQUNWQyxNQUFBQSxPQUFPLENBQUNDLEtBQVIsd0RBQ2tERixJQURsRCx1QkFFRUgsS0FGRjtBQUlEO0FBUmlCLEdBQXBCO0FBV0EseUNBQ0tmLFNBREwsRUFFSywrQkFBaUJlLEtBQUssQ0FBQ00sSUFBdkIsQ0FGTCxzRUFHR1osYUFISDtBQUlJRCxJQUFBQSxNQUFNLEVBQUU7QUFKWixLQUtPLCtCQUFpQk8sS0FBSyxDQUFDTyxRQUF2QixDQUxQLGtEQU9HWixVQVBILEVBT2dCLCtCQUFpQkssS0FBSyxDQUFDUSxLQUF2QixDQVBoQixpREFRR1osVUFSSDtBQVNJYSxJQUFBQSxNQUFNLEVBQUVDLHlCQUFjQztBQVQxQixLQVVPLCtCQUFpQlgsS0FBSyxDQUFDWSxLQUF2QixDQVZQLGtEQVlHZCxXQVpILEVBWWlCLCtCQUFpQkUsS0FBSyxDQUFDYSxNQUF2QixDQVpqQixpREFhR2hCLG1CQWJILEVBYXlCLCtCQUFpQkcsS0FBSyxDQUFDYyxjQUF2QixDQWJ6QjtBQWVELENBM0JEOztlQTZCZWYsc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFja2luZ09yZGVyIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJ1xuaW1wb3J0IGNyZWF0ZUFwcGVhcmFuY2UgZnJvbSAnLi9jcmVhdGVBcHBlYXJhbmNlJ1xuaW1wb3J0IG1pc3NpbmdTdGF0ZVdhcm5pbmcgZnJvbSAnLi9taXNzaW5nU3RhdGVXYXJuaW5nJ1xuXG5jb25zdCBiYXNlU3R5bGUgPSB7XG4gIFdlYmtpdEZvbnRTbW9vdGhpbmc6ICdhbnRpYWxpYXNlZCcsXG4gIFdlYmtpdEFwcGVhcmFuY2U6ICdub25lJyxcbiAgTW96QXBwZWFyYW5jZTogJ25vbmUnLFxuICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcbiAgdGV4dERlY29yYXRpb246ICdub25lJyxcbiAgYm9yZGVyOiAnbm9uZScsXG4gIG91dGxpbmU6ICdub25lJyxcbiAgY3Vyc29yOiAncG9pbnRlcicsXG4gICcmOjotbW96LWZvY3VzLWlubmVyICc6IHtcbiAgICBib3JkZXI6IDBcbiAgfVxufVxuXG5jb25zdCBkaXNhYmxlZFN0YXRlID0gYFtkaXNhYmxlZF0sIFtkYXRhLWRpc2FibGVkXWBcbmNvbnN0IGhvdmVyU3RhdGUgPSAnJjpub3QoW2Rpc2FibGVkXSk6bm90KFtkYXRhLWRpc2FibGVkXSk6aG92ZXInXG5jb25zdCBmb2N1c1N0YXRlID0gJyY6bm90KFtkaXNhYmxlZF0pOm5vdChbZGF0YS1kaXNhYmxlZF0pOmZvY3VzJ1xuY29uc3QgZm9jdXNBbmRBY3RpdmVTdGF0ZSA9XG4gICcmOm5vdChbZGlzYWJsZWRdKTpub3QoW2RhdGEtZGlzYWJsZWRdKTpmb2N1czphY3RpdmUsICY6bm90KFtkaXNhYmxlZF0pOm5vdChbZGF0YS1kaXNhYmxlZF0pW2FyaWEtZXhwYW5kZWQ9XCJ0cnVlXCJdOmZvY3VzLCAmOm5vdChbZGlzYWJsZWRdKTpub3QoW2RhdGEtZGlzYWJsZWRdKVtkYXRhLWFjdGl2ZV06Zm9jdXMnXG5jb25zdCBhY3RpdmVTdGF0ZSA9XG4gICcmOm5vdChbZGlzYWJsZWRdKTpub3QoW2RhdGEtZGlzYWJsZWRdKTphY3RpdmUsICY6bm90KFtkaXNhYmxlZF0pOm5vdChbZGF0YS1kaXNhYmxlZF0pW2FyaWEtZXhwYW5kZWQ9XCJ0cnVlXCJdLCAmOm5vdChbZGlzYWJsZWRdKTpub3QoW2RhdGEtZGlzYWJsZWRdKVtkYXRhLWFjdGl2ZV0nXG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IGl0ZW1zIC0gb2JqZWN0IHdpdGggYSBzZXQgb2YgaXRlbXMuXG4gKiBAcmV0dXJuIHtvYmplY3R9IHRoZSBmaW5hbCBhcHBlYXJhbmNlLlxuICovXG5jb25zdCBjcmVhdGVCdXR0b25BcHBlYXJhbmNlID0gKGl0ZW1zID0ge30pID0+IHtcbiAgbWlzc2luZ1N0YXRlV2FybmluZyh7XG4gICAgaXRlbXMsXG4gICAgcHJvcHM6IFsnYmFzZScsICdob3ZlcicsICdmb2N1cycsICdhY3RpdmUnLCAnZm9jdXNBbmRBY3RpdmUnLCAnZGlzYWJsZWQnXSxcbiAgICBjYjogcHJvcCA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICBgVGhlbWVyLmNyZWF0ZUJ1dHRvbkFwcGVhcmFuY2UoKSBpcyBtaXNzaW5nIGEgJHtwcm9wfSBzdGF0ZSBpbiBpdGVtczpgLFxuICAgICAgICBpdGVtc1xuICAgICAgKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4ge1xuICAgIC4uLmJhc2VTdHlsZSxcbiAgICAuLi5jcmVhdGVBcHBlYXJhbmNlKGl0ZW1zLmJhc2UpLFxuICAgIFtkaXNhYmxlZFN0YXRlXToge1xuICAgICAgY3Vyc29yOiAnbm90LWFsbG93ZWQnLFxuICAgICAgLi4uY3JlYXRlQXBwZWFyYW5jZShpdGVtcy5kaXNhYmxlZClcbiAgICB9LFxuICAgIFtob3ZlclN0YXRlXTogY3JlYXRlQXBwZWFyYW5jZShpdGVtcy5ob3ZlciksXG4gICAgW2ZvY3VzU3RhdGVdOiB7XG4gICAgICB6SW5kZXg6IFN0YWNraW5nT3JkZXIuRk9DVVNFRCxcbiAgICAgIC4uLmNyZWF0ZUFwcGVhcmFuY2UoaXRlbXMuZm9jdXMpXG4gICAgfSxcbiAgICBbYWN0aXZlU3RhdGVdOiBjcmVhdGVBcHBlYXJhbmNlKGl0ZW1zLmFjdGl2ZSksXG4gICAgW2ZvY3VzQW5kQWN0aXZlU3RhdGVdOiBjcmVhdGVBcHBlYXJhbmNlKGl0ZW1zLmZvY3VzQW5kQWN0aXZlKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUJ1dHRvbkFwcGVhcmFuY2VcbiJdfQ==