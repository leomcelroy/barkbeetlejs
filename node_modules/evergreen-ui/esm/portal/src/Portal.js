import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { Component } from 'react';
import canUseDom from 'dom-helpers/util/inDOM';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
var portalContainer;

var Portal =
/*#__PURE__*/
function (_Component) {
  _inherits(Portal, _Component);

  function Portal() {
    var _this;

    _classCallCheck(this, Portal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Portal).call(this)); // This fixes SSR

    if (!canUseDom) return _possibleConstructorReturn(_this);

    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.setAttribute('evergreen-portal-container', '');
      document.body.append(portalContainer);
    }

    _this.el = document.createElement('div');
    portalContainer.append(_this.el);
    return _this;
  }

  _createClass(Portal, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      portalContainer.removeChild(this.el);
    }
  }, {
    key: "render",
    value: function render() {
      // This fixes SSR
      if (!canUseDom) return null;
      return ReactDOM.createPortal(this.props.children, this.el);
    }
  }]);

  return Portal;
}(Component);

Portal.displayName = "Portal";
export { Portal as default };
Portal.propTypes = {
  children: PropTypes.node.isRequired
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wb3J0YWwvc3JjL1BvcnRhbC5qcyJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJjYW5Vc2VEb20iLCJSZWFjdERPTSIsIlByb3BUeXBlcyIsInBvcnRhbENvbnRhaW5lciIsIlBvcnRhbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImJvZHkiLCJhcHBlbmQiLCJlbCIsInJlbW92ZUNoaWxkIiwiY3JlYXRlUG9ydGFsIiwicHJvcHMiLCJjaGlsZHJlbiIsInByb3BUeXBlcyIsIm5vZGUiLCJpc1JlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLFNBQVNBLFNBQVQsUUFBMEIsT0FBMUI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLHdCQUF0QjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsV0FBckI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBRUEsSUFBSUMsZUFBSjs7SUFFcUJDLE07Ozs7O0FBQ25CLG9CQUFjO0FBQUE7O0FBQUE7O0FBQ1osaUZBRFksQ0FHWjs7QUFDQSxRQUFJLENBQUNKLFNBQUwsRUFBZ0I7O0FBRWhCLFFBQUksQ0FBQ0csZUFBTCxFQUFzQjtBQUNwQkEsTUFBQUEsZUFBZSxHQUFHRSxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEI7QUFDQUgsTUFBQUEsZUFBZSxDQUFDSSxZQUFoQixDQUE2Qiw0QkFBN0IsRUFBMkQsRUFBM0Q7QUFDQUYsTUFBQUEsUUFBUSxDQUFDRyxJQUFULENBQWNDLE1BQWQsQ0FBcUJOLGVBQXJCO0FBQ0Q7O0FBRUQsVUFBS08sRUFBTCxHQUFVTCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVjtBQUNBSCxJQUFBQSxlQUFlLENBQUNNLE1BQWhCLENBQXVCLE1BQUtDLEVBQTVCO0FBYlk7QUFjYjs7OzsyQ0FFc0I7QUFDckJQLE1BQUFBLGVBQWUsQ0FBQ1EsV0FBaEIsQ0FBNEIsS0FBS0QsRUFBakM7QUFDRDs7OzZCQUVRO0FBQ1A7QUFDQSxVQUFJLENBQUNWLFNBQUwsRUFBZ0IsT0FBTyxJQUFQO0FBQ2hCLGFBQU9DLFFBQVEsQ0FBQ1csWUFBVCxDQUFzQixLQUFLQyxLQUFMLENBQVdDLFFBQWpDLEVBQTJDLEtBQUtKLEVBQWhELENBQVA7QUFDRDs7OztFQXpCaUNYLFM7O0FBQWZLLE07U0FBQUEsTTtBQTRCckJBLE1BQU0sQ0FBQ1csU0FBUCxHQUFtQjtBQUNqQkQsRUFBQUEsUUFBUSxFQUFFWixTQUFTLENBQUNjLElBQVYsQ0FBZUM7QUFEUixDQUFuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNhblVzZURvbSBmcm9tICdkb20taGVscGVycy91dGlsL2luRE9NJ1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcblxubGV0IHBvcnRhbENvbnRhaW5lclxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3J0YWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpXG5cbiAgICAvLyBUaGlzIGZpeGVzIFNTUlxuICAgIGlmICghY2FuVXNlRG9tKSByZXR1cm5cblxuICAgIGlmICghcG9ydGFsQ29udGFpbmVyKSB7XG4gICAgICBwb3J0YWxDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgcG9ydGFsQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnZXZlcmdyZWVuLXBvcnRhbC1jb250YWluZXInLCAnJylcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHBvcnRhbENvbnRhaW5lcilcbiAgICB9XG5cbiAgICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBwb3J0YWxDb250YWluZXIuYXBwZW5kKHRoaXMuZWwpXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBwb3J0YWxDb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5lbClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICAvLyBUaGlzIGZpeGVzIFNTUlxuICAgIGlmICghY2FuVXNlRG9tKSByZXR1cm4gbnVsbFxuICAgIHJldHVybiBSZWFjdERPTS5jcmVhdGVQb3J0YWwodGhpcy5wcm9wcy5jaGlsZHJlbiwgdGhpcy5lbClcbiAgfVxufVxuXG5Qb3J0YWwucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZFxufVxuIl19