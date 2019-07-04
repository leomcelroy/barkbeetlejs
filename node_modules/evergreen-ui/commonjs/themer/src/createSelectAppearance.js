"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _createAppearance = _interopRequireDefault(require("./createAppearance"));

var _missingStateWarning = _interopRequireDefault(require("./missingStateWarning"));

var baseStyle = {
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  border: 'none',
  flex: 1,
  background: 'none',
  width: '100%',
  WebkitFontSmoothing: 'antialiased',
  textDecoration: 'none',
  outline: 'none',
  cursor: 'pointer',
  ':-moz-focusring': {
    color: 'transparent',
    textShadow: '0 0 0 #000'
  }
};
var disabledState = '[disabled]';
var invalidState = '&[aria-invalid="true"]';
var hoverState = '&:not([disabled]):hover';
var focusState = '&:not([disabled]):focus';
var activeState = '&:not([disabled]):active';
/**
 * @param {object} items - object with a set of states.
 * @return {object} the final appearance.
 */

var createSelectAppearance = function createSelectAppearance() {
  var _objectSpread2;

  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _missingStateWarning.default)({
    items: items,
    props: ['base', 'disabled', 'invalid', 'hover', 'active', 'focus'],
    cb: function cb(prop) {
      console.error("Themer.createSelectAppearance() is missing a ".concat(prop, " item"), items);
    }
  });
  return (0, _objectSpread3.default)({}, baseStyle, (0, _createAppearance.default)(items.base), (_objectSpread2 = {}, (0, _defineProperty2.default)(_objectSpread2, disabledState, (0, _objectSpread3.default)({
    cursor: 'not-allowed'
  }, (0, _createAppearance.default)(items.disabled))), (0, _defineProperty2.default)(_objectSpread2, invalidState, (0, _createAppearance.default)(items.invalid)), (0, _defineProperty2.default)(_objectSpread2, hoverState, (0, _createAppearance.default)(items.hover)), (0, _defineProperty2.default)(_objectSpread2, focusState, (0, _createAppearance.default)(items.focus)), (0, _defineProperty2.default)(_objectSpread2, activeState, (0, _createAppearance.default)(items.active)), _objectSpread2));
};

var _default = createSelectAppearance;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aGVtZXIvc3JjL2NyZWF0ZVNlbGVjdEFwcGVhcmFuY2UuanMiXSwibmFtZXMiOlsiYmFzZVN0eWxlIiwiV2Via2l0QXBwZWFyYW5jZSIsIk1vekFwcGVhcmFuY2UiLCJib3JkZXIiLCJmbGV4IiwiYmFja2dyb3VuZCIsIndpZHRoIiwiV2Via2l0Rm9udFNtb290aGluZyIsInRleHREZWNvcmF0aW9uIiwib3V0bGluZSIsImN1cnNvciIsImNvbG9yIiwidGV4dFNoYWRvdyIsImRpc2FibGVkU3RhdGUiLCJpbnZhbGlkU3RhdGUiLCJob3ZlclN0YXRlIiwiZm9jdXNTdGF0ZSIsImFjdGl2ZVN0YXRlIiwiY3JlYXRlU2VsZWN0QXBwZWFyYW5jZSIsIml0ZW1zIiwicHJvcHMiLCJjYiIsInByb3AiLCJjb25zb2xlIiwiZXJyb3IiLCJiYXNlIiwiZGlzYWJsZWQiLCJpbnZhbGlkIiwiaG92ZXIiLCJmb2N1cyIsImFjdGl2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUVBLElBQU1BLFNBQVMsR0FBRztBQUNoQkMsRUFBQUEsZ0JBQWdCLEVBQUUsTUFERjtBQUVoQkMsRUFBQUEsYUFBYSxFQUFFLE1BRkM7QUFHaEJDLEVBQUFBLE1BQU0sRUFBRSxNQUhRO0FBSWhCQyxFQUFBQSxJQUFJLEVBQUUsQ0FKVTtBQUtoQkMsRUFBQUEsVUFBVSxFQUFFLE1BTEk7QUFNaEJDLEVBQUFBLEtBQUssRUFBRSxNQU5TO0FBT2hCQyxFQUFBQSxtQkFBbUIsRUFBRSxhQVBMO0FBUWhCQyxFQUFBQSxjQUFjLEVBQUUsTUFSQTtBQVNoQkMsRUFBQUEsT0FBTyxFQUFFLE1BVE87QUFVaEJDLEVBQUFBLE1BQU0sRUFBRSxTQVZRO0FBV2hCLHFCQUFtQjtBQUNqQkMsSUFBQUEsS0FBSyxFQUFFLGFBRFU7QUFFakJDLElBQUFBLFVBQVUsRUFBRTtBQUZLO0FBWEgsQ0FBbEI7QUFpQkEsSUFBTUMsYUFBYSxHQUFHLFlBQXRCO0FBQ0EsSUFBTUMsWUFBWSxHQUFHLHdCQUFyQjtBQUNBLElBQU1DLFVBQVUsR0FBRyx5QkFBbkI7QUFDQSxJQUFNQyxVQUFVLEdBQUcseUJBQW5CO0FBQ0EsSUFBTUMsV0FBVyxHQUFHLDBCQUFwQjtBQUVBOzs7OztBQUlBLElBQU1DLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBeUIsR0FBZ0I7QUFBQTs7QUFBQSxNQUFmQyxLQUFlLHVFQUFQLEVBQU87QUFDN0Msb0NBQW9CO0FBQ2xCQSxJQUFBQSxLQUFLLEVBQUxBLEtBRGtCO0FBRWxCQyxJQUFBQSxLQUFLLEVBQUUsQ0FBQyxNQUFELEVBQVMsVUFBVCxFQUFxQixTQUFyQixFQUFnQyxPQUFoQyxFQUF5QyxRQUF6QyxFQUFtRCxPQUFuRCxDQUZXO0FBR2xCQyxJQUFBQSxFQUFFLEVBQUUsWUFBQUMsSUFBSSxFQUFJO0FBQ1ZDLE1BQUFBLE9BQU8sQ0FBQ0MsS0FBUix3REFDa0RGLElBRGxELFlBRUVILEtBRkY7QUFJRDtBQVJpQixHQUFwQjtBQVdBLHlDQUNLbkIsU0FETCxFQUVLLCtCQUFpQm1CLEtBQUssQ0FBQ00sSUFBdkIsQ0FGTCxzRUFHR1osYUFISDtBQUlJSCxJQUFBQSxNQUFNLEVBQUU7QUFKWixLQUtPLCtCQUFpQlMsS0FBSyxDQUFDTyxRQUF2QixDQUxQLGtEQU9HWixZQVBILEVBT2tCLCtCQUFpQkssS0FBSyxDQUFDUSxPQUF2QixDQVBsQixpREFRR1osVUFSSCxFQVFnQiwrQkFBaUJJLEtBQUssQ0FBQ1MsS0FBdkIsQ0FSaEIsaURBU0daLFVBVEgsRUFTZ0IsK0JBQWlCRyxLQUFLLENBQUNVLEtBQXZCLENBVGhCLGlEQVVHWixXQVZILEVBVWlCLCtCQUFpQkUsS0FBSyxDQUFDVyxNQUF2QixDQVZqQjtBQVlELENBeEJEOztlQTBCZVosc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JlYXRlQXBwZWFyYW5jZSBmcm9tICcuL2NyZWF0ZUFwcGVhcmFuY2UnXG5pbXBvcnQgbWlzc2luZ1N0YXRlV2FybmluZyBmcm9tICcuL21pc3NpbmdTdGF0ZVdhcm5pbmcnXG5cbmNvbnN0IGJhc2VTdHlsZSA9IHtcbiAgV2Via2l0QXBwZWFyYW5jZTogJ25vbmUnLFxuICBNb3pBcHBlYXJhbmNlOiAnbm9uZScsXG4gIGJvcmRlcjogJ25vbmUnLFxuICBmbGV4OiAxLFxuICBiYWNrZ3JvdW5kOiAnbm9uZScsXG4gIHdpZHRoOiAnMTAwJScsXG4gIFdlYmtpdEZvbnRTbW9vdGhpbmc6ICdhbnRpYWxpYXNlZCcsXG4gIHRleHREZWNvcmF0aW9uOiAnbm9uZScsXG4gIG91dGxpbmU6ICdub25lJyxcbiAgY3Vyc29yOiAncG9pbnRlcicsXG4gICc6LW1vei1mb2N1c3JpbmcnOiB7XG4gICAgY29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgdGV4dFNoYWRvdzogJzAgMCAwICMwMDAnXG4gIH1cbn1cblxuY29uc3QgZGlzYWJsZWRTdGF0ZSA9ICdbZGlzYWJsZWRdJ1xuY29uc3QgaW52YWxpZFN0YXRlID0gJyZbYXJpYS1pbnZhbGlkPVwidHJ1ZVwiXSdcbmNvbnN0IGhvdmVyU3RhdGUgPSAnJjpub3QoW2Rpc2FibGVkXSk6aG92ZXInXG5jb25zdCBmb2N1c1N0YXRlID0gJyY6bm90KFtkaXNhYmxlZF0pOmZvY3VzJ1xuY29uc3QgYWN0aXZlU3RhdGUgPSAnJjpub3QoW2Rpc2FibGVkXSk6YWN0aXZlJ1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtcyAtIG9iamVjdCB3aXRoIGEgc2V0IG9mIHN0YXRlcy5cbiAqIEByZXR1cm4ge29iamVjdH0gdGhlIGZpbmFsIGFwcGVhcmFuY2UuXG4gKi9cbmNvbnN0IGNyZWF0ZVNlbGVjdEFwcGVhcmFuY2UgPSAoaXRlbXMgPSB7fSkgPT4ge1xuICBtaXNzaW5nU3RhdGVXYXJuaW5nKHtcbiAgICBpdGVtcyxcbiAgICBwcm9wczogWydiYXNlJywgJ2Rpc2FibGVkJywgJ2ludmFsaWQnLCAnaG92ZXInLCAnYWN0aXZlJywgJ2ZvY3VzJ10sXG4gICAgY2I6IHByb3AgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgYFRoZW1lci5jcmVhdGVTZWxlY3RBcHBlYXJhbmNlKCkgaXMgbWlzc2luZyBhICR7cHJvcH0gaXRlbWAsXG4gICAgICAgIGl0ZW1zXG4gICAgICApXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgLi4uYmFzZVN0eWxlLFxuICAgIC4uLmNyZWF0ZUFwcGVhcmFuY2UoaXRlbXMuYmFzZSksXG4gICAgW2Rpc2FibGVkU3RhdGVdOiB7XG4gICAgICBjdXJzb3I6ICdub3QtYWxsb3dlZCcsXG4gICAgICAuLi5jcmVhdGVBcHBlYXJhbmNlKGl0ZW1zLmRpc2FibGVkKVxuICAgIH0sXG4gICAgW2ludmFsaWRTdGF0ZV06IGNyZWF0ZUFwcGVhcmFuY2UoaXRlbXMuaW52YWxpZCksXG4gICAgW2hvdmVyU3RhdGVdOiBjcmVhdGVBcHBlYXJhbmNlKGl0ZW1zLmhvdmVyKSxcbiAgICBbZm9jdXNTdGF0ZV06IGNyZWF0ZUFwcGVhcmFuY2UoaXRlbXMuZm9jdXMpLFxuICAgIFthY3RpdmVTdGF0ZV06IGNyZWF0ZUFwcGVhcmFuY2UoaXRlbXMuYWN0aXZlKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNlbGVjdEFwcGVhcmFuY2VcbiJdfQ==