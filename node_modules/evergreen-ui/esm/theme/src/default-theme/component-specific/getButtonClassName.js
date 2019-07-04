import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import { Themer } from '../../../../themer';
import memoizeClassName from '../utils/memoizeClassName';
import scales from '../foundational-styles/scales';
import { getTextColorForIntent, getPrimaryButtonStylesForIntent } from '../helpers';
import { defaultControlStyles } from '../shared';
/**
 * Disabled styles are all the same for all buttons.
 */

var disabled = defaultControlStyles.disabled;
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
        var _getPrimaryButtonStyl = getPrimaryButtonStylesForIntent(intent),
            linearGradient = _getPrimaryButtonStyl.linearGradient,
            focusColor = _getPrimaryButtonStyl.focusColor;

        return Themer.createButtonAppearance({
          disabled: disabled,
          base: {
            color: 'white',
            backgroundColor: 'white',
            backgroundImage: linearGradient.base,
            boxShadow: "inset 0 0 0 1px ".concat(scales.neutral.N5A, ", inset 0 -1px 1px 0 ").concat(scales.neutral.N2A)
          },
          hover: {
            backgroundImage: linearGradient.hover
          },
          focus: {
            boxShadow: "0 0 0 3px ".concat(focusColor, ", inset 0 0 0 1px ").concat(scales.neutral.N4A, ", inset 0 -1px 1px 0 ").concat(scales.neutral.N5A)
          },
          active: {
            backgroundImage: linearGradient.active,
            boxShadow: "inset 0 0 0 1px ".concat(scales.neutral.N4A, ", inset 0 1px 1px 0 ").concat(scales.neutral.N2A)
          },
          focusAndActive: {
            boxShadow: "0 0 0 3px ".concat(focusColor, ", inset 0 0 0 1px ").concat(scales.neutral.N4A, ", inset 0 1px 1px 0 ").concat(scales.neutral.N2A)
          }
        });
      }

    case 'minimal':
      {
        var intentTextColor = getTextColorForIntent(intent, scales.blue.B9);
        return Themer.createButtonAppearance({
          disabled: disabled,
          base: {
            color: intentTextColor,
            backgroundColor: 'transparent'
          },
          hover: {
            backgroundColor: scales.neutral.N2A
          },
          focus: {
            boxShadow: "0 0 0 3px ".concat(scales.blue.B5A)
          },
          active: {
            backgroundImage: 'none',
            backgroundColor: scales.blue.B3A
          },
          focusAndActive: {}
        });
      }

    case 'default':
    default:
      {
        var _intentTextColor = getTextColorForIntent(intent);

        return Themer.createButtonAppearance({
          disabled: disabled,
          base: _objectSpread({
            color: _intentTextColor
          }, defaultControlStyles.base),
          hover: defaultControlStyles.hover,
          focus: defaultControlStyles.focus,
          active: defaultControlStyles.active,
          focusAndActive: defaultControlStyles.focusAndActive
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


export default memoizeClassName(getButtonAppearance);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy90aGVtZS9zcmMvZGVmYXVsdC10aGVtZS9jb21wb25lbnQtc3BlY2lmaWMvZ2V0QnV0dG9uQ2xhc3NOYW1lLmpzIl0sIm5hbWVzIjpbIlRoZW1lciIsIm1lbW9pemVDbGFzc05hbWUiLCJzY2FsZXMiLCJnZXRUZXh0Q29sb3JGb3JJbnRlbnQiLCJnZXRQcmltYXJ5QnV0dG9uU3R5bGVzRm9ySW50ZW50IiwiZGVmYXVsdENvbnRyb2xTdHlsZXMiLCJkaXNhYmxlZCIsImdldEJ1dHRvbkFwcGVhcmFuY2UiLCJhcHBlYXJhbmNlIiwiaW50ZW50IiwibGluZWFyR3JhZGllbnQiLCJmb2N1c0NvbG9yIiwiY3JlYXRlQnV0dG9uQXBwZWFyYW5jZSIsImJhc2UiLCJjb2xvciIsImJhY2tncm91bmRDb2xvciIsImJhY2tncm91bmRJbWFnZSIsImJveFNoYWRvdyIsIm5ldXRyYWwiLCJONUEiLCJOMkEiLCJob3ZlciIsImZvY3VzIiwiTjRBIiwiYWN0aXZlIiwiZm9jdXNBbmRBY3RpdmUiLCJpbnRlbnRUZXh0Q29sb3IiLCJibHVlIiwiQjkiLCJCNUEiLCJCM0EiXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTQSxNQUFULFFBQXVCLG9CQUF2QjtBQUNBLE9BQU9DLGdCQUFQLE1BQTZCLDJCQUE3QjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsK0JBQW5CO0FBQ0EsU0FDRUMscUJBREYsRUFFRUMsK0JBRkYsUUFHTyxZQUhQO0FBSUEsU0FBU0Msb0JBQVQsUUFBcUMsV0FBckM7QUFFQTs7OztJQUdRQyxRLEdBQWFELG9CLENBQWJDLFE7QUFFUjs7Ozs7OztBQU1BLElBQU1DLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBc0IsQ0FBQ0MsVUFBRCxFQUFhQyxNQUFiLEVBQXdCO0FBQ2xELFVBQVFELFVBQVI7QUFDRSxTQUFLLFNBQUw7QUFBZ0I7QUFBQSxvQ0FDeUJKLCtCQUErQixDQUNwRUssTUFEb0UsQ0FEeEQ7QUFBQSxZQUNOQyxjQURNLHlCQUNO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QUNvQjtBQVRGLFNBQTlCLENBQVA7QUFXRDtBQXpFSDtBQTJFRCxDQTVFRDtBQThFQTs7Ozs7Ozs7QUFNQSxlQUFleEIsZ0JBQWdCLENBQUNNLG1CQUFELENBQS9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGhlbWVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vdGhlbWVyJ1xuaW1wb3J0IG1lbW9pemVDbGFzc05hbWUgZnJvbSAnLi4vdXRpbHMvbWVtb2l6ZUNsYXNzTmFtZSdcbmltcG9ydCBzY2FsZXMgZnJvbSAnLi4vZm91bmRhdGlvbmFsLXN0eWxlcy9zY2FsZXMnXG5pbXBvcnQge1xuICBnZXRUZXh0Q29sb3JGb3JJbnRlbnQsXG4gIGdldFByaW1hcnlCdXR0b25TdHlsZXNGb3JJbnRlbnRcbn0gZnJvbSAnLi4vaGVscGVycydcbmltcG9ydCB7IGRlZmF1bHRDb250cm9sU3R5bGVzIH0gZnJvbSAnLi4vc2hhcmVkJ1xuXG4vKipcbiAqIERpc2FibGVkIHN0eWxlcyBhcmUgYWxsIHRoZSBzYW1lIGZvciBhbGwgYnV0dG9ucy5cbiAqL1xuY29uc3QgeyBkaXNhYmxlZCB9ID0gZGVmYXVsdENvbnRyb2xTdHlsZXNcblxuLyoqXG4gKiBHZXQgYnV0dG9uIGFwcGVhcmFuY2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBwZWFyYW5jZSAtIGRlZmF1bHQsIHByaW1hcnksIG1pbmltYWwuXG4gKiBAcGFyYW0ge3N0cmluZ30gaW50ZW50IC0gbm9uZSwgc3VjY2Vzcywgd2FybmluZywgZGFuZ2VyLlxuICogQHJldHVybiB7T2JqZWN0fSB0aGUgYXBwZWFyYW5jZSBvZiB0aGUgYnV0dG9uLlxuICovXG5jb25zdCBnZXRCdXR0b25BcHBlYXJhbmNlID0gKGFwcGVhcmFuY2UsIGludGVudCkgPT4ge1xuICBzd2l0Y2ggKGFwcGVhcmFuY2UpIHtcbiAgICBjYXNlICdwcmltYXJ5Jzoge1xuICAgICAgY29uc3QgeyBsaW5lYXJHcmFkaWVudCwgZm9jdXNDb2xvciB9ID0gZ2V0UHJpbWFyeUJ1dHRvblN0eWxlc0ZvckludGVudChcbiAgICAgICAgaW50ZW50XG4gICAgICApXG4gICAgICByZXR1cm4gVGhlbWVyLmNyZWF0ZUJ1dHRvbkFwcGVhcmFuY2Uoe1xuICAgICAgICBkaXNhYmxlZCxcbiAgICAgICAgYmFzZToge1xuICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGxpbmVhckdyYWRpZW50LmJhc2UsXG4gICAgICAgICAgYm94U2hhZG93OiBgaW5zZXQgMCAwIDAgMXB4ICR7XG4gICAgICAgICAgICBzY2FsZXMubmV1dHJhbC5ONUFcbiAgICAgICAgICB9LCBpbnNldCAwIC0xcHggMXB4IDAgJHtzY2FsZXMubmV1dHJhbC5OMkF9YFxuICAgICAgICB9LFxuICAgICAgICBob3Zlcjoge1xuICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogbGluZWFyR3JhZGllbnQuaG92ZXJcbiAgICAgICAgfSxcbiAgICAgICAgZm9jdXM6IHtcbiAgICAgICAgICBib3hTaGFkb3c6IGAwIDAgMCAzcHggJHtmb2N1c0NvbG9yfSwgaW5zZXQgMCAwIDAgMXB4ICR7XG4gICAgICAgICAgICBzY2FsZXMubmV1dHJhbC5ONEFcbiAgICAgICAgICB9LCBpbnNldCAwIC0xcHggMXB4IDAgJHtzY2FsZXMubmV1dHJhbC5ONUF9YFxuICAgICAgICB9LFxuICAgICAgICBhY3RpdmU6IHtcbiAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGxpbmVhckdyYWRpZW50LmFjdGl2ZSxcbiAgICAgICAgICBib3hTaGFkb3c6IGBpbnNldCAwIDAgMCAxcHggJHtcbiAgICAgICAgICAgIHNjYWxlcy5uZXV0cmFsLk40QVxuICAgICAgICAgIH0sIGluc2V0IDAgMXB4IDFweCAwICR7c2NhbGVzLm5ldXRyYWwuTjJBfWBcbiAgICAgICAgfSxcbiAgICAgICAgZm9jdXNBbmRBY3RpdmU6IHtcbiAgICAgICAgICBib3hTaGFkb3c6IGAwIDAgMCAzcHggJHtmb2N1c0NvbG9yfSwgaW5zZXQgMCAwIDAgMXB4ICR7XG4gICAgICAgICAgICBzY2FsZXMubmV1dHJhbC5ONEFcbiAgICAgICAgICB9LCBpbnNldCAwIDFweCAxcHggMCAke3NjYWxlcy5uZXV0cmFsLk4yQX1gXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgY2FzZSAnbWluaW1hbCc6IHtcbiAgICAgIGNvbnN0IGludGVudFRleHRDb2xvciA9IGdldFRleHRDb2xvckZvckludGVudChpbnRlbnQsIHNjYWxlcy5ibHVlLkI5KVxuICAgICAgcmV0dXJuIFRoZW1lci5jcmVhdGVCdXR0b25BcHBlYXJhbmNlKHtcbiAgICAgICAgZGlzYWJsZWQsXG4gICAgICAgIGJhc2U6IHtcbiAgICAgICAgICBjb2xvcjogaW50ZW50VGV4dENvbG9yLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50J1xuICAgICAgICB9LFxuICAgICAgICBob3Zlcjoge1xuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogc2NhbGVzLm5ldXRyYWwuTjJBXG4gICAgICAgIH0sXG4gICAgICAgIGZvY3VzOiB7XG4gICAgICAgICAgYm94U2hhZG93OiBgMCAwIDAgM3B4ICR7c2NhbGVzLmJsdWUuQjVBfWBcbiAgICAgICAgfSxcbiAgICAgICAgYWN0aXZlOiB7XG4gICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAnbm9uZScsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBzY2FsZXMuYmx1ZS5CM0FcbiAgICAgICAgfSxcbiAgICAgICAgZm9jdXNBbmRBY3RpdmU6IHt9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGNhc2UgJ2RlZmF1bHQnOlxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIGNvbnN0IGludGVudFRleHRDb2xvciA9IGdldFRleHRDb2xvckZvckludGVudChpbnRlbnQpXG4gICAgICByZXR1cm4gVGhlbWVyLmNyZWF0ZUJ1dHRvbkFwcGVhcmFuY2Uoe1xuICAgICAgICBkaXNhYmxlZCxcbiAgICAgICAgYmFzZToge1xuICAgICAgICAgIGNvbG9yOiBpbnRlbnRUZXh0Q29sb3IsXG4gICAgICAgICAgLi4uZGVmYXVsdENvbnRyb2xTdHlsZXMuYmFzZVxuICAgICAgICB9LFxuICAgICAgICBob3ZlcjogZGVmYXVsdENvbnRyb2xTdHlsZXMuaG92ZXIsXG4gICAgICAgIGZvY3VzOiBkZWZhdWx0Q29udHJvbFN0eWxlcy5mb2N1cyxcbiAgICAgICAgYWN0aXZlOiBkZWZhdWx0Q29udHJvbFN0eWxlcy5hY3RpdmUsXG4gICAgICAgIGZvY3VzQW5kQWN0aXZlOiBkZWZhdWx0Q29udHJvbFN0eWxlcy5mb2N1c0FuZEFjdGl2ZVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBHZXQgdGhlIGNsYXNzTmFtZSBvZiBhIGBCdXR0b25gfGBJY29uQnV0dG9uYC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBhcHBlYXJhbmNlIC0gZGVmYXVsdCwgcHJpbWFyeSwgbWluaW1hbC5cbiAqIEBwYXJhbSB7SW50ZW50fSBpbnRlbnQgLSBub25lLCBzdWNjZXNzLCB3YXJuaW5nLCBkYW5nZXIuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBhcHBlYXJhbmNlIGNsYXNzIG5hbWUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IG1lbW9pemVDbGFzc05hbWUoZ2V0QnV0dG9uQXBwZWFyYW5jZSlcbiJdfQ==