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
  boxSizing: 'border-box',
  textDecoration: 'none',
  transition: 'box-shadow 80ms ease-in-out',
  WebkitAppearance: 'none',
  border: 'none',
  outline: 'none',
  cursor: 'pointer'
};
var disabledState = '[disabled="true"], [data-disabled="true"]';
var hoverState = '&:not([disabled="true"]):not([data-disabled="true"]):hover';
var activeState = '&:not([disabled="true"]):not([data-disabled="true"]):active, &:not([disabled="true"]):not([data-disabled="true"])[data-popover-opened="true"], &:not([disabled="true"]):not([data-disabled="true"])[data-active="true"]';
var focusState = '& input:focus + label';
/**
 * @param {object} items - object with a set of states.
 * @return {object} the final appearance.
 */

var createSegmentedControlRadioAppearance = function createSegmentedControlRadioAppearance() {
  var _objectSpread2;

  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _missingStateWarning.default)({
    items: items,
    props: ['base', 'hover', 'disabled', 'active', 'focus'],
    cb: function cb(prop) {
      console.error("Themer.createSegmentedControlRadioAppearance() is missing a ".concat(prop, " item"), items);
    }
  });
  return (0, _objectSpread3.default)({}, baseStyle, (0, _createAppearance.default)(items.base), (_objectSpread2 = {}, (0, _defineProperty2.default)(_objectSpread2, disabledState, (0, _objectSpread3.default)({
    cursor: 'not-allowed'
  }, (0, _createAppearance.default)(items.disabled))), (0, _defineProperty2.default)(_objectSpread2, hoverState, (0, _createAppearance.default)(items.hover)), (0, _defineProperty2.default)(_objectSpread2, focusState, (0, _objectSpread3.default)({
    zIndex: _constants.StackingOrder.FOCUSED
  }, (0, _createAppearance.default)(items.focus))), (0, _defineProperty2.default)(_objectSpread2, activeState, (0, _createAppearance.default)(items.active)), (0, _defineProperty2.default)(_objectSpread2, '&[data-active="true"]', {
    cursor: 'default'
  }), _objectSpread2));
};

var _default = createSegmentedControlRadioAppearance;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aGVtZXIvc3JjL2NyZWF0ZVNlZ21lbnRlZENvbnRyb2xSYWRpb0FwcGVhcmFuY2UuanMiXSwibmFtZXMiOlsiYmFzZVN0eWxlIiwiV2Via2l0Rm9udFNtb290aGluZyIsImJveFNpemluZyIsInRleHREZWNvcmF0aW9uIiwidHJhbnNpdGlvbiIsIldlYmtpdEFwcGVhcmFuY2UiLCJib3JkZXIiLCJvdXRsaW5lIiwiY3Vyc29yIiwiZGlzYWJsZWRTdGF0ZSIsImhvdmVyU3RhdGUiLCJhY3RpdmVTdGF0ZSIsImZvY3VzU3RhdGUiLCJjcmVhdGVTZWdtZW50ZWRDb250cm9sUmFkaW9BcHBlYXJhbmNlIiwiaXRlbXMiLCJwcm9wcyIsImNiIiwicHJvcCIsImNvbnNvbGUiLCJlcnJvciIsImJhc2UiLCJkaXNhYmxlZCIsImhvdmVyIiwiekluZGV4IiwiU3RhY2tpbmdPcmRlciIsIkZPQ1VTRUQiLCJmb2N1cyIsImFjdGl2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBLElBQU1BLFNBQVMsR0FBRztBQUNoQkMsRUFBQUEsbUJBQW1CLEVBQUUsYUFETDtBQUVoQkMsRUFBQUEsU0FBUyxFQUFFLFlBRks7QUFHaEJDLEVBQUFBLGNBQWMsRUFBRSxNQUhBO0FBSWhCQyxFQUFBQSxVQUFVLEVBQUUsNkJBSkk7QUFLaEJDLEVBQUFBLGdCQUFnQixFQUFFLE1BTEY7QUFNaEJDLEVBQUFBLE1BQU0sRUFBRSxNQU5RO0FBT2hCQyxFQUFBQSxPQUFPLEVBQUUsTUFQTztBQVFoQkMsRUFBQUEsTUFBTSxFQUFFO0FBUlEsQ0FBbEI7QUFXQSxJQUFNQyxhQUFhLEdBQUcsMkNBQXRCO0FBQ0EsSUFBTUMsVUFBVSxHQUFHLDREQUFuQjtBQUNBLElBQU1DLFdBQVcsR0FDZix5TkFERjtBQUVBLElBQU1DLFVBQVUsR0FBRyx1QkFBbkI7QUFFQTs7Ozs7QUFJQSxJQUFNQyxxQ0FBcUMsR0FBRyxTQUF4Q0EscUNBQXdDLEdBQWdCO0FBQUE7O0FBQUEsTUFBZkMsS0FBZSx1RUFBUCxFQUFPO0FBQzVELG9DQUFvQjtBQUNsQkEsSUFBQUEsS0FBSyxFQUFMQSxLQURrQjtBQUVsQkMsSUFBQUEsS0FBSyxFQUFFLENBQUMsTUFBRCxFQUFTLE9BQVQsRUFBa0IsVUFBbEIsRUFBOEIsUUFBOUIsRUFBd0MsT0FBeEMsQ0FGVztBQUdsQkMsSUFBQUEsRUFBRSxFQUFFLFlBQUFDLElBQUksRUFBSTtBQUNWQyxNQUFBQSxPQUFPLENBQUNDLEtBQVIsdUVBQ2lFRixJQURqRSxZQUVFSCxLQUZGO0FBSUQ7QUFSaUIsR0FBcEI7QUFXQSx5Q0FDS2QsU0FETCxFQUVLLCtCQUFpQmMsS0FBSyxDQUFDTSxJQUF2QixDQUZMLHNFQUdHWCxhQUhIO0FBSUlELElBQUFBLE1BQU0sRUFBRTtBQUpaLEtBS08sK0JBQWlCTSxLQUFLLENBQUNPLFFBQXZCLENBTFAsa0RBT0dYLFVBUEgsRUFPZ0IsK0JBQWlCSSxLQUFLLENBQUNRLEtBQXZCLENBUGhCLGlEQVFHVixVQVJIO0FBU0lXLElBQUFBLE1BQU0sRUFBRUMseUJBQWNDO0FBVDFCLEtBVU8sK0JBQWlCWCxLQUFLLENBQUNZLEtBQXZCLENBVlAsa0RBWUdmLFdBWkgsRUFZaUIsK0JBQWlCRyxLQUFLLENBQUNhLE1BQXZCLENBWmpCLGlEQWFFLHVCQWJGLEVBYTJCO0FBQ3ZCbkIsSUFBQUEsTUFBTSxFQUFFO0FBRGUsR0FiM0I7QUFpQkQsQ0E3QkQ7O2VBK0JlSyxxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNraW5nT3JkZXIgfSBmcm9tICcuLi8uLi9jb25zdGFudHMnXG5pbXBvcnQgY3JlYXRlQXBwZWFyYW5jZSBmcm9tICcuL2NyZWF0ZUFwcGVhcmFuY2UnXG5pbXBvcnQgbWlzc2luZ1N0YXRlV2FybmluZyBmcm9tICcuL21pc3NpbmdTdGF0ZVdhcm5pbmcnXG5cbmNvbnN0IGJhc2VTdHlsZSA9IHtcbiAgV2Via2l0Rm9udFNtb290aGluZzogJ2FudGlhbGlhc2VkJyxcbiAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gIHRleHREZWNvcmF0aW9uOiAnbm9uZScsXG4gIHRyYW5zaXRpb246ICdib3gtc2hhZG93IDgwbXMgZWFzZS1pbi1vdXQnLFxuICBXZWJraXRBcHBlYXJhbmNlOiAnbm9uZScsXG4gIGJvcmRlcjogJ25vbmUnLFxuICBvdXRsaW5lOiAnbm9uZScsXG4gIGN1cnNvcjogJ3BvaW50ZXInXG59XG5cbmNvbnN0IGRpc2FibGVkU3RhdGUgPSAnW2Rpc2FibGVkPVwidHJ1ZVwiXSwgW2RhdGEtZGlzYWJsZWQ9XCJ0cnVlXCJdJ1xuY29uc3QgaG92ZXJTdGF0ZSA9ICcmOm5vdChbZGlzYWJsZWQ9XCJ0cnVlXCJdKTpub3QoW2RhdGEtZGlzYWJsZWQ9XCJ0cnVlXCJdKTpob3ZlcidcbmNvbnN0IGFjdGl2ZVN0YXRlID1cbiAgJyY6bm90KFtkaXNhYmxlZD1cInRydWVcIl0pOm5vdChbZGF0YS1kaXNhYmxlZD1cInRydWVcIl0pOmFjdGl2ZSwgJjpub3QoW2Rpc2FibGVkPVwidHJ1ZVwiXSk6bm90KFtkYXRhLWRpc2FibGVkPVwidHJ1ZVwiXSlbZGF0YS1wb3BvdmVyLW9wZW5lZD1cInRydWVcIl0sICY6bm90KFtkaXNhYmxlZD1cInRydWVcIl0pOm5vdChbZGF0YS1kaXNhYmxlZD1cInRydWVcIl0pW2RhdGEtYWN0aXZlPVwidHJ1ZVwiXSdcbmNvbnN0IGZvY3VzU3RhdGUgPSAnJiBpbnB1dDpmb2N1cyArIGxhYmVsJ1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtcyAtIG9iamVjdCB3aXRoIGEgc2V0IG9mIHN0YXRlcy5cbiAqIEByZXR1cm4ge29iamVjdH0gdGhlIGZpbmFsIGFwcGVhcmFuY2UuXG4gKi9cbmNvbnN0IGNyZWF0ZVNlZ21lbnRlZENvbnRyb2xSYWRpb0FwcGVhcmFuY2UgPSAoaXRlbXMgPSB7fSkgPT4ge1xuICBtaXNzaW5nU3RhdGVXYXJuaW5nKHtcbiAgICBpdGVtcyxcbiAgICBwcm9wczogWydiYXNlJywgJ2hvdmVyJywgJ2Rpc2FibGVkJywgJ2FjdGl2ZScsICdmb2N1cyddLFxuICAgIGNiOiBwcm9wID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgIGBUaGVtZXIuY3JlYXRlU2VnbWVudGVkQ29udHJvbFJhZGlvQXBwZWFyYW5jZSgpIGlzIG1pc3NpbmcgYSAke3Byb3B9IGl0ZW1gLFxuICAgICAgICBpdGVtc1xuICAgICAgKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4ge1xuICAgIC4uLmJhc2VTdHlsZSxcbiAgICAuLi5jcmVhdGVBcHBlYXJhbmNlKGl0ZW1zLmJhc2UpLFxuICAgIFtkaXNhYmxlZFN0YXRlXToge1xuICAgICAgY3Vyc29yOiAnbm90LWFsbG93ZWQnLFxuICAgICAgLi4uY3JlYXRlQXBwZWFyYW5jZShpdGVtcy5kaXNhYmxlZClcbiAgICB9LFxuICAgIFtob3ZlclN0YXRlXTogY3JlYXRlQXBwZWFyYW5jZShpdGVtcy5ob3ZlciksXG4gICAgW2ZvY3VzU3RhdGVdOiB7XG4gICAgICB6SW5kZXg6IFN0YWNraW5nT3JkZXIuRk9DVVNFRCxcbiAgICAgIC4uLmNyZWF0ZUFwcGVhcmFuY2UoaXRlbXMuZm9jdXMpXG4gICAgfSxcbiAgICBbYWN0aXZlU3RhdGVdOiBjcmVhdGVBcHBlYXJhbmNlKGl0ZW1zLmFjdGl2ZSksXG4gICAgJyZbZGF0YS1hY3RpdmU9XCJ0cnVlXCJdJzoge1xuICAgICAgY3Vyc29yOiAnZGVmYXVsdCdcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2VnbWVudGVkQ29udHJvbFJhZGlvQXBwZWFyYW5jZVxuIl19