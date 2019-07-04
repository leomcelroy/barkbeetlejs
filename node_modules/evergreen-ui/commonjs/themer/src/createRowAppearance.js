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

var hoverState = '&[data-isselectable="true"]:hover';
var focusState = '&[data-isselectable="true"]:focus, &[aria-selected="true"]';
var activeState = '&[aria-current="true"], &[data-isselectable="true"]:active';
var currentState = '&[aria-current="true"]';
var baseStyle = {
  '&[data-isselectable="true"]': {
    cursor: 'pointer'
  },
  outline: 'none'
  /**
   * @param {object} items - object with a set of states.
   * @return {object} the final appearance.
   */

};

var createRowAppearance = function createRowAppearance() {
  var _objectSpread2;

  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _missingStateWarning.default)({
    items: items,
    props: ['base', 'hover', 'active', 'focus', 'current'],
    cb: function cb(prop) {
      console.error("Themer.createRowAppearance() is missing a ".concat(prop, " item"), items);
    }
  });
  return (0, _objectSpread3.default)({}, baseStyle, (0, _createAppearance.default)(items.base), (_objectSpread2 = {}, (0, _defineProperty2.default)(_objectSpread2, hoverState, (0, _createAppearance.default)(items.hover)), (0, _defineProperty2.default)(_objectSpread2, focusState, (0, _createAppearance.default)(items.focus)), (0, _defineProperty2.default)(_objectSpread2, activeState, (0, _createAppearance.default)(items.active)), (0, _defineProperty2.default)(_objectSpread2, currentState, (0, _createAppearance.default)(items.current)), _objectSpread2));
};

var _default = createRowAppearance;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aGVtZXIvc3JjL2NyZWF0ZVJvd0FwcGVhcmFuY2UuanMiXSwibmFtZXMiOlsiaG92ZXJTdGF0ZSIsImZvY3VzU3RhdGUiLCJhY3RpdmVTdGF0ZSIsImN1cnJlbnRTdGF0ZSIsImJhc2VTdHlsZSIsImN1cnNvciIsIm91dGxpbmUiLCJjcmVhdGVSb3dBcHBlYXJhbmNlIiwiaXRlbXMiLCJwcm9wcyIsImNiIiwicHJvcCIsImNvbnNvbGUiLCJlcnJvciIsImJhc2UiLCJob3ZlciIsImZvY3VzIiwiYWN0aXZlIiwiY3VycmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUVBLElBQU1BLFVBQVUsR0FBRyxtQ0FBbkI7QUFDQSxJQUFNQyxVQUFVLEdBQUcsNERBQW5CO0FBQ0EsSUFBTUMsV0FBVyxHQUFHLDREQUFwQjtBQUNBLElBQU1DLFlBQVksR0FBRyx3QkFBckI7QUFFQSxJQUFNQyxTQUFTLEdBQUc7QUFDaEIsaUNBQStCO0FBQzdCQyxJQUFBQSxNQUFNLEVBQUU7QUFEcUIsR0FEZjtBQUloQkMsRUFBQUEsT0FBTyxFQUFFO0FBR1g7Ozs7O0FBUGtCLENBQWxCOztBQVdBLElBQU1DLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBc0IsR0FBZ0I7QUFBQTs7QUFBQSxNQUFmQyxLQUFlLHVFQUFQLEVBQU87QUFDMUMsb0NBQW9CO0FBQ2xCQSxJQUFBQSxLQUFLLEVBQUxBLEtBRGtCO0FBRWxCQyxJQUFBQSxLQUFLLEVBQUUsQ0FBQyxNQUFELEVBQVMsT0FBVCxFQUFrQixRQUFsQixFQUE0QixPQUE1QixFQUFxQyxTQUFyQyxDQUZXO0FBR2xCQyxJQUFBQSxFQUFFLEVBQUUsWUFBQUMsSUFBSSxFQUFJO0FBQ1ZDLE1BQUFBLE9BQU8sQ0FBQ0MsS0FBUixxREFDK0NGLElBRC9DLFlBRUVILEtBRkY7QUFJRDtBQVJpQixHQUFwQjtBQVdBLHlDQUNLSixTQURMLEVBRUssK0JBQWlCSSxLQUFLLENBQUNNLElBQXZCLENBRkwsc0VBR0dkLFVBSEgsRUFHZ0IsK0JBQWlCUSxLQUFLLENBQUNPLEtBQXZCLENBSGhCLGlEQUlHZCxVQUpILEVBSWdCLCtCQUFpQk8sS0FBSyxDQUFDUSxLQUF2QixDQUpoQixpREFLR2QsV0FMSCxFQUtpQiwrQkFBaUJNLEtBQUssQ0FBQ1MsTUFBdkIsQ0FMakIsaURBTUdkLFlBTkgsRUFNa0IsK0JBQWlCSyxLQUFLLENBQUNVLE9BQXZCLENBTmxCO0FBUUQsQ0FwQkQ7O2VBc0JlWCxtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVBcHBlYXJhbmNlIGZyb20gJy4vY3JlYXRlQXBwZWFyYW5jZSdcbmltcG9ydCBtaXNzaW5nU3RhdGVXYXJuaW5nIGZyb20gJy4vbWlzc2luZ1N0YXRlV2FybmluZydcblxuY29uc3QgaG92ZXJTdGF0ZSA9ICcmW2RhdGEtaXNzZWxlY3RhYmxlPVwidHJ1ZVwiXTpob3ZlcidcbmNvbnN0IGZvY3VzU3RhdGUgPSAnJltkYXRhLWlzc2VsZWN0YWJsZT1cInRydWVcIl06Zm9jdXMsICZbYXJpYS1zZWxlY3RlZD1cInRydWVcIl0nXG5jb25zdCBhY3RpdmVTdGF0ZSA9ICcmW2FyaWEtY3VycmVudD1cInRydWVcIl0sICZbZGF0YS1pc3NlbGVjdGFibGU9XCJ0cnVlXCJdOmFjdGl2ZSdcbmNvbnN0IGN1cnJlbnRTdGF0ZSA9ICcmW2FyaWEtY3VycmVudD1cInRydWVcIl0nXG5cbmNvbnN0IGJhc2VTdHlsZSA9IHtcbiAgJyZbZGF0YS1pc3NlbGVjdGFibGU9XCJ0cnVlXCJdJzoge1xuICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gIH0sXG4gIG91dGxpbmU6ICdub25lJ1xufVxuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtcyAtIG9iamVjdCB3aXRoIGEgc2V0IG9mIHN0YXRlcy5cbiAqIEByZXR1cm4ge29iamVjdH0gdGhlIGZpbmFsIGFwcGVhcmFuY2UuXG4gKi9cbmNvbnN0IGNyZWF0ZVJvd0FwcGVhcmFuY2UgPSAoaXRlbXMgPSB7fSkgPT4ge1xuICBtaXNzaW5nU3RhdGVXYXJuaW5nKHtcbiAgICBpdGVtcyxcbiAgICBwcm9wczogWydiYXNlJywgJ2hvdmVyJywgJ2FjdGl2ZScsICdmb2N1cycsICdjdXJyZW50J10sXG4gICAgY2I6IHByb3AgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgYFRoZW1lci5jcmVhdGVSb3dBcHBlYXJhbmNlKCkgaXMgbWlzc2luZyBhICR7cHJvcH0gaXRlbWAsXG4gICAgICAgIGl0ZW1zXG4gICAgICApXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgLi4uYmFzZVN0eWxlLFxuICAgIC4uLmNyZWF0ZUFwcGVhcmFuY2UoaXRlbXMuYmFzZSksXG4gICAgW2hvdmVyU3RhdGVdOiBjcmVhdGVBcHBlYXJhbmNlKGl0ZW1zLmhvdmVyKSxcbiAgICBbZm9jdXNTdGF0ZV06IGNyZWF0ZUFwcGVhcmFuY2UoaXRlbXMuZm9jdXMpLFxuICAgIFthY3RpdmVTdGF0ZV06IGNyZWF0ZUFwcGVhcmFuY2UoaXRlbXMuYWN0aXZlKSxcbiAgICBbY3VycmVudFN0YXRlXTogY3JlYXRlQXBwZWFyYW5jZShpdGVtcy5jdXJyZW50KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJvd0FwcGVhcmFuY2VcbiJdfQ==