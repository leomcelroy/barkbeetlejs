function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from "react";
import ReactSVGPanZoom from './viewer';
import PropTypes from "prop-types";
import { TOOL_NONE } from "./constants";

var UncontrolledReactSVGPanZoom =
/*#__PURE__*/
function (_React$Component) {
  _inherits(UncontrolledReactSVGPanZoom, _React$Component);

  function UncontrolledReactSVGPanZoom(props) {
    var _this;

    _classCallCheck(this, UncontrolledReactSVGPanZoom);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UncontrolledReactSVGPanZoom).call(this, props));
    _this.state = {
      value: props.defaultValue || {},
      tool: props.defaultTool || TOOL_NONE
    };
    _this.Viewer = null;
    _this.changeTool = _this.changeTool.bind(_assertThisInitialized(_this));
    _this.changeValue = _this.changeValue.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(UncontrolledReactSVGPanZoom, [{
    key: "changeTool",
    value: function changeTool(tool) {
      this.setState({
        tool: tool
      });
    }
  }, {
    key: "changeValue",
    value: function changeValue(value) {
      this.setState({
        value: value
      });
    }
  }, {
    key: "pan",
    value: function pan(SVGDeltaX, SVGDeltaY) {
      this.Viewer.pan(SVGDeltaX, SVGDeltaY);
    }
  }, {
    key: "zoom",
    value: function zoom(SVGPointX, SVGPointY, scaleFactor) {
      this.Viewer.zoom(SVGPointX, SVGPointY, scaleFactor);
    }
  }, {
    key: "fitSelection",
    value: function fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
      this.Viewer.fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight);
    }
  }, {
    key: "fitToViewer",
    value: function fitToViewer(SVGAlignX, SVGAlignY) {
      this.Viewer.fitToViewer(SVGAlignX, SVGAlignY);
    }
  }, {
    key: "zoomOnViewerCenter",
    value: function zoomOnViewerCenter(scaleFactor) {
      this.Viewer.zoomOnViewerCenter(scaleFactor);
    }
  }, {
    key: "setPointOnViewerCenter",
    value: function setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel) {
      this.Viewer.setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.Viewer.reset();
    }
  }, {
    key: "openMiniature",
    value: function openMiniature() {
      this.Viewer.openMiniature();
    }
  }, {
    key: "closeMiniature",
    value: function closeMiniature() {
      this.Viewer.closeMiniature();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          width = _this$props.width,
          height = _this$props.height,
          onChangeTool = _this$props.onChangeTool,
          onChangeValue = _this$props.onChangeValue,
          props = _objectWithoutProperties(_this$props, ["width", "height", "onChangeTool", "onChangeValue"]);

      var _this$state = this.state,
          tool = _this$state.tool,
          value = _this$state.value;
      return React.createElement(ReactSVGPanZoom, _extends({
        width: width,
        height: height,
        tool: tool,
        onChangeTool: this.changeTool,
        value: value,
        onChangeValue: this.changeValue,
        ref: function ref(Viewer) {
          return _this2.Viewer = Viewer;
        }
      }, props));
    }
  }]);

  return UncontrolledReactSVGPanZoom;
}(React.Component);

export { UncontrolledReactSVGPanZoom as default };
UncontrolledReactSVGPanZoom.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  defaultValue: PropTypes.object,
  defaultTool: PropTypes.string
};