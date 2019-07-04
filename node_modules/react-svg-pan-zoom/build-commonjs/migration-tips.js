"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tipNoViewer = tipNoViewer;
exports.tipControlledComponent = tipControlledComponent;
exports.tipDeprecatedMiniatureProps = tipDeprecatedMiniatureProps;
exports.tipDeprecateToolbarProps = tipDeprecateToolbarProps;
exports.printMigrationTipsRelatedToProps = printMigrationTipsRelatedToProps;

var _is = require("./utils/is");

var github_base = 'https://github.com/chrvadala/react-svg-pan-zoom/blob/master';
var doc_v1_to_v2 = github_base + '/docs/migrate-from-v1-to-v2.md';
var doc_v2_to_v3 = github_base + '/docs/migrate-from-v2-to-v3.md';

function tipNoViewer() {
  console.error("HEY! You are trying to use an older version of ReactSVGPanZoom. Please read here ".concat(doc_v1_to_v2));
}

function tipControlledComponent() {
  console.error("HEY! With ReactSVGPanZoom >= 3 you MUST specify value and tool props. Please read here ".concat(doc_v2_to_v3));
}

function tipDeprecatedMiniatureProps() {
  console.error("HEY! With ReactSVGPanZoom >= 3 the props miniaturePosition, miniatureBackground, miniatureWidth, miniatureHeight can be specified as key in the miniatureProps object. Please read here ".concat(doc_v2_to_v3));
}

function tipDeprecateToolbarProps() {
  console.error("HEY! With ReactSVGPanZoom >= 3 the prop toolbarPosition can be specified as key in the toolbarProps object. Please read here ".concat(doc_v2_to_v3));
}

function printMigrationTipsRelatedToProps(props) {
  if ((0, _is.isNullOrUndefined)(props.tool) || (0, _is.isNullOrUndefined)(props.value)) tipControlledComponent();
  if (!(0, _is.isNullOrUndefined)(props.miniaturePosition) || !(0, _is.isNullOrUndefined)(props.miniatureBackground) || !(0, _is.isNullOrUndefined)(props.miniatureWidth) || !(0, _is.isNullOrUndefined)(props.miniatureHeight)) tipDeprecatedMiniatureProps();
  if (!(0, _is.isNullOrUndefined)(props.toolbarPosition)) tipDeprecateToolbarProps();
}