"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isDev = _interopRequireDefault(require("./isDev"));

var whitelist = ['background', 'backgroundColor', 'backgroundImage', 'borderRadius', 'transition', 'boxShadow', 'opacity', 'color', 'textShadow', 'outline', // Not sure if cursor should be configurable
'cursor', // Added to prevent pointer events on disabled tab
'pointerEvents'];
/**
 * @param {object?} obj - input object that will be filtered against the whitelist.
 * @return {object} the result will always be a object
 */

function createAppearance() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var result = {};
  Object.keys(obj).forEach(function (key) {
    if (whitelist.includes(key)) {
      if (typeof obj[key] === 'string' || typeof obj[key] === 'number') {
        result[key] = obj[key];
      } else if (_isDev.default) {
        console.error("createAppearance() only accepts strings as properties, key '".concat(key, "' with value '").concat(obj[key], "' is not a string"));
      }
    } else if (_isDev.default) {
      console.error("createAppearance() only accepts whitelisted properties, key '".concat(key, "' is not whitelisted in whitelist:"), whitelist);
    }
  });
  return result;
}

var _default = createAppearance;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aGVtZXIvc3JjL2NyZWF0ZUFwcGVhcmFuY2UuanMiXSwibmFtZXMiOlsid2hpdGVsaXN0IiwiY3JlYXRlQXBwZWFyYW5jZSIsIm9iaiIsInJlc3VsdCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiaW5jbHVkZXMiLCJpc0RldiIsImNvbnNvbGUiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBRUEsSUFBTUEsU0FBUyxHQUFHLENBQ2hCLFlBRGdCLEVBRWhCLGlCQUZnQixFQUdoQixpQkFIZ0IsRUFLaEIsY0FMZ0IsRUFPaEIsWUFQZ0IsRUFRaEIsV0FSZ0IsRUFTaEIsU0FUZ0IsRUFXaEIsT0FYZ0IsRUFZaEIsWUFaZ0IsRUFjaEIsU0FkZ0IsRUFlaEI7QUFDQSxRQWhCZ0IsRUFrQmhCO0FBQ0EsZUFuQmdCLENBQWxCO0FBc0JBOzs7OztBQUlBLFNBQVNDLGdCQUFULEdBQW9DO0FBQUEsTUFBVkMsR0FBVSx1RUFBSixFQUFJO0FBQ2xDLE1BQU1DLE1BQU0sR0FBRyxFQUFmO0FBRUFDLEVBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZSCxHQUFaLEVBQWlCSSxPQUFqQixDQUF5QixVQUFBQyxHQUFHLEVBQUk7QUFDOUIsUUFBSVAsU0FBUyxDQUFDUSxRQUFWLENBQW1CRCxHQUFuQixDQUFKLEVBQTZCO0FBQzNCLFVBQUksT0FBT0wsR0FBRyxDQUFDSyxHQUFELENBQVYsS0FBb0IsUUFBcEIsSUFBZ0MsT0FBT0wsR0FBRyxDQUFDSyxHQUFELENBQVYsS0FBb0IsUUFBeEQsRUFBa0U7QUFDaEVKLFFBQUFBLE1BQU0sQ0FBQ0ksR0FBRCxDQUFOLEdBQWNMLEdBQUcsQ0FBQ0ssR0FBRCxDQUFqQjtBQUNELE9BRkQsTUFFTyxJQUFJRSxjQUFKLEVBQVc7QUFDaEJDLFFBQUFBLE9BQU8sQ0FBQ0MsS0FBUix1RUFDaUVKLEdBRGpFLDJCQUVJTCxHQUFHLENBQUNLLEdBQUQsQ0FGUDtBQUtEO0FBQ0YsS0FWRCxNQVVPLElBQUlFLGNBQUosRUFBVztBQUNoQkMsTUFBQUEsT0FBTyxDQUFDQyxLQUFSLHdFQUNrRUosR0FEbEUseUNBRUVQLFNBRkY7QUFJRDtBQUNGLEdBakJEO0FBbUJBLFNBQU9HLE1BQVA7QUFDRDs7ZUFFY0YsZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaXNEZXYgZnJvbSAnLi9pc0RldidcblxuY29uc3Qgd2hpdGVsaXN0ID0gW1xuICAnYmFja2dyb3VuZCcsXG4gICdiYWNrZ3JvdW5kQ29sb3InLFxuICAnYmFja2dyb3VuZEltYWdlJyxcblxuICAnYm9yZGVyUmFkaXVzJyxcblxuICAndHJhbnNpdGlvbicsXG4gICdib3hTaGFkb3cnLFxuICAnb3BhY2l0eScsXG5cbiAgJ2NvbG9yJyxcbiAgJ3RleHRTaGFkb3cnLFxuXG4gICdvdXRsaW5lJyxcbiAgLy8gTm90IHN1cmUgaWYgY3Vyc29yIHNob3VsZCBiZSBjb25maWd1cmFibGVcbiAgJ2N1cnNvcicsXG5cbiAgLy8gQWRkZWQgdG8gcHJldmVudCBwb2ludGVyIGV2ZW50cyBvbiBkaXNhYmxlZCB0YWJcbiAgJ3BvaW50ZXJFdmVudHMnXG5dXG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3Q/fSBvYmogLSBpbnB1dCBvYmplY3QgdGhhdCB3aWxsIGJlIGZpbHRlcmVkIGFnYWluc3QgdGhlIHdoaXRlbGlzdC5cbiAqIEByZXR1cm4ge29iamVjdH0gdGhlIHJlc3VsdCB3aWxsIGFsd2F5cyBiZSBhIG9iamVjdFxuICovXG5mdW5jdGlvbiBjcmVhdGVBcHBlYXJhbmNlKG9iaiA9IHt9KSB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9XG5cbiAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgaWYgKHdoaXRlbGlzdC5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICBpZiAodHlwZW9mIG9ialtrZXldID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygb2JqW2tleV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gb2JqW2tleV1cbiAgICAgIH0gZWxzZSBpZiAoaXNEZXYpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBgY3JlYXRlQXBwZWFyYW5jZSgpIG9ubHkgYWNjZXB0cyBzdHJpbmdzIGFzIHByb3BlcnRpZXMsIGtleSAnJHtrZXl9JyB3aXRoIHZhbHVlICcke1xuICAgICAgICAgICAgb2JqW2tleV1cbiAgICAgICAgICB9JyBpcyBub3QgYSBzdHJpbmdgXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRGV2KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICBgY3JlYXRlQXBwZWFyYW5jZSgpIG9ubHkgYWNjZXB0cyB3aGl0ZWxpc3RlZCBwcm9wZXJ0aWVzLCBrZXkgJyR7a2V5fScgaXMgbm90IHdoaXRlbGlzdGVkIGluIHdoaXRlbGlzdDpgLFxuICAgICAgICB3aGl0ZWxpc3RcbiAgICAgIClcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVBcHBlYXJhbmNlXG4iXX0=