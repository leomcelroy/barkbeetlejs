import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { Portal } from '../../portal';
import { Stack } from '../../stack';
import { StackingOrder, Position } from '../../constants';
import getPosition from './getPosition';
var animationEasing = {
  spring: "cubic-bezier(0.175, 0.885, 0.320, 1.175)"
};

var initialState = function initialState() {
  return {
    top: null,
    left: null,
    transformOrigin: null
  };
};

var getCSS = function getCSS(_ref) {
  var initialScale = _ref.initialScale,
      animationDuration = _ref.animationDuration;
  return {
    position: 'fixed',
    opacity: 0,
    transitionTimingFunction: animationEasing.spring,
    transitionDuration: "".concat(animationDuration, "ms"),
    transitionProperty: 'opacity, transform',
    transform: "scale(".concat(initialScale, ") translateY(-1px)"),
    '&[data-state="entering"], &[data-state="entered"]': {
      opacity: 1,
      visibility: 'visible',
      transform: "scale(1)"
    },
    '&[data-state="exiting"]': {
      opacity: 0,
      transform: 'scale(1)'
    }
  };
};

var Positioner =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Positioner, _PureComponent);

  function Positioner(props, context) {
    var _this;

    _classCallCheck(this, Positioner);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Positioner).call(this, props, context));

    _defineProperty(_assertThisInitialized(_this), "getTargetRef", function (ref) {
      _this.targetRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getRef", function (ref) {
      _this.positionerRef = ref;

      _this.props.innerRef(ref);
    });

    _defineProperty(_assertThisInitialized(_this), "handleEnter", function () {
      _this.update();
    });

    _defineProperty(_assertThisInitialized(_this), "update", function () {
      var prevHeight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var prevWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (!_this.props.isShown || !_this.targetRef || !_this.positionerRef) return;

      var targetRect = _this.targetRef.getBoundingClientRect();

      var hasEntered = _this.positionerRef.getAttribute('data-state') === 'entered';
      var viewportHeight = document.documentElement.clientHeight;
      var viewportWidth = document.documentElement.clientWidth;
      var height;
      var width;

      if (hasEntered) {
        // Only when the animation is done should we opt-in to `getBoundingClientRect`
        var positionerRect = _this.positionerRef.getBoundingClientRect(); // https://github.com/segmentio/evergreen/issues/255
        // We need to ceil the width and height to prevent jitter when
        // the window is zoomed (when `window.devicePixelRatio` is not an integer)


        height = Math.round(positionerRect.height);
        width = Math.round(positionerRect.width);
      } else {
        // When the animation is in flight use `offsetWidth/Height` which
        // does not calculate the `transform` property as part of its result.
        // There is still change on jitter during the animation (although unoticable)
        // When the browser is zoomed in — we fix this with `Math.max`.
        height = Math.max(_this.positionerRef.offsetHeight, prevHeight);
        width = Math.max(_this.positionerRef.offsetWidth, prevWidth);
      }

      var _getPosition = getPosition({
        position: _this.props.position,
        targetRect: targetRect,
        targetOffset: _this.props.targetOffset,
        dimensions: {
          height: height,
          width: width
        },
        viewport: {
          width: viewportWidth,
          height: viewportHeight
        },
        viewportOffset: _this.props.bodyOffset
      }),
          rect = _getPosition.rect,
          transformOrigin = _getPosition.transformOrigin;

      _this.setState({
        left: rect.left,
        top: rect.top,
        transformOrigin: transformOrigin
      }, function () {
        _this.latestAnimationFrame = requestAnimationFrame(function () {
          _this.update(height, width);
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleExited", function () {
      _this.setState(function () {
        return _objectSpread({}, initialState());
      }, function () {
        _this.props.onCloseComplete();
      });
    });

    _this.state = initialState();
    return _this;
  }

  _createClass(Positioner, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.latestAnimationFrame) {
        cancelAnimationFrame(this.latestAnimationFrame);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          target = _this$props.target,
          isShown = _this$props.isShown,
          children = _this$props.children,
          initialScale = _this$props.initialScale,
          targetOffset = _this$props.targetOffset,
          animationDuration = _this$props.animationDuration;
      var _this$state = this.state,
          left = _this$state.left,
          top = _this$state.top,
          transformOrigin = _this$state.transformOrigin;
      return React.createElement(Stack, {
        value: StackingOrder.POSITIONER
      }, function (zIndex) {
        return React.createElement(React.Fragment, null, target({
          getRef: _this2.getTargetRef,
          isShown: isShown
        }), React.createElement(Transition, {
          appear: true,
          in: isShown,
          timeout: animationDuration,
          onEnter: _this2.handleEnter,
          onEntered: _this2.props.onOpenComplete,
          onExited: _this2.handleExited,
          unmountOnExit: true
        }, function (state) {
          return React.createElement(Portal, null, children({
            top: top,
            left: left,
            state: state,
            zIndex: zIndex,
            css: getCSS({
              targetOffset: targetOffset,
              initialScale: initialScale,
              animationDuration: animationDuration
            }),
            style: {
              transformOrigin: transformOrigin,
              left: left,
              top: top,
              zIndex: zIndex
            },
            getRef: _this2.getRef,
            animationDuration: animationDuration
          }));
        }));
      });
    }
  }]);

  return Positioner;
}(PureComponent);

Positioner.displayName = "Positioner";

_defineProperty(Positioner, "propTypes", {
  /**
   * The position the element that is being positioned is on.
   * Smart positioning might override this.
   */
  position: PropTypes.oneOf([Position.TOP, Position.TOP_LEFT, Position.TOP_RIGHT, Position.BOTTOM, Position.BOTTOM_LEFT, Position.BOTTOM_RIGHT, Position.LEFT, Position.RIGHT]).isRequired,

  /**
   * When true, show the element being positioned.
   */
  isShown: PropTypes.bool,

  /**
   * Function that returns the element being positioned.
   */
  children: PropTypes.func.isRequired,

  /**
   * Function that returns the ref of the element being positioned.
   */
  innerRef: PropTypes.func.isRequired,

  /**
   * The minimum distance from the body to the element being positioned.
   */
  bodyOffset: PropTypes.number.isRequired,

  /**
   * The minimum distance from the target to the element being positioned.
   */
  targetOffset: PropTypes.number.isRequired,

  /**
   * Function that should return a node for the target.
   * ({ getRef: () -> Ref, isShown: Bool }) -> React Node
   */
  target: PropTypes.func.isRequired,

  /**
   * Initial scale of the element being positioned.
   */
  initialScale: PropTypes.number.isRequired,

  /**
   * Duration of the animation.
   */
  animationDuration: PropTypes.number.isRequired,

  /**
   * Function that will be called when the exit transition is complete.
   */
  onCloseComplete: PropTypes.func.isRequired,

  /**
   * Function that will be called when the enter transition is complete.
   */
  onOpenComplete: PropTypes.func.isRequired
});

_defineProperty(Positioner, "defaultProps", {
  position: Position.BOTTOM,
  bodyOffset: 6,
  targetOffset: 6,
  initialScale: 0.9,
  animationDuration: 300,
  innerRef: function innerRef() {},
  onOpenComplete: function onOpenComplete() {},
  onCloseComplete: function onCloseComplete() {}
});

export { Positioner as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wb3NpdGlvbmVyL3NyYy9Qb3NpdGlvbmVyLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsIlByb3BUeXBlcyIsIlRyYW5zaXRpb24iLCJQb3J0YWwiLCJTdGFjayIsIlN0YWNraW5nT3JkZXIiLCJQb3NpdGlvbiIsImdldFBvc2l0aW9uIiwiYW5pbWF0aW9uRWFzaW5nIiwic3ByaW5nIiwiaW5pdGlhbFN0YXRlIiwidG9wIiwibGVmdCIsInRyYW5zZm9ybU9yaWdpbiIsImdldENTUyIsImluaXRpYWxTY2FsZSIsImFuaW1hdGlvbkR1cmF0aW9uIiwicG9zaXRpb24iLCJvcGFjaXR5IiwidHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uIiwidHJhbnNpdGlvbkR1cmF0aW9uIiwidHJhbnNpdGlvblByb3BlcnR5IiwidHJhbnNmb3JtIiwidmlzaWJpbGl0eSIsIlBvc2l0aW9uZXIiLCJwcm9wcyIsImNvbnRleHQiLCJyZWYiLCJ0YXJnZXRSZWYiLCJwb3NpdGlvbmVyUmVmIiwiaW5uZXJSZWYiLCJ1cGRhdGUiLCJwcmV2SGVpZ2h0IiwicHJldldpZHRoIiwiaXNTaG93biIsInRhcmdldFJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJoYXNFbnRlcmVkIiwiZ2V0QXR0cmlidXRlIiwidmlld3BvcnRIZWlnaHQiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudEhlaWdodCIsInZpZXdwb3J0V2lkdGgiLCJjbGllbnRXaWR0aCIsImhlaWdodCIsIndpZHRoIiwicG9zaXRpb25lclJlY3QiLCJNYXRoIiwicm91bmQiLCJtYXgiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXRXaWR0aCIsInRhcmdldE9mZnNldCIsImRpbWVuc2lvbnMiLCJ2aWV3cG9ydCIsInZpZXdwb3J0T2Zmc2V0IiwiYm9keU9mZnNldCIsInJlY3QiLCJzZXRTdGF0ZSIsImxhdGVzdEFuaW1hdGlvbkZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwib25DbG9zZUNvbXBsZXRlIiwic3RhdGUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsInRhcmdldCIsImNoaWxkcmVuIiwiUE9TSVRJT05FUiIsInpJbmRleCIsImdldFJlZiIsImdldFRhcmdldFJlZiIsImhhbmRsZUVudGVyIiwib25PcGVuQ29tcGxldGUiLCJoYW5kbGVFeGl0ZWQiLCJjc3MiLCJzdHlsZSIsIm9uZU9mIiwiVE9QIiwiVE9QX0xFRlQiLCJUT1BfUklHSFQiLCJCT1RUT00iLCJCT1RUT01fTEVGVCIsIkJPVFRPTV9SSUdIVCIsIkxFRlQiLCJSSUdIVCIsImlzUmVxdWlyZWQiLCJib29sIiwiZnVuYyIsIm51bWJlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLElBQWdCQyxhQUFoQixRQUFxQyxPQUFyQztBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLG1DQUF2QjtBQUNBLFNBQVNDLE1BQVQsUUFBdUIsY0FBdkI7QUFDQSxTQUFTQyxLQUFULFFBQXNCLGFBQXRCO0FBQ0EsU0FBU0MsYUFBVCxFQUF3QkMsUUFBeEIsUUFBd0MsaUJBQXhDO0FBQ0EsT0FBT0MsV0FBUCxNQUF3QixlQUF4QjtBQUVBLElBQU1DLGVBQWUsR0FBRztBQUN0QkMsRUFBQUEsTUFBTTtBQURnQixDQUF4Qjs7QUFJQSxJQUFNQyxZQUFZLEdBQUcsU0FBZkEsWUFBZTtBQUFBLFNBQU87QUFDMUJDLElBQUFBLEdBQUcsRUFBRSxJQURxQjtBQUUxQkMsSUFBQUEsSUFBSSxFQUFFLElBRm9CO0FBRzFCQyxJQUFBQSxlQUFlLEVBQUU7QUFIUyxHQUFQO0FBQUEsQ0FBckI7O0FBTUEsSUFBTUMsTUFBTSxHQUFHLFNBQVRBLE1BQVM7QUFBQSxNQUFHQyxZQUFILFFBQUdBLFlBQUg7QUFBQSxNQUFpQkMsaUJBQWpCLFFBQWlCQSxpQkFBakI7QUFBQSxTQUEwQztBQUN2REMsSUFBQUEsUUFBUSxFQUFFLE9BRDZDO0FBRXZEQyxJQUFBQSxP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LENBQUN1RixNQUFWLENBQWlCSCxVQXZDZDs7QUF5Q2pCOzs7O0FBSUFwQixFQUFBQSxNQUFNLEVBQUVoRSxTQUFTLENBQUNzRixJQUFWLENBQWVGLFVBN0NOOztBQStDakI7OztBQUdBdEUsRUFBQUEsWUFBWSxFQUFFZCxTQUFTLENBQUN1RixNQUFWLENBQWlCSCxVQWxEZDs7QUFvRGpCOzs7QUFHQXJFLEVBQUFBLGlCQUFpQixFQUFFZixTQUFTLENBQUN1RixNQUFWLENBQWlCSCxVQXZEbkI7O0FBeURqQjs7O0FBR0F2QixFQUFBQSxlQUFlLEVBQUU3RCxTQUFTLENBQUNzRixJQUFWLENBQWVGLFVBNURmOztBQThEakI7OztBQUdBYixFQUFBQSxjQUFjLEVBQUV2RSxTQUFTLENBQUNzRixJQUFWLENBQWVGO0FBakVkLEM7O2dCQURBN0QsVSxrQkFxRUc7QUFDcEJQLEVBQUFBLFFBQVEsRUFBRVgsUUFBUSxDQUFDMEUsTUFEQztBQUVwQnZCLEVBQUFBLFVBQVUsRUFBRSxDQUZRO0FBR3BCSixFQUFBQSxZQUFZLEVBQUUsQ0FITTtBQUlwQnRDLEVBQUFBLFlBQVksRUFBRSxHQUpNO0FBS3BCQyxFQUFBQSxpQkFBaUIsRUFBRSxHQUxDO0FBTXBCYyxFQUFBQSxRQUFRLEVBQUUsb0JBQU0sQ0FBRSxDQU5FO0FBT3BCMEMsRUFBQUEsY0FBYyxFQUFFLDBCQUFNLENBQUUsQ0FQSjtBQVFwQlYsRUFBQUEsZUFBZSxFQUFFLDJCQUFNLENBQUU7QUFSTCxDOztTQXJFSHRDLFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IFRyYW5zaXRpb24gZnJvbSAncmVhY3QtdHJhbnNpdGlvbi1ncm91cC9UcmFuc2l0aW9uJ1xuaW1wb3J0IHsgUG9ydGFsIH0gZnJvbSAnLi4vLi4vcG9ydGFsJ1xuaW1wb3J0IHsgU3RhY2sgfSBmcm9tICcuLi8uLi9zdGFjaydcbmltcG9ydCB7IFN0YWNraW5nT3JkZXIsIFBvc2l0aW9uIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzJ1xuaW1wb3J0IGdldFBvc2l0aW9uIGZyb20gJy4vZ2V0UG9zaXRpb24nXG5cbmNvbnN0IGFuaW1hdGlvbkVhc2luZyA9IHtcbiAgc3ByaW5nOiBgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMjAsIDEuMTc1KWBcbn1cblxuY29uc3QgaW5pdGlhbFN0YXRlID0gKCkgPT4gKHtcbiAgdG9wOiBudWxsLFxuICBsZWZ0OiBudWxsLFxuICB0cmFuc2Zvcm1PcmlnaW46IG51bGxcbn0pXG5cbmNvbnN0IGdldENTUyA9ICh7IGluaXRpYWxTY2FsZSwgYW5pbWF0aW9uRHVyYXRpb24gfSkgPT4gKHtcbiAgcG9zaXRpb246ICdmaXhlZCcsXG4gIG9wYWNpdHk6IDAsXG4gIHRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbjogYW5pbWF0aW9uRWFzaW5nLnNwcmluZyxcbiAgdHJhbnNpdGlvbkR1cmF0aW9uOiBgJHthbmltYXRpb25EdXJhdGlvbn1tc2AsXG4gIHRyYW5zaXRpb25Qcm9wZXJ0eTogJ29wYWNpdHksIHRyYW5zZm9ybScsXG4gIHRyYW5zZm9ybTogYHNjYWxlKCR7aW5pdGlhbFNjYWxlfSkgdHJhbnNsYXRlWSgtMXB4KWAsXG4gICcmW2RhdGEtc3RhdGU9XCJlbnRlcmluZ1wiXSwgJltkYXRhLXN0YXRlPVwiZW50ZXJlZFwiXSc6IHtcbiAgICBvcGFjaXR5OiAxLFxuICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJyxcbiAgICB0cmFuc2Zvcm06IGBzY2FsZSgxKWBcbiAgfSxcbiAgJyZbZGF0YS1zdGF0ZT1cImV4aXRpbmdcIl0nOiB7XG4gICAgb3BhY2l0eTogMCxcbiAgICB0cmFuc2Zvcm06ICdzY2FsZSgxKSdcbiAgfVxufSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zaXRpb25lciBleHRlbmRzIFB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIC8qKlxuICAgICAqIFRoZSBwb3NpdGlvbiB0aGUgZWxlbWVudCB0aGF0IGlzIGJlaW5nIHBvc2l0aW9uZWQgaXMgb24uXG4gICAgICogU21hcnQgcG9zaXRpb25pbmcgbWlnaHQgb3ZlcnJpZGUgdGhpcy5cbiAgICAgKi9cbiAgICBwb3NpdGlvbjogUHJvcFR5cGVzLm9uZU9mKFtcbiAgICAgIFBvc2l0aW9uLlRPUCxcbiAgICAgIFBvc2l0aW9uLlRPUF9MRUZULFxuICAgICAgUG9zaXRpb24uVE9QX1JJR0hULFxuICAgICAgUG9zaXRpb24uQk9UVE9NLFxuICAgICAgUG9zaXRpb24uQk9UVE9NX0xFRlQsXG4gICAgICBQb3NpdGlvbi5CT1RUT01fUklHSFQsXG4gICAgICBQb3NpdGlvbi5MRUZULFxuICAgICAgUG9zaXRpb24uUklHSFRcbiAgICBdKS5pc1JlcXVpcmVkLFxuXG4gICAgLyoqXG4gICAgICogV2hlbiB0cnVlLCBzaG93IHRoZSBlbGVtZW50IGJlaW5nIHBvc2l0aW9uZWQuXG4gICAgICovXG4gICAgaXNTaG93bjogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGVsZW1lbnQgYmVpbmcgcG9zaXRpb25lZC5cbiAgICAgKi9cbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgcmVmIG9mIHRoZSBlbGVtZW50IGJlaW5nIHBvc2l0aW9uZWQuXG4gICAgICovXG4gICAgaW5uZXJSZWY6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgbWluaW11bSBkaXN0YW5jZSBmcm9tIHRoZSBib2R5IHRvIHRoZSBlbGVtZW50IGJlaW5nIHBvc2l0aW9uZWQuXG4gICAgICovXG4gICAgYm9keU9mZnNldDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gICAgLyoqXG4gICAgICogVGhlIG1pbmltdW0gZGlzdGFuY2UgZnJvbSB0aGUgdGFyZ2V0IHRvIHRoZSBlbGVtZW50IGJlaW5nIHBvc2l0aW9uZWQuXG4gICAgICovXG4gICAgdGFyZ2V0T2Zmc2V0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHNob3VsZCByZXR1cm4gYSBub2RlIGZvciB0aGUgdGFyZ2V0LlxuICAgICAqICh7IGdldFJlZjogKCkgLT4gUmVmLCBpc1Nob3duOiBCb29sIH0pIC0+IFJlYWN0IE5vZGVcbiAgICAgKi9cbiAgICB0YXJnZXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsIHNjYWxlIG9mIHRoZSBlbGVtZW50IGJlaW5nIHBvc2l0aW9uZWQuXG4gICAgICovXG4gICAgaW5pdGlhbFNjYWxlOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgICAvKipcbiAgICAgKiBEdXJhdGlvbiBvZiB0aGUgYW5pbWF0aW9uLlxuICAgICAqL1xuICAgIGFuaW1hdGlvbkR1cmF0aW9uOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGV4aXQgdHJhbnNpdGlvbiBpcyBjb21wbGV0ZS5cbiAgICAgKi9cbiAgICBvbkNsb3NlQ29tcGxldGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGVudGVyIHRyYW5zaXRpb24gaXMgY29tcGxldGUuXG4gICAgICovXG4gICAgb25PcGVuQ29tcGxldGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgcG9zaXRpb246IFBvc2l0aW9uLkJPVFRPTSxcbiAgICBib2R5T2Zmc2V0OiA2LFxuICAgIHRhcmdldE9mZnNldDogNixcbiAgICBpbml0aWFsU2NhbGU6IDAuOSxcbiAgICBhbmltYXRpb25EdXJhdGlvbjogMzAwLFxuICAgIGlubmVyUmVmOiAoKSA9PiB7fSxcbiAgICBvbk9wZW5Db21wbGV0ZTogKCkgPT4ge30sXG4gICAgb25DbG9zZUNvbXBsZXRlOiAoKSA9PiB7fVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcbiAgICBzdXBlcihwcm9wcywgY29udGV4dClcbiAgICB0aGlzLnN0YXRlID0gaW5pdGlhbFN0YXRlKClcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGlmICh0aGlzLmxhdGVzdEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmxhdGVzdEFuaW1hdGlvbkZyYW1lKVxuICAgIH1cbiAgfVxuXG4gIGdldFRhcmdldFJlZiA9IHJlZiA9PiB7XG4gICAgdGhpcy50YXJnZXRSZWYgPSByZWZcbiAgfVxuXG4gIGdldFJlZiA9IHJlZiA9PiB7XG4gICAgdGhpcy5wb3NpdGlvbmVyUmVmID0gcmVmXG4gICAgdGhpcy5wcm9wcy5pbm5lclJlZihyZWYpXG4gIH1cblxuICBoYW5kbGVFbnRlciA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICB1cGRhdGUgPSAocHJldkhlaWdodCA9IDAsIHByZXZXaWR0aCA9IDApID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuaXNTaG93biB8fCAhdGhpcy50YXJnZXRSZWYgfHwgIXRoaXMucG9zaXRpb25lclJlZikgcmV0dXJuXG5cbiAgICBjb25zdCB0YXJnZXRSZWN0ID0gdGhpcy50YXJnZXRSZWYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICBjb25zdCBoYXNFbnRlcmVkID1cbiAgICAgIHRoaXMucG9zaXRpb25lclJlZi5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3RhdGUnKSA9PT0gJ2VudGVyZWQnXG5cbiAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICBjb25zdCB2aWV3cG9ydFdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXG5cbiAgICBsZXQgaGVpZ2h0XG4gICAgbGV0IHdpZHRoXG4gICAgaWYgKGhhc0VudGVyZWQpIHtcbiAgICAgIC8vIE9ubHkgd2hlbiB0aGUgYW5pbWF0aW9uIGlzIGRvbmUgc2hvdWxkIHdlIG9wdC1pbiB0byBgZ2V0Qm91bmRpbmdDbGllbnRSZWN0YFxuICAgICAgY29uc3QgcG9zaXRpb25lclJlY3QgPSB0aGlzLnBvc2l0aW9uZXJSZWYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3NlZ21lbnRpby9ldmVyZ3JlZW4vaXNzdWVzLzI1NVxuICAgICAgLy8gV2UgbmVlZCB0byBjZWlsIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IHRvIHByZXZlbnQgaml0dGVyIHdoZW5cbiAgICAgIC8vIHRoZSB3aW5kb3cgaXMgem9vbWVkICh3aGVuIGB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb2AgaXMgbm90IGFuIGludGVnZXIpXG4gICAgICBoZWlnaHQgPSBNYXRoLnJvdW5kKHBvc2l0aW9uZXJSZWN0LmhlaWdodClcbiAgICAgIHdpZHRoID0gTWF0aC5yb3VuZChwb3NpdGlvbmVyUmVjdC53aWR0aClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV2hlbiB0aGUgYW5pbWF0aW9uIGlzIGluIGZsaWdodCB1c2UgYG9mZnNldFdpZHRoL0hlaWdodGAgd2hpY2hcbiAgICAgIC8vIGRvZXMgbm90IGNhbGN1bGF0ZSB0aGUgYHRyYW5zZm9ybWAgcHJvcGVydHkgYXMgcGFydCBvZiBpdHMgcmVzdWx0LlxuICAgICAgLy8gVGhlcmUgaXMgc3RpbGwgY2hhbmdlIG9uIGppdHRlciBkdXJpbmcgdGhlIGFuaW1hdGlvbiAoYWx0aG91Z2ggdW5vdGljYWJsZSlcbiAgICAgIC8vIFdoZW4gdGhlIGJyb3dzZXIgaXMgem9vbWVkIGluIOKAlCB3ZSBmaXggdGhpcyB3aXRoIGBNYXRoLm1heGAuXG4gICAgICBoZWlnaHQgPSBNYXRoLm1heCh0aGlzLnBvc2l0aW9uZXJSZWYub2Zmc2V0SGVpZ2h0LCBwcmV2SGVpZ2h0KVxuICAgICAgd2lkdGggPSBNYXRoLm1heCh0aGlzLnBvc2l0aW9uZXJSZWYub2Zmc2V0V2lkdGgsIHByZXZXaWR0aClcbiAgICB9XG5cbiAgICBjb25zdCB7IHJlY3QsIHRyYW5zZm9ybU9yaWdpbiB9ID0gZ2V0UG9zaXRpb24oe1xuICAgICAgcG9zaXRpb246IHRoaXMucHJvcHMucG9zaXRpb24sXG4gICAgICB0YXJnZXRSZWN0LFxuICAgICAgdGFyZ2V0T2Zmc2V0OiB0aGlzLnByb3BzLnRhcmdldE9mZnNldCxcbiAgICAgIGRpbWVuc2lvbnM6IHtcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICB3aWR0aFxuICAgICAgfSxcbiAgICAgIHZpZXdwb3J0OiB7XG4gICAgICAgIHdpZHRoOiB2aWV3cG9ydFdpZHRoLFxuICAgICAgICBoZWlnaHQ6IHZpZXdwb3J0SGVpZ2h0XG4gICAgICB9LFxuICAgICAgdmlld3BvcnRPZmZzZXQ6IHRoaXMucHJvcHMuYm9keU9mZnNldFxuICAgIH0pXG5cbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAge1xuICAgICAgICBsZWZ0OiByZWN0LmxlZnQsXG4gICAgICAgIHRvcDogcmVjdC50b3AsXG4gICAgICAgIHRyYW5zZm9ybU9yaWdpblxuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgdGhpcy5sYXRlc3RBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy51cGRhdGUoaGVpZ2h0LCB3aWR0aClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICApXG4gIH1cblxuICBoYW5kbGVFeGl0ZWQgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5pbml0aWFsU3RhdGUoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2xvc2VDb21wbGV0ZSgpXG4gICAgICB9XG4gICAgKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHRhcmdldCxcbiAgICAgIGlzU2hvd24sXG4gICAgICBjaGlsZHJlbixcbiAgICAgIGluaXRpYWxTY2FsZSxcbiAgICAgIHRhcmdldE9mZnNldCxcbiAgICAgIGFuaW1hdGlvbkR1cmF0aW9uXG4gICAgfSA9IHRoaXMucHJvcHNcblxuICAgIGNvbnN0IHsgbGVmdCwgdG9wLCB0cmFuc2Zvcm1PcmlnaW4gfSA9IHRoaXMuc3RhdGVcblxuICAgIHJldHVybiAoXG4gICAgICA8U3RhY2sgdmFsdWU9e1N0YWNraW5nT3JkZXIuUE9TSVRJT05FUn0+XG4gICAgICAgIHt6SW5kZXggPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgIHt0YXJnZXQoeyBnZXRSZWY6IHRoaXMuZ2V0VGFyZ2V0UmVmLCBpc1Nob3duIH0pfVxuXG4gICAgICAgICAgICAgIDxUcmFuc2l0aW9uXG4gICAgICAgICAgICAgICAgYXBwZWFyXG4gICAgICAgICAgICAgICAgaW49e2lzU2hvd259XG4gICAgICAgICAgICAgICAgdGltZW91dD17YW5pbWF0aW9uRHVyYXRpb259XG4gICAgICAgICAgICAgICAgb25FbnRlcj17dGhpcy5oYW5kbGVFbnRlcn1cbiAgICAgICAgICAgICAgICBvbkVudGVyZWQ9e3RoaXMucHJvcHMub25PcGVuQ29tcGxldGV9XG4gICAgICAgICAgICAgICAgb25FeGl0ZWQ9e3RoaXMuaGFuZGxlRXhpdGVkfVxuICAgICAgICAgICAgICAgIHVubW91bnRPbkV4aXRcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtzdGF0ZSA9PiAoXG4gICAgICAgICAgICAgICAgICA8UG9ydGFsPlxuICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW4oe1xuICAgICAgICAgICAgICAgICAgICAgIHRvcCxcbiAgICAgICAgICAgICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgIHpJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICBjc3M6IGdldENTUyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRPZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsU2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25EdXJhdGlvblxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBnZXRSZWY6IHRoaXMuZ2V0UmVmLFxuICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgPC9Qb3J0YWw+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9UcmFuc2l0aW9uPlxuICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICApXG4gICAgICAgIH19XG4gICAgICA8L1N0YWNrPlxuICAgIClcbiAgfVxufVxuIl19