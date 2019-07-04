import omitDeep from 'omit-deep';
import rename from 'deep-rename-keys';
import clean from 'clean-deep';
import { parseSync } from 'xml-reader';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var parseInput = function parseInput(input) {
  var parsed = parseSync(input, {
    parentNodes: false
  });
  var hasMoreChildren = parsed.name === 'root' && parsed.children.length > 1;
  var isValid = hasMoreChildren ? parsed.children.reduce(function (acc, _ref) {
    var name = _ref.name;
    return !acc ? name === 'svg' : true;
  }, false) : parsed.children[0].name === 'svg';

  if (isValid) {
    return hasMoreChildren ? parsed : parsed.children[0];
  } else {
    throw Error('nothing to parse');
  }
};
var removeDoctype = function removeDoctype(input) {
  return input.replace(/<[\/]{0,1}(\!?DOCTYPE|\??xml)[^><]*>/gi, '');
};
var wrapInput = function wrapInput(input) {
  return "<root>".concat(input, "</root>");
};
var removeAttrs = function removeAttrs(obj) {
  return omitDeep(obj, ['parent']);
};
var applyCompat = function applyCompat(node) {
  var renamed = rename(node, function (key) {
    if (key === 'attributes') {
      return 'attrs';
    }

    if (key === 'children') {
      return 'childs';
    }

    return key;
  });
  return omitDeep(clean(renamed), ['type']);
};
var camelize = function camelize(node) {
  return rename(node, function (key) {
    if (!notCamelcase(key)) {
      return toCamelCase(key);
    }

    return key;
  });
};
var toCamelCase = function toCamelCase(prop) {
  return prop.replace(/[-|:]([a-z])/gi, function (all, letter) {
    return letter.toUpperCase();
  });
};

var notCamelcase = function notCamelcase(prop) {
  return /^(data|aria)(-\w+)/.test(prop);
};

var escapeText = function escapeText(text) {
  if (text) {
    var str = String(text);
    return /[&<>]/.test(str) ? "<![CDATA[".concat(str.replace(/]]>/, ']]]]><![CDATA[>'), "]]>") : str;
  }

  return '';
};
var escapeAttr = function escapeAttr(attr) {
  return String(attr).replace(/&/g, '&amp;').replace(/'/g, '&apos;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

var svgsonSync = function svgsonSync(input) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$transformNode = _ref.transformNode,
      transformNode = _ref$transformNode === void 0 ? function (node) {
    return node;
  } : _ref$transformNode,
      _ref$compat = _ref.compat,
      compat = _ref$compat === void 0 ? false : _ref$compat,
      _ref$camelcase = _ref.camelcase,
      camelcase = _ref$camelcase === void 0 ? false : _ref$camelcase;

  var wrap = function wrap(input) {
    var cleanInput = removeDoctype(input);
    return wrapInput(cleanInput);
  };

  var unwrap = function unwrap(res) {
    return res.name === 'root' ? res.children : res;
  };

  var applyFilters = function applyFilters(input) {
    var applyTransformNode = function applyTransformNode(node) {
      var children = compat ? node.childs : node.children;
      return node.name === 'root' ? children.map(applyTransformNode) : _objectSpread({}, transformNode(node), children && children.length > 0 ? _defineProperty({}, compat ? 'childs' : 'children', children.map(applyTransformNode)) : {});
    };

    var n;
    n = removeAttrs(input);

    if (compat) {
      n = applyCompat(n);
    }

    n = applyTransformNode(n);

    if (camelcase || compat) {
      n = camelize(n);
    }

    return n;
  };

  return unwrap(applyFilters(parseInput(wrap(input))));
};
function svgson() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new Promise(function (resolve, reject) {
    try {
      var res = svgsonSync.apply(void 0, args);
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
}

var stringify = function stringify(ast) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$transformAttr = _ref.transformAttr,
      transformAttr = _ref$transformAttr === void 0 ? function (key, value, escape) {
    return "".concat(key, "=\"").concat(escape(value), "\"");
  } : _ref$transformAttr,
      _ref$selfClose = _ref.selfClose,
      selfClose = _ref$selfClose === void 0 ? true : _ref$selfClose;

  if (Array.isArray(ast)) {
    return ast.map(function (ast) {
      return stringify(ast, {
        transformAttr: transformAttr,
        selfClose: selfClose
      });
    }).join('');
  }

  if (ast.type === 'text') {
    return escapeText(ast.value);
  }

  var attributes = '';

  for (var attr in ast.attributes) {
    var attrStr = transformAttr(attr, ast.attributes[attr], escapeAttr, ast.name);
    attributes += attrStr ? " ".concat(attrStr) : '';
  }

  return ast.children.length || !selfClose ? "<".concat(ast.name).concat(attributes, ">").concat(stringify(ast.children, {
    transformAttr: transformAttr,
    selfClose: selfClose
  }), "</").concat(ast.name, ">") : "<".concat(ast.name).concat(attributes, "/>");
};

export default svgson;
export { stringify, svgson as parse, svgsonSync as parseSync };
