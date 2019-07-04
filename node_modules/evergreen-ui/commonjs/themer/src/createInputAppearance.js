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
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  border: 'none'
};
var invalidState = '&[aria-invalid="true"]';
var placeholder = '&::placeholder';
var focusState = '&:focus';
var disabledState = '&:disabled';
/**
 * @param {object} items - object with a set of states.
 * @return {object} the final appearance.
 */

var createInputAppearance = function createInputAppearance() {
  var _objectSpread2;

  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _missingStateWarning.default)({
    items: items,
    props: ['base', 'invalid', 'placeholder', 'focus', 'disabled'],
    cb: function cb(prop) {
      console.error("Themer.createInputAppearance() is missing a ".concat(prop, " item"), items);
    }
  });
  return (0, _objectSpread3.default)({}, baseStyle, (0, _createAppearance.default)(items.base), (_objectSpread2 = {}, (0, _defineProperty2.default)(_objectSpread2, invalidState, (0, _createAppearance.default)(items.invalid)), (0, _defineProperty2.default)(_objectSpread2, placeholder, (0, _createAppearance.default)(items.placeholder)), (0, _defineProperty2.default)(_objectSpread2, focusState, (0, _objectSpread3.default)({
    zIndex: _constants.StackingOrder.FOCUSED
  }, (0, _createAppearance.default)(items.focus))), (0, _defineProperty2.default)(_objectSpread2, disabledState, (0, _objectSpread3.default)({
    cursor: 'not-allowed'
  }, (0, _createAppearance.default)(items.disabled))), _objectSpread2));
};

var _default = createInputAppearance;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aGVtZXIvc3JjL2NyZWF0ZUlucHV0QXBwZWFyYW5jZS5qcyJdLCJuYW1lcyI6WyJiYXNlU3R5bGUiLCJXZWJraXRBcHBlYXJhbmNlIiwiTW96QXBwZWFyYW5jZSIsImJvcmRlciIsImludmFsaWRTdGF0ZSIsInBsYWNlaG9sZGVyIiwiZm9jdXNTdGF0ZSIsImRpc2FibGVkU3RhdGUiLCJjcmVhdGVJbnB1dEFwcGVhcmFuY2UiLCJpdGVtcyIsInByb3BzIiwiY2IiLCJwcm9wIiwiY29uc29sZSIsImVycm9yIiwiYmFzZSIsImludmFsaWQiLCJ6SW5kZXgiLCJTdGFja2luZ09yZGVyIiwiRk9DVVNFRCIsImZvY3VzIiwiY3Vyc29yIiwiZGlzYWJsZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFFQSxJQUFNQSxTQUFTLEdBQUc7QUFDaEJDLEVBQUFBLGdCQUFnQixFQUFFLE1BREY7QUFFaEJDLEVBQUFBLGFBQWEsRUFBRSxNQUZDO0FBR2hCQyxFQUFBQSxNQUFNLEVBQUU7QUFIUSxDQUFsQjtBQU1BLElBQU1DLFlBQVksR0FBRyx3QkFBckI7QUFDQSxJQUFNQyxXQUFXLEdBQUcsZ0JBQXBCO0FBQ0EsSUFBTUMsVUFBVSxHQUFHLFNBQW5CO0FBQ0EsSUFBTUMsYUFBYSxHQUFHLFlBQXRCO0FBRUE7Ozs7O0FBSUEsSUFBTUMscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QixHQUFnQjtBQUFBOztBQUFBLE1BQWZDLEtBQWUsdUVBQVAsRUFBTztBQUM1QyxvQ0FBb0I7QUFDbEJBLElBQUFBLEtBQUssRUFBTEEsS0FEa0I7QUFFbEJDLElBQUFBLEtBQUssRUFBRSxDQUFDLE1BQUQsRUFBUyxTQUFULEVBQW9CLGFBQXBCLEVBQW1DLE9BQW5DLEVBQTRDLFVBQTVDLENBRlc7QUFHbEJDLElBQUFBLEVBQUUsRUFBRSxZQUFBQyxJQUFJLEVBQUk7QUFDVkMsTUFBQUEsT0FBTyxDQUFDQyxLQUFSLHVEQUNpREYsSUFEakQsWUFFRUgsS0FGRjtBQUlEO0FBUmlCLEdBQXBCO0FBV0EseUNBQ0tULFNBREwsRUFFSywrQkFBaUJTLEtBQUssQ0FBQ00sSUFBdkIsQ0FGTCxzRUFHR1gsWUFISCxFQUdrQiwrQkFBaUJLLEtBQUssQ0FBQ08sT0FBdkIsQ0FIbEIsaURBSUdYLFdBSkgsRUFJaUIsK0JBQWlCSSxLQUFLLENBQUNKLFdBQXZCLENBSmpCLGlEQUtHQyxVQUxIO0FBTUlXLElBQUFBLE1BQU0sRUFBRUMseUJBQWNDO0FBTjFCLEtBT08sK0JBQWlCVixLQUFLLENBQUNXLEtBQXZCLENBUFAsa0RBU0diLGFBVEg7QUFVSWMsSUFBQUEsTUFBTSxFQUFFO0FBVlosS0FXTywrQkFBaUJaLEtBQUssQ0FBQ2EsUUFBdkIsQ0FYUDtBQWNELENBMUJEOztlQTRCZWQscUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFja2luZ09yZGVyIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJ1xuaW1wb3J0IG1pc3NpbmdTdGF0ZVdhcm5pbmcgZnJvbSAnLi9taXNzaW5nU3RhdGVXYXJuaW5nJ1xuaW1wb3J0IGNyZWF0ZUFwcGVhcmFuY2UgZnJvbSAnLi9jcmVhdGVBcHBlYXJhbmNlJ1xuXG5jb25zdCBiYXNlU3R5bGUgPSB7XG4gIFdlYmtpdEFwcGVhcmFuY2U6ICdub25lJyxcbiAgTW96QXBwZWFyYW5jZTogJ25vbmUnLFxuICBib3JkZXI6ICdub25lJ1xufVxuXG5jb25zdCBpbnZhbGlkU3RhdGUgPSAnJlthcmlhLWludmFsaWQ9XCJ0cnVlXCJdJ1xuY29uc3QgcGxhY2Vob2xkZXIgPSAnJjo6cGxhY2Vob2xkZXInXG5jb25zdCBmb2N1c1N0YXRlID0gJyY6Zm9jdXMnXG5jb25zdCBkaXNhYmxlZFN0YXRlID0gJyY6ZGlzYWJsZWQnXG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IGl0ZW1zIC0gb2JqZWN0IHdpdGggYSBzZXQgb2Ygc3RhdGVzLlxuICogQHJldHVybiB7b2JqZWN0fSB0aGUgZmluYWwgYXBwZWFyYW5jZS5cbiAqL1xuY29uc3QgY3JlYXRlSW5wdXRBcHBlYXJhbmNlID0gKGl0ZW1zID0ge30pID0+IHtcbiAgbWlzc2luZ1N0YXRlV2FybmluZyh7XG4gICAgaXRlbXMsXG4gICAgcHJvcHM6IFsnYmFzZScsICdpbnZhbGlkJywgJ3BsYWNlaG9sZGVyJywgJ2ZvY3VzJywgJ2Rpc2FibGVkJ10sXG4gICAgY2I6IHByb3AgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgYFRoZW1lci5jcmVhdGVJbnB1dEFwcGVhcmFuY2UoKSBpcyBtaXNzaW5nIGEgJHtwcm9wfSBpdGVtYCxcbiAgICAgICAgaXRlbXNcbiAgICAgIClcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICAuLi5iYXNlU3R5bGUsXG4gICAgLi4uY3JlYXRlQXBwZWFyYW5jZShpdGVtcy5iYXNlKSxcbiAgICBbaW52YWxpZFN0YXRlXTogY3JlYXRlQXBwZWFyYW5jZShpdGVtcy5pbnZhbGlkKSxcbiAgICBbcGxhY2Vob2xkZXJdOiBjcmVhdGVBcHBlYXJhbmNlKGl0ZW1zLnBsYWNlaG9sZGVyKSxcbiAgICBbZm9jdXNTdGF0ZV06IHtcbiAgICAgIHpJbmRleDogU3RhY2tpbmdPcmRlci5GT0NVU0VELFxuICAgICAgLi4uY3JlYXRlQXBwZWFyYW5jZShpdGVtcy5mb2N1cylcbiAgICB9LFxuICAgIFtkaXNhYmxlZFN0YXRlXToge1xuICAgICAgY3Vyc29yOiAnbm90LWFsbG93ZWQnLFxuICAgICAgLi4uY3JlYXRlQXBwZWFyYW5jZShpdGVtcy5kaXNhYmxlZClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSW5wdXRBcHBlYXJhbmNlXG4iXX0=