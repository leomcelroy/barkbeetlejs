"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Viewer: true,
  ReactSVGPanZoom: true,
  UncontrolledReactSVGPanZoom: true,
  Toolbar: true,
  Miniature: true,
  setPointOnViewerCenter: true,
  reset: true,
  pan: true,
  zoom: true,
  fitSelection: true,
  fitToViewer: true,
  zoomOnViewerCenter: true,
  openMiniature: true,
  closeMiniature: true
};
Object.defineProperty(exports, "ReactSVGPanZoom", {
  enumerable: true,
  get: function get() {
    return _viewer.default;
  }
});
Object.defineProperty(exports, "UncontrolledReactSVGPanZoom", {
  enumerable: true,
  get: function get() {
    return _uncontrolledViewer.default;
  }
});
Object.defineProperty(exports, "Toolbar", {
  enumerable: true,
  get: function get() {
    return _toolbar.default;
  }
});
Object.defineProperty(exports, "Miniature", {
  enumerable: true,
  get: function get() {
    return _miniature.default;
  }
});
Object.defineProperty(exports, "setPointOnViewerCenter", {
  enumerable: true,
  get: function get() {
    return _common.setPointOnViewerCenter;
  }
});
Object.defineProperty(exports, "reset", {
  enumerable: true,
  get: function get() {
    return _common.reset;
  }
});
Object.defineProperty(exports, "pan", {
  enumerable: true,
  get: function get() {
    return _pan.pan;
  }
});
Object.defineProperty(exports, "zoom", {
  enumerable: true,
  get: function get() {
    return _zoom.zoom;
  }
});
Object.defineProperty(exports, "fitSelection", {
  enumerable: true,
  get: function get() {
    return _zoom.fitSelection;
  }
});
Object.defineProperty(exports, "fitToViewer", {
  enumerable: true,
  get: function get() {
    return _zoom.fitToViewer;
  }
});
Object.defineProperty(exports, "zoomOnViewerCenter", {
  enumerable: true,
  get: function get() {
    return _zoom.zoomOnViewerCenter;
  }
});
Object.defineProperty(exports, "openMiniature", {
  enumerable: true,
  get: function get() {
    return _miniature2.openMiniature;
  }
});
Object.defineProperty(exports, "closeMiniature", {
  enumerable: true,
  get: function get() {
    return _miniature2.closeMiniature;
  }
});
exports.Viewer = void 0;

var _migrationTips = require("./migration-tips");

var _viewer = _interopRequireDefault(require("./viewer"));

var _uncontrolledViewer = _interopRequireDefault(require("./uncontrolled-viewer"));

var _toolbar = _interopRequireDefault(require("./ui-toolbar/toolbar"));

var _miniature = _interopRequireDefault(require("./ui-miniature/miniature"));

var _common = require("./features/common");

var _pan = require("./features/pan");

var _zoom = require("./features/zoom");

var _miniature2 = require("./features/miniature");

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _constants[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Viewer = function Viewer() {
  (0, _migrationTips.tipNoViewer)();
  return null;
};

exports.Viewer = Viewer;