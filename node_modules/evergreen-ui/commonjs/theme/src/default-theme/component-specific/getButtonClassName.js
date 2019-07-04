"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _themer = require("../../../../themer");

var _memoizeClassName = _interopRequireDefault(require("../utils/memoizeClassName"));

var _scales = _interopRequireDefault(require("../foundational-styles/scales"));

var _helpers = require("../helpers");

var _shared = require("../shared");

/**
 * Disabled styles are all the same for all buttons.
 */
var disabled = _shared.defaultControlStyles.disabled;
/**
 * Get button appearance.
 * @param {string} appearance - default, primary, minimal.
 * @param {string} intent - none, success, warning, danger.
 * @return {Object} the appearance of the button.
 */

var getButtonAppearance = function getButtonAppearance(appearance, intent) {
  switch (appearance) {
    case 'primary':
      {
        var _getPrimaryButtonStyl = (0, _helpers.getPrimaryButtonStylesForIntent)(intent),
            linearGradient = _getPrimaryButtonStyl.linearGradient,
            focusColor = _getPrimaryButtonStyl.focusColor;

        return _themer.Themer.createButtonAppearance({
          disabled: disabled,
          base: {
            color: 'white',
            backgroundColor: 'white',
            backgroundImage: linearGradient.base,
            boxShadow: "inset 0 0 0 1px ".concat(_scales.default.neutral.N5A, ", inset 0 -1px 1px 0 ").concat(_scales.default.neutral.N2A)
          },
          hover: {
            backgroundImage: linearGradient.hover
          },
          focus: {
            boxShadow: "0 0 0 3px ".concat(focusColor, ", inset 0 0 0 1px ").concat(_scales.default.neutral.N4A, ", inset 0 -1px 1px 0 ").concat(_scales.default.neutral.N5A)
          },
          active: {
            backgroundImage: linearGradient.active,
            boxShadow: "inset 0 0 0 1px ".concat(_scales.default.neutral.N4A, ", inset 0 1px 1px 0 ").concat(_scales.default.neutral.N2A)
          },
          focusAndActive: {
            boxShadow: "0 0 0 3px ".concat(focusColor, ", inset 0 0 0 1px ").concat(_scales.default.neutral.N4A, ", inset 0 1px 1px 0 ").concat(_scales.default.neutral.N2A)
          }
        });
      }

    case 'minimal':
      {
        var intentTextColor = (0, _helpers.getTextColorForIntent)(intent, _scales.default.blue.B9);
        return _themer.Themer.createButtonAppearance({
          disabled: disabled,
          base: {
            color: intentTextColor,
            backgroundColor: 'transparent'
          },
          hover: {
            backgroundColor: _scales.default.neutral.N2A
          },
          focus: {
            boxShadow: "0 0 0 3px ".concat(_scales.default.blue.B5A)
          },
          active: {
            backgroundImage: 'none',
            backgroundColor: _scales.default.blue.B3A
          },
          focusAndActive: {}
        });
      }

    case 'default':
    default:
      {
        var _intentTextColor = (0, _helpers.getTextColorForIntent)(intent);

        return _themer.Themer.createButtonAppearance({
          disabled: disabled,
          base: (0, _objectSpread2.default)({
            color: _intentTextColor
          }, _shared.defaultControlStyles.base),
          hover: _shared.defaultControlStyles.hover,
          focus: _shared.defaultControlStyles.focus,
          active: _shared.defaultControlStyles.active,
          focusAndActive: _shared.defaultControlStyles.focusAndActive
        });
      }
  }
};
/**
 * Get the className of a `Button`|`IconButton`.
 * @param {string} appearance - default, primary, minimal.
 * @param {Intent} intent - none, success, warning, danger.
 * @return {string} the appearance class name.
 */


var _default = (0, _memoizeClassName.default)(getButtonAppearance);

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy90aGVtZS9zcmMvZGVmYXVsdC10aGVtZS9jb21wb25lbnQtc3BlY2lmaWMvZ2V0QnV0dG9uQ2xhc3NOYW1lLmpzIl0sIm5hbWVzIjpbImRpc2FibGVkIiwiZGVmYXVsdENvbnRyb2xTdHlsZXMiLCJnZXRCdXR0b25BcHBlYXJhbmNlIiwiYXBwZWFyYW5jZSIsImludGVudCIsImxpbmVhckdyYWRpZW50IiwiZm9jdXNDb2xvciIsIlRoZW1lciIsImNyZWF0ZUJ1dHRvbkFwcGVhcmFuY2UiLCJiYXNlIiwiY29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJib3hTaGFkb3ciLCJzY2FsZXMiLCJuZXV0cmFsIiwiTjVBIiwiTjJBIiwiaG92ZXIiLCJmb2N1cyIsIk40QSIsImFjdGl2ZSIsImZvY3VzQW5kQWN0aXZlIiwiaW50ZW50VGV4dENvbG9yIiwiYmx1ZSIsIkI5IiwiQjVBIiwiQjNBIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUlBOztBQUVBOzs7SUFHUUEsUSxHQUFhQyw0QixDQUFiRCxRO0FBRVI7Ozs7Ozs7QUFNQSxJQUFNRSxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLENBQUNDLFVBQUQsRUFBYUMsTUFBYixFQUF3QjtBQUNsRCxVQUFRRCxVQUFSO0FBQ0UsU0FBSyxTQUFMO0FBQWdCO0FBQUEsb0NBQ3lCLDhDQUNyQ0MsTUFEcUMsQ0FEekI7QUFBQSxZQUNOQyxjQURNLHlCQUNOQSxjQURNO0FBQUEsWUFDVUMsVUFEVix5QkFDVUEsVUFEVjs7QUFJZCxlQUFPQyxlQUFPQyxzQkFBUCxDQUE4QjtBQUNuQ1IsVUFBQUEsUUFBUSxFQUFSQSxRQURtQztBQUVuQ1MsVUFBQUEsSUFBSSxFQUFFO0FBQ0pDLFlBQUFBLEtBQUssRUFBRSxPQURIO0FBRUpDLFlBQUFBLGVBQWUsRUFBRSxPQUZiO0FBR0pDLFlBQUFBLGVBQWUsRUFBRVAsY0FBYyxDQUFDSSxJQUg1QjtBQUlKSSxZQUFBQSxTQUFTLDRCQUNQQyxnQkFBT0MsT0FBUCxDQUFlQyxHQURSLGtDQUVlRixnQkFBT0MsT0FBUCxDQUFlRSxHQUY5QjtBQUpMLFdBRjZCO0FBVW5DQyxVQUFBQSxLQUFLLEVBQUU7QUFDTE4sWUFBQUEsZUFBZSxFQUFFUCxjQUFjLENBQUNhO0FBRDNCLFdBVjRCO0FBYW5DQyxVQUFBQSxLQUFLLEVBQUU7QUFDTE4sWUFBQUEsU0FBUyxzQkFBZVAsVUFBZiwrQkFDUFEsZ0JBQU9DLE9BQVAsQ0FBZUssR0FEUixrQ0FFZU4sZ0JBQU9DLE9BQVAsQ0FBZUMsR0FGOUI7QUFESixXQWI0QjtBQWtCbkNLLFVBQUFBLE1BQU0sRUFBRTtBQUNOVCxZQUFBQSxlQUFlLEVBQUVQLGNBQWMsQ0FBQ2dCLE1BRDFCO0FBRU5SLFlBQUFBLFNBQVMsNEJBQ1BDLGdCQUFPQyxPQUFQLENBQWVLLEdBRFIsaUNBRWNOLGdCQUFPQyxPQUFQLENBQWVFLEdBRjdCO0FBRkgsV0FsQjJCO0FBd0JuQ0ssVUFBQUEsY0FBYyxFQUFFO0FBQ2RULFlBQUFBLFNBQVMsc0JBQWVQLFVBQWYsK0JBQ1BRLGdCQUFPQyxPQUFQLENBQWVLLEdBRFIsaUNBRWNOLGdCQUFPQyxPQUFQLENBQWVFLEdBRjdCO0FBREs7QUF4Qm1CLFNBQTlCLENBQVA7QUE4QkQ7O0FBRUQsU0FBSyxTQUFMO0FBQWdCO0FBQ2QsWUFBTU0sZUFBZSxHQUFHLG9DQUFzQm5CLE1BQXRCLEVBQThCVSxnQkFBT1UsSUFBUCxDQUFZQyxFQUExQyxDQUF4QjtBQUNBLGVBQU9sQixlQUFPQyxzQkFBUCxDQUE4QjtBQUNuQ1IsVUFBQUEsUUFBUSxFQUFSQSxRQURtQztBQUVuQ1MsVUFBQUEsSUFBSSxFQUFFO0FBQ0pDLFlBQUFBLEtBQUssRUFBRWEsZUFESDtBQUVKWixZQUFBQSxlQUFlLEVBQUU7QUFGYixXQUY2QjtBQU1uQ08sVUFBQUEsS0FBSyxFQUFFO0FBQ0xQLFlBQUFBLGVBQWUsRUFBRUcsZ0JBQU9DLE9BQVAsQ0FBZUU7QUFEM0IsV0FONEI7QUFTbkNFLFVBQUFBLEtBQUssRUFBRTtBQUNMTixZQUFBQSxTQUFTLHNCQUFlQyxnQkFBT1UsSUFBUCxDQUFZRSxHQUEzQjtBQURKLFdBVDRCO0FBWW5DTCxVQUFBQSxNQUFNLEVBQUU7QUFDTlQsWUFBQUEsZUFBZSxFQUFFLE1BRFg7QUFFTkQsWUFBQUEsZUFBZSxFQUFFRyxnQkFBT1UsSUFBUCxDQUFZRztBQUZ2QixXQVoyQjtBQWdCbkNMLFVBQUFBLGNBQWMsRUFBRTtBQWhCbUIsU0FBOUIsQ0FBUDtBQWtCRDs7QUFFRCxTQUFLLFNBQUw7QUFDQTtBQUFTO0FBQ1AsWUFBTUMsZ0JBQWUsR0FBRyxvQ0FBc0JuQixNQUF0QixDQUF4Qjs7QUFDQSxlQUFPRyxlQUFPQyxzQkFBUCxDQUE4QjtBQUNuQ1IsVUFBQUEsUUFBUSxFQUFSQSxRQURtQztBQUVuQ1MsVUFBQUEsSUFBSTtBQUNGQyxZQUFBQSxLQUFLLEVBQUVhO0FBREwsYUFFQ3RCLDZCQUFxQlEsSUFGdEIsQ0FGK0I7QUFNbkNTLFVBQUFBLEtBQUssRUFBRWpCLDZCQUFxQmlCLEtBTk87QUFPbkNDLFVBQUFBLEtBQUssRUFBRWxCLDZCQUFxQmtCLEtBUE87QUFRbkNFLFVBQUFBLE1BQU0sRUFBRXBCLDZCQUFxQm9CLE1BUk07QUFTbkNDLFVBQUFBLGNBQWMsRUFBRXJCLDZCQUFxQnFCO0FBVEYsU0FBOUIsQ0FBUDtBQVdEO0FBekVIO0FBMkVELENBNUVEO0FBOEVBOzs7Ozs7OztlQU1lLCtCQUFpQnBCLG1CQUFqQixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGhlbWVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vdGhlbWVyJ1xuaW1wb3J0IG1lbW9pemVDbGFzc05hbWUgZnJvbSAnLi4vdXRpbHMvbWVtb2l6ZUNsYXNzTmFtZSdcbmltcG9ydCBzY2FsZXMgZnJvbSAnLi4vZm91bmRhdGlvbmFsLXN0eWxlcy9zY2FsZXMnXG5pbXBvcnQge1xuICBnZXRUZXh0Q29sb3JGb3JJbnRlbnQsXG4gIGdldFByaW1hcnlCdXR0b25TdHlsZXNGb3JJbnRlbnRcbn0gZnJvbSAnLi4vaGVscGVycydcbmltcG9ydCB7IGRlZmF1bHRDb250cm9sU3R5bGVzIH0gZnJvbSAnLi4vc2hhcmVkJ1xuXG4vKipcbiAqIERpc2FibGVkIHN0eWxlcyBhcmUgYWxsIHRoZSBzYW1lIGZvciBhbGwgYnV0dG9ucy5cbiAqL1xuY29uc3QgeyBkaXNhYmxlZCB9ID0gZGVmYXVsdENvbnRyb2xTdHlsZXNcblxuLyoqXG4gKiBHZXQgYnV0dG9uIGFwcGVhcmFuY2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBwZWFyYW5jZSAtIGRlZmF1bHQsIHByaW1hcnksIG1pbmltYWwuXG4gKiBAcGFyYW0ge3N0cmluZ30gaW50ZW50IC0gbm9uZSwgc3VjY2Vzcywgd2FybmluZywgZGFuZ2VyLlxuICogQHJldHVybiB7T2JqZWN0fSB0aGUgYXBwZWFyYW5jZSBvZiB0aGUgYnV0dG9uLlxuICovXG5jb25zdCBnZXRCdXR0b25BcHBlYXJhbmNlID0gKGFwcGVhcmFuY2UsIGludGVudCkgPT4ge1xuICBzd2l0Y2ggKGFwcGVhcmFuY2UpIHtcbiAgICBjYXNlICdwcmltYXJ5Jzoge1xuICAgICAgY29uc3QgeyBsaW5lYXJHcmFkaWVudCwgZm9jdXNDb2xvciB9ID0gZ2V0UHJpbWFyeUJ1dHRvblN0eWxlc0ZvckludGVudChcbiAgICAgICAgaW50ZW50XG4gICAgICApXG4gICAgICByZXR1cm4gVGhlbWVyLmNyZWF0ZUJ1dHRvbkFwcGVhcmFuY2Uoe1xuICAgICAgICBkaXNhYmxlZCxcbiAgICAgICAgYmFzZToge1xuICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGxpbmVhckdyYWRpZW50LmJhc2UsXG4gICAgICAgICAgYm94U2hhZG93OiBgaW5zZXQgMCAwIDAgMXB4ICR7XG4gICAgICAgICAgICBzY2FsZXMubmV1dHJhbC5ONUFcbiAgICAgICAgICB9LCBpbnNldCAwIC0xcHggMXB4IDAgJHtzY2FsZXMubmV1dHJhbC5OMkF9YFxuICAgICAgICB9LFxuICAgICAgICBob3Zlcjoge1xuICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogbGluZWFyR3JhZGllbnQuaG92ZXJcbiAgICAgICAgfSxcbiAgICAgICAgZm9jdXM6IHtcbiAgICAgICAgICBib3hTaGFkb3c6IGAwIDAgMCAzcHggJHtmb2N1c0NvbG9yfSwgaW5zZXQgMCAwIDAgMXB4ICR7XG4gICAgICAgICAgICBzY2FsZXMubmV1dHJhbC5ONEFcbiAgICAgICAgICB9LCBpbnNldCAwIC0xcHggMXB4IDAgJHtzY2FsZXMubmV1dHJhbC5ONUF9YFxuICAgICAgICB9LFxuICAgICAgICBhY3RpdmU6IHtcbiAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGxpbmVhckdyYWRpZW50LmFjdGl2ZSxcbiAgICAgICAgICBib3hTaGFkb3c6IGBpbnNldCAwIDAgMCAxcHggJHtcbiAgICAgICAgICAgIHNjYWxlcy5uZXV0cmFsLk40QVxuICAgICAgICAgIH0sIGluc2V0IDAgMXB4IDFweCAwICR7c2NhbGVzLm5ldXRyYWwuTjJBfWBcbiAgICAgICAgfSxcbiAgICAgICAgZm9jdXNBbmRBY3RpdmU6IHtcbiAgICAgICAgICBib3hTaGFkb3c6IGAwIDAgMCAzcHggJHtmb2N1c0NvbG9yfSwgaW5zZXQgMCAwIDAgMXB4ICR7XG4gICAgICAgICAgICBzY2FsZXMubmV1dHJhbC5ONEFcbiAgICAgICAgICB9LCBpbnNldCAwIDFweCAxcHggMCAke3NjYWxlcy5uZXV0cmFsLk4yQX1gXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgY2FzZSAnbWluaW1hbCc6IHtcbiAgICAgIGNvbnN0IGludGVudFRleHRDb2xvciA9IGdldFRleHRDb2xvckZvckludGVudChpbnRlbnQsIHNjYWxlcy5ibHVlLkI5KVxuICAgICAgcmV0dXJuIFRoZW1lci5jcmVhdGVCdXR0b25BcHBlYXJhbmNlKHtcbiAgICAgICAgZGlzYWJsZWQsXG4gICAgICAgIGJhc2U6IHtcbiAgICAgICAgICBjb2xvcjogaW50ZW50VGV4dENvbG9yLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50J1xuICAgICAgICB9LFxuICAgICAgICBob3Zlcjoge1xuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogc2NhbGVzLm5ldXRyYWwuTjJBXG4gICAgICAgIH0sXG4gICAgICAgIGZvY3VzOiB7XG4gICAgICAgICAgYm94U2hhZG93OiBgMCAwIDAgM3B4ICR7c2NhbGVzLmJsdWUuQjVBfWBcbiAgICAgICAgfSxcbiAgICAgICAgYWN0aXZlOiB7XG4gICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAnbm9uZScsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBzY2FsZXMuYmx1ZS5CM0FcbiAgICAgICAgfSxcbiAgICAgICAgZm9jdXNBbmRBY3RpdmU6IHt9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGNhc2UgJ2RlZmF1bHQnOlxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIGNvbnN0IGludGVudFRleHRDb2xvciA9IGdldFRleHRDb2xvckZvckludGVudChpbnRlbnQpXG4gICAgICByZXR1cm4gVGhlbWVyLmNyZWF0ZUJ1dHRvbkFwcGVhcmFuY2Uoe1xuICAgICAgICBkaXNhYmxlZCxcbiAgICAgICAgYmFzZToge1xuICAgICAgICAgIGNvbG9yOiBpbnRlbnRUZXh0Q29sb3IsXG4gICAgICAgICAgLi4uZGVmYXVsdENvbnRyb2xTdHlsZXMuYmFzZVxuICAgICAgICB9LFxuICAgICAgICBob3ZlcjogZGVmYXVsdENvbnRyb2xTdHlsZXMuaG92ZXIsXG4gICAgICAgIGZvY3VzOiBkZWZhdWx0Q29udHJvbFN0eWxlcy5mb2N1cyxcbiAgICAgICAgYWN0aXZlOiBkZWZhdWx0Q29udHJvbFN0eWxlcy5hY3RpdmUsXG4gICAgICAgIGZvY3VzQW5kQWN0aXZlOiBkZWZhdWx0Q29udHJvbFN0eWxlcy5mb2N1c0FuZEFjdGl2ZVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBHZXQgdGhlIGNsYXNzTmFtZSBvZiBhIGBCdXR0b25gfGBJY29uQnV0dG9uYC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBhcHBlYXJhbmNlIC0gZGVmYXVsdCwgcHJpbWFyeSwgbWluaW1hbC5cbiAqIEBwYXJhbSB7SW50ZW50fSBpbnRlbnQgLSBub25lLCBzdWNjZXNzLCB3YXJuaW5nLCBkYW5nZXIuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBhcHBlYXJhbmNlIGNsYXNzIG5hbWUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IG1lbW9pemVDbGFzc05hbWUoZ2V0QnV0dG9uQXBwZWFyYW5jZSlcbiJdfQ==