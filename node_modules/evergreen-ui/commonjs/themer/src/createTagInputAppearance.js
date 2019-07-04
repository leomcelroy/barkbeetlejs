"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _constants = require("../../constants");

var _missingStateWarning = _interopRequireDefault(require("./missingStateWarning"));

var _createAppearance = _interopRequireDefault(require("./createAppearance"));

var baseStyle = {
  alignItems: 'center',
  display: 'inline-flex',
  flexWrap: 'wrap'
};
var focusState = '&[aria-activedescendant]';
var disabledState = '&[aria-disabled="true"]';
/**
 * @param {object} items - object with a set of states.
 * @return {object} the final appearance.
 */

var createTagInputAppearance = function createTagInputAppearance() {
  var _objectSpread2;

  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _missingStateWarning.default)({
    items: items,
    props: ['base', 'focus', 'disabled'],
    cb: function cb(prop) {
      console.error("Themer.createTagInputAppearance() is missing a ".concat(prop, " item"), items);
    }
  });
  return (0, _objectSpread3.default)({}, baseStyle, (0, _createAppearance.default)(items.base), (_objectSpread2 = {}, (0, _defineProperty2.default)(_objectSpread2, focusState, (0, _objectSpread3.default)({
    zIndex: _constants.StackingOrder.FOCUSED
  }, (0, _createAppearance.default)(items.focus))), (0, _defineProperty2.default)(_objectSpread2, disabledState, (0, _objectSpread3.default)({
    cursor: 'not-allowed'
  }, (0, _createAppearance.default)(items.disabled))), _objectSpread2));
};

var _default = createTagInputAppearance;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aGVtZXIvc3JjL2NyZWF0ZVRhZ0lucHV0QXBwZWFyYW5jZS5qcyJdLCJuYW1lcyI6WyJiYXNlU3R5bGUiLCJhbGlnbkl0ZW1zIiwiZGlzcGxheSIsImZsZXhXcmFwIiwiZm9jdXNTdGF0ZSIsImRpc2FibGVkU3RhdGUiLCJjcmVhdGVUYWdJbnB1dEFwcGVhcmFuY2UiLCJpdGVtcyIsInByb3BzIiwiY2IiLCJwcm9wIiwiY29uc29sZSIsImVycm9yIiwiYmFzZSIsInpJbmRleCIsIlN0YWNraW5nT3JkZXIiLCJGT0NVU0VEIiwiZm9jdXMiLCJjdXJzb3IiLCJkaXNhYmxlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBLElBQU1BLFNBQVMsR0FBRztBQUNoQkMsRUFBQUEsVUFBVSxFQUFFLFFBREk7QUFFaEJDLEVBQUFBLE9BQU8sRUFBRSxhQUZPO0FBR2hCQyxFQUFBQSxRQUFRLEVBQUU7QUFITSxDQUFsQjtBQU1BLElBQU1DLFVBQVUsR0FBRywwQkFBbkI7QUFDQSxJQUFNQyxhQUFhLEdBQUcseUJBQXRCO0FBRUE7Ozs7O0FBSUEsSUFBTUMsd0JBQXdCLEdBQUcsU0FBM0JBLHdCQUEyQixHQUFnQjtBQUFBOztBQUFBLE1BQWZDLEtBQWUsdUVBQVAsRUFBTztBQUMvQyxvQ0FBb0I7QUFDbEJBLElBQUFBLEtBQUssRUFBTEEsS0FEa0I7QUFFbEJDLElBQUFBLEtBQUssRUFBRSxDQUFDLE1BQUQsRUFBUyxPQUFULEVBQWtCLFVBQWxCLENBRlc7QUFHbEJDLElBQUFBLEVBQUUsRUFBRSxZQUFBQyxJQUFJLEVBQUk7QUFDVkMsTUFBQUEsT0FBTyxDQUFDQyxLQUFSLDBEQUNvREYsSUFEcEQsWUFFRUgsS0FGRjtBQUlEO0FBUmlCLEdBQXBCO0FBV0EseUNBQ0tQLFNBREwsRUFFSywrQkFBaUJPLEtBQUssQ0FBQ00sSUFBdkIsQ0FGTCxzRUFHR1QsVUFISDtBQUlJVSxJQUFBQSxNQUFNLEVBQUVDLHlCQUFjQztBQUoxQixLQUtPLCtCQUFpQlQsS0FBSyxDQUFDVSxLQUF2QixDQUxQLGtEQU9HWixhQVBIO0FBUUlhLElBQUFBLE1BQU0sRUFBRTtBQVJaLEtBU08sK0JBQWlCWCxLQUFLLENBQUNZLFFBQXZCLENBVFA7QUFZRCxDQXhCRDs7ZUEwQmViLHdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2tpbmdPcmRlciB9IGZyb20gJy4uLy4uL2NvbnN0YW50cydcbmltcG9ydCBtaXNzaW5nU3RhdGVXYXJuaW5nIGZyb20gJy4vbWlzc2luZ1N0YXRlV2FybmluZydcbmltcG9ydCBjcmVhdGVBcHBlYXJhbmNlIGZyb20gJy4vY3JlYXRlQXBwZWFyYW5jZSdcblxuY29uc3QgYmFzZVN0eWxlID0ge1xuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgZGlzcGxheTogJ2lubGluZS1mbGV4JyxcbiAgZmxleFdyYXA6ICd3cmFwJ1xufVxuXG5jb25zdCBmb2N1c1N0YXRlID0gJyZbYXJpYS1hY3RpdmVkZXNjZW5kYW50XSdcbmNvbnN0IGRpc2FibGVkU3RhdGUgPSAnJlthcmlhLWRpc2FibGVkPVwidHJ1ZVwiXSdcblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gaXRlbXMgLSBvYmplY3Qgd2l0aCBhIHNldCBvZiBzdGF0ZXMuXG4gKiBAcmV0dXJuIHtvYmplY3R9IHRoZSBmaW5hbCBhcHBlYXJhbmNlLlxuICovXG5jb25zdCBjcmVhdGVUYWdJbnB1dEFwcGVhcmFuY2UgPSAoaXRlbXMgPSB7fSkgPT4ge1xuICBtaXNzaW5nU3RhdGVXYXJuaW5nKHtcbiAgICBpdGVtcyxcbiAgICBwcm9wczogWydiYXNlJywgJ2ZvY3VzJywgJ2Rpc2FibGVkJ10sXG4gICAgY2I6IHByb3AgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgYFRoZW1lci5jcmVhdGVUYWdJbnB1dEFwcGVhcmFuY2UoKSBpcyBtaXNzaW5nIGEgJHtwcm9wfSBpdGVtYCxcbiAgICAgICAgaXRlbXNcbiAgICAgIClcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICAuLi5iYXNlU3R5bGUsXG4gICAgLi4uY3JlYXRlQXBwZWFyYW5jZShpdGVtcy5iYXNlKSxcbiAgICBbZm9jdXNTdGF0ZV06IHtcbiAgICAgIHpJbmRleDogU3RhY2tpbmdPcmRlci5GT0NVU0VELFxuICAgICAgLi4uY3JlYXRlQXBwZWFyYW5jZShpdGVtcy5mb2N1cylcbiAgICB9LFxuICAgIFtkaXNhYmxlZFN0YXRlXToge1xuICAgICAgY3Vyc29yOiAnbm90LWFsbG93ZWQnLFxuICAgICAgLi4uY3JlYXRlQXBwZWFyYW5jZShpdGVtcy5kaXNhYmxlZClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlVGFnSW5wdXRBcHBlYXJhbmNlXG4iXX0=