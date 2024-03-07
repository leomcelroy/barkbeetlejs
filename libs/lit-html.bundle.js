// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

// @ts-nocheck
/* eslint-disable */
let System, __instantiateAsync, __instantiate;

(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };

  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }

  __instantiateAsync = async (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExpA(m);
  };

  __instantiate = (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExp(m);
  };
})();

System.register("lib/directive", [], function (exports_1, context_1) {
    "use strict";
    var directives, directive, isDirective;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            /**
             * @license
             * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
             * This code may only be used under the BSD style license found at
             * http://polymer.github.io/LICENSE.txt
             * The complete set of authors may be found at
             * http://polymer.github.io/AUTHORS.txt
             * The complete set of contributors may be found at
             * http://polymer.github.io/CONTRIBUTORS.txt
             * Code distributed by Google as part of the polymer project is also
             * subject to an additional IP rights grant found at
             * http://polymer.github.io/PATENTS.txt
             */
            directives = new WeakMap();
            /**
             * Brands a function as a directive factory function so that lit-html will call
             * the function during template rendering, rather than passing as a value.
             *
             * A _directive_ is a function that takes a Part as an argument. It has the
             * signature: `(part: Part) => void`.
             *
             * A directive _factory_ is a function that takes arguments for data and
             * configuration and returns a directive. Users of directive usually refer to
             * the directive factory as the directive. For example, "The repeat directive".
             *
             * Usually a template author will invoke a directive factory in their template
             * with relevant arguments, which will then return a directive function.
             *
             * Here's an example of using the `repeat()` directive factory that takes an
             * array and a function to render an item:
             *
             * ```js
             * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
             * ```
             *
             * When `repeat` is invoked, it returns a directive function that closes over
             * `items` and the template function. When the outer template is rendered, the
             * return directive function is called with the Part for the expression.
             * `repeat` then performs it's custom logic to render multiple items.
             *
             * @param f The directive factory function. Must be a function that returns a
             * function of the signature `(part: Part) => void`. The returned function will
             * be called with the part object.
             *
             * @example
             *
             * import {directive, html} from 'lit-html';
             *
             * const immutable = directive((v) => (part) => {
             *   if (part.value !== v) {
             *     part.setValue(v)
             *   }
             * });
             */
            exports_1("directive", directive = (f) => ((...args) => {
                const d = f(...args);
                directives.set(d, true);
                return d;
            }));
            exports_1("isDirective", isDirective = (o) => {
                return typeof o === 'function' && directives.has(o);
            });
        }
    };
});
System.register("lib/dom", [], function (exports_2, context_2) {
    "use strict";
    var isCEPolyfill, reparentNodes, removeNodes;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            /**
             * @license
             * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
             * This code may only be used under the BSD style license found at
             * http://polymer.github.io/LICENSE.txt
             * The complete set of authors may be found at
             * http://polymer.github.io/AUTHORS.txt
             * The complete set of contributors may be found at
             * http://polymer.github.io/CONTRIBUTORS.txt
             * Code distributed by Google as part of the polymer project is also
             * subject to an additional IP rights grant found at
             * http://polymer.github.io/PATENTS.txt
             */
            /**
             * True if the custom elements polyfill is in use.
             */
            exports_2("isCEPolyfill", isCEPolyfill = typeof window !== 'undefined' &&
                window.customElements != null &&
                window.customElements.polyfillWrapFlushCallback !==
                    undefined);
            /**
             * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
             * into another container (could be the same container), before `before`. If
             * `before` is null, it appends the nodes to the container.
             */
            exports_2("reparentNodes", reparentNodes = (container, start, end = null, before = null) => {
                while (start !== end) {
                    const n = start.nextSibling;
                    container.insertBefore(start, before);
                    start = n;
                }
            });
            /**
             * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
             * `container`.
             */
            exports_2("removeNodes", removeNodes = (container, start, end = null) => {
                while (start !== end) {
                    const n = start.nextSibling;
                    container.removeChild(start);
                    start = n;
                }
            });
        }
    };
});
System.register("lib/part", [], function (exports_3, context_3) {
    "use strict";
    var noChange, nothing;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            /**
             * @license
             * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
             * This code may only be used under the BSD style license found at
             * http://polymer.github.io/LICENSE.txt
             * The complete set of authors may be found at
             * http://polymer.github.io/AUTHORS.txt
             * The complete set of contributors may be found at
             * http://polymer.github.io/CONTRIBUTORS.txt
             * Code distributed by Google as part of the polymer project is also
             * subject to an additional IP rights grant found at
             * http://polymer.github.io/PATENTS.txt
             */
            /**
             * A sentinel value that signals that a value was handled by a directive and
             * should not be written to the DOM.
             */
            exports_3("noChange", noChange = {});
            /**
             * A sentinel value that signals a NodePart to fully clear its content.
             */
            exports_3("nothing", nothing = {});
        }
    };
});
System.register("lib/template", [], function (exports_4, context_4) {
    "use strict";
    var marker, nodeMarker, markerRegex, boundAttributeSuffix, Template, endsWith, isTemplatePartActive, createMarker, lastAttributeNameRegex;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            /**
             * @license
             * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
             * This code may only be used under the BSD style license found at
             * http://polymer.github.io/LICENSE.txt
             * The complete set of authors may be found at
             * http://polymer.github.io/AUTHORS.txt
             * The complete set of contributors may be found at
             * http://polymer.github.io/CONTRIBUTORS.txt
             * Code distributed by Google as part of the polymer project is also
             * subject to an additional IP rights grant found at
             * http://polymer.github.io/PATENTS.txt
             */
            /**
             * An expression marker with embedded unique key to avoid collision with
             * possible text in templates.
             */
            exports_4("marker", marker = `{{lit-${String(Math.random()).slice(2)}}}`);
            /**
             * An expression marker used text-positions, multi-binding attributes, and
             * attributes with markup-like text values.
             */
            exports_4("nodeMarker", nodeMarker = `<!--${marker}-->`);
            exports_4("markerRegex", markerRegex = new RegExp(`${marker}|${nodeMarker}`));
            /**
             * Suffix appended to all bound attribute names.
             */
            exports_4("boundAttributeSuffix", boundAttributeSuffix = '$lit$');
            /**
             * An updatable Template that tracks the location of dynamic parts.
             */
            Template = class Template {
                constructor(result, element) {
                    this.parts = [];
                    this.element = element;
                    const nodesToRemove = [];
                    const stack = [];
                    // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
                    const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
                    // Keeps track of the last index associated with a part. We try to delete
                    // unnecessary nodes, but we never want to associate two different parts
                    // to the same index. They must have a constant node between.
                    let lastPartIndex = 0;
                    let index = -1;
                    let partIndex = 0;
                    const { strings, values: { length } } = result;
                    while (partIndex < length) {
                        const node = walker.nextNode();
                        if (node === null) {
                            // We've exhausted the content inside a nested template element.
                            // Because we still have parts (the outer for-loop), we know:
                            // - There is a template in the stack
                            // - The walker will find a nextNode outside the template
                            walker.currentNode = stack.pop();
                            continue;
                        }
                        index++;
                        if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                            if (node.hasAttributes()) {
                                const attributes = node.attributes;
                                const { length } = attributes;
                                // Per
                                // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                                // attributes are not guaranteed to be returned in document order.
                                // In particular, Edge/IE can return them out of order, so we cannot
                                // assume a correspondence between part index and attribute index.
                                let count = 0;
                                for (let i = 0; i < length; i++) {
                                    if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                                        count++;
                                    }
                                }
                                while (count-- > 0) {
                                    // Get the template literal section leading up to the first
                                    // expression in this attribute
                                    const stringForPart = strings[partIndex];
                                    // Find the attribute name
                                    const name = lastAttributeNameRegex.exec(stringForPart)[2];
                                    // Find the corresponding attribute
                                    // All bound attributes have had a suffix added in
                                    // TemplateResult#getHTML to opt out of special attribute
                                    // handling. To look up the attribute value we also need to add
                                    // the suffix.
                                    const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                                    const attributeValue = node.getAttribute(attributeLookupName);
                                    node.removeAttribute(attributeLookupName);
                                    const statics = attributeValue.split(markerRegex);
                                    this.parts.push({ type: 'attribute', index, name, strings: statics });
                                    partIndex += statics.length - 1;
                                }
                            }
                            if (node.tagName === 'TEMPLATE') {
                                stack.push(node);
                                walker.currentNode = node.content;
                            }
                        }
                        else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                            const data = node.data;
                            if (data.indexOf(marker) >= 0) {
                                const parent = node.parentNode;
                                const strings = data.split(markerRegex);
                                const lastIndex = strings.length - 1;
                                // Generate a new text node for each literal section
                                // These nodes are also used as the markers for node parts
                                for (let i = 0; i < lastIndex; i++) {
                                    let insert;
                                    let s = strings[i];
                                    if (s === '') {
                                        insert = createMarker();
                                    }
                                    else {
                                        const match = lastAttributeNameRegex.exec(s);
                                        if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                            s = s.slice(0, match.index) + match[1] +
                                                match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                                        }
                                        insert = document.createTextNode(s);
                                    }
                                    parent.insertBefore(insert, node);
                                    this.parts.push({ type: 'node', index: ++index });
                                }
                                // If there's no text, we must insert a comment to mark our place.
                                // Else, we can trust it will stick around after cloning.
                                if (strings[lastIndex] === '') {
                                    parent.insertBefore(createMarker(), node);
                                    nodesToRemove.push(node);
                                }
                                else {
                                    node.data = strings[lastIndex];
                                }
                                // We have a part for each match found
                                partIndex += lastIndex;
                            }
                        }
                        else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                            if (node.data === marker) {
                                const parent = node.parentNode;
                                // Add a new marker node to be the startNode of the Part if any of
                                // the following are true:
                                //  * We don't have a previousSibling
                                //  * The previousSibling is already the start of a previous part
                                if (node.previousSibling === null || index === lastPartIndex) {
                                    index++;
                                    parent.insertBefore(createMarker(), node);
                                }
                                lastPartIndex = index;
                                this.parts.push({ type: 'node', index });
                                // If we don't have a nextSibling, keep this node so we have an end.
                                // Else, we can remove it to save future costs.
                                if (node.nextSibling === null) {
                                    node.data = '';
                                }
                                else {
                                    nodesToRemove.push(node);
                                    index--;
                                }
                                partIndex++;
                            }
                            else {
                                let i = -1;
                                while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                                    // Comment node has a binding marker inside, make an inactive part
                                    // The binding won't work, but subsequent bindings will
                                    // TODO (justinfagnani): consider whether it's even worth it to
                                    // make bindings in comments work
                                    this.parts.push({ type: 'node', index: -1 });
                                    partIndex++;
                                }
                            }
                        }
                    }
                    // Remove text binding nodes after the walk to not disturb the TreeWalker
                    for (const n of nodesToRemove) {
                        n.parentNode.removeChild(n);
                    }
                }
            };
            exports_4("Template", Template);
            endsWith = (str, suffix) => {
                const index = str.length - suffix.length;
                return index >= 0 && str.slice(index) === suffix;
            };
            exports_4("isTemplatePartActive", isTemplatePartActive = (part) => part.index !== -1);
            // Allows `document.createComment('')` to be renamed for a
            // small manual size-savings.
            exports_4("createMarker", createMarker = () => document.createComment(''));
            /**
             * This regex extracts the attribute name preceding an attribute-position
             * expression. It does this by matching the syntax allowed for attributes
             * against the string literal directly preceding the expression, assuming that
             * the expression is in an attribute-value position.
             *
             * See attributes in the HTML spec:
             * https://www.w3.org/TR/html5/syntax.html#elements-attributes
             *
             * " \x09\x0a\x0c\x0d" are HTML space characters:
             * https://www.w3.org/TR/html5/infrastructure.html#space-characters
             *
             * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
             * space character except " ".
             *
             * So an attribute is:
             *  * The name: any character except a control character, space character, ('),
             *    ("), ">", "=", or "/"
             *  * Followed by zero or more space characters
             *  * Followed by "="
             *  * Followed by zero or more space characters
             *  * Followed by:
             *    * Any character except space, ('), ("), "<", ">", "=", (`), or
             *    * (") then any non-("), or
             *    * (') then any non-(')
             */
            exports_4("lastAttributeNameRegex", lastAttributeNameRegex = 
            // eslint-disable-next-line no-control-regex
            /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/);
        }
    };
});
System.register("lib/template-instance", ["lib/dom", "lib/template"], function (exports_5, context_5) {
    "use strict";
    var dom_js_1, template_js_1, TemplateInstance;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (dom_js_1_1) {
                dom_js_1 = dom_js_1_1;
            },
            function (template_js_1_1) {
                template_js_1 = template_js_1_1;
            }
        ],
        execute: function () {
            /**
             * An instance of a `Template` that can be attached to the DOM and updated
             * with new values.
             */
            TemplateInstance = class TemplateInstance {
                constructor(template, processor, options) {
                    this.__parts = [];
                    this.template = template;
                    this.processor = processor;
                    this.options = options;
                }
                update(values) {
                    let i = 0;
                    for (const part of this.__parts) {
                        if (part !== undefined) {
                            part.setValue(values[i]);
                        }
                        i++;
                    }
                    for (const part of this.__parts) {
                        if (part !== undefined) {
                            part.commit();
                        }
                    }
                }
                _clone() {
                    // There are a number of steps in the lifecycle of a template instance's
                    // DOM fragment:
                    //  1. Clone - create the instance fragment
                    //  2. Adopt - adopt into the main document
                    //  3. Process - find part markers and create parts
                    //  4. Upgrade - upgrade custom elements
                    //  5. Update - set node, attribute, property, etc., values
                    //  6. Connect - connect to the document. Optional and outside of this
                    //     method.
                    //
                    // We have a few constraints on the ordering of these steps:
                    //  * We need to upgrade before updating, so that property values will pass
                    //    through any property setters.
                    //  * We would like to process before upgrading so that we're sure that the
                    //    cloned fragment is inert and not disturbed by self-modifying DOM.
                    //  * We want custom elements to upgrade even in disconnected fragments.
                    //
                    // Given these constraints, with full custom elements support we would
                    // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
                    //
                    // But Safari does not implement CustomElementRegistry#upgrade, so we
                    // can not implement that order and still have upgrade-before-update and
                    // upgrade disconnected fragments. So we instead sacrifice the
                    // process-before-upgrade constraint, since in Custom Elements v1 elements
                    // must not modify their light DOM in the constructor. We still have issues
                    // when co-existing with CEv0 elements like Polymer 1, and with polyfills
                    // that don't strictly adhere to the no-modification rule because shadow
                    // DOM, which may be created in the constructor, is emulated by being placed
                    // in the light DOM.
                    //
                    // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
                    // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
                    // in one step.
                    //
                    // The Custom Elements v1 polyfill supports upgrade(), so the order when
                    // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
                    // Connect.
                    const fragment = dom_js_1.isCEPolyfill ?
                        this.template.element.content.cloneNode(true) :
                        document.importNode(this.template.element.content, true);
                    const stack = [];
                    const parts = this.template.parts;
                    // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
                    const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
                    let partIndex = 0;
                    let nodeIndex = 0;
                    let part;
                    let node = walker.nextNode();
                    // Loop through all the nodes and parts of a template
                    while (partIndex < parts.length) {
                        part = parts[partIndex];
                        if (!template_js_1.isTemplatePartActive(part)) {
                            this.__parts.push(undefined);
                            partIndex++;
                            continue;
                        }
                        // Progress the tree walker until we find our next part's node.
                        // Note that multiple parts may share the same node (attribute parts
                        // on a single element), so this loop may not run at all.
                        while (nodeIndex < part.index) {
                            nodeIndex++;
                            if (node.nodeName === 'TEMPLATE') {
                                stack.push(node);
                                walker.currentNode = node.content;
                            }
                            if ((node = walker.nextNode()) === null) {
                                // We've exhausted the content inside a nested template element.
                                // Because we still have parts (the outer for-loop), we know:
                                // - There is a template in the stack
                                // - The walker will find a nextNode outside the template
                                walker.currentNode = stack.pop();
                                node = walker.nextNode();
                            }
                        }
                        // We've arrived at our part's node.
                        if (part.type === 'node') {
                            const part = this.processor.handleTextExpression(this.options);
                            part.insertAfterNode(node.previousSibling);
                            this.__parts.push(part);
                        }
                        else {
                            this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
                        }
                        partIndex++;
                    }
                    if (dom_js_1.isCEPolyfill) {
                        document.adoptNode(fragment);
                        customElements.upgrade(fragment);
                    }
                    return fragment;
                }
            };
            exports_5("TemplateInstance", TemplateInstance);
        }
    };
});
System.register("lib/template-result", ["lib/dom", "lib/template"], function (exports_6, context_6) {
    "use strict";
    var dom_js_2, template_js_2, commentMarker, TemplateResult, SVGTemplateResult;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (dom_js_2_1) {
                dom_js_2 = dom_js_2_1;
            },
            function (template_js_2_1) {
                template_js_2 = template_js_2_1;
            }
        ],
        execute: function () {
            commentMarker = ` ${template_js_2.marker} `;
            /**
             * The return type of `html`, which holds a Template and the values from
             * interpolated expressions.
             */
            TemplateResult = class TemplateResult {
                constructor(strings, values, type, processor) {
                    this.strings = strings;
                    this.values = values;
                    this.type = type;
                    this.processor = processor;
                }
                /**
                 * Returns a string of HTML used to create a `<template>` element.
                 */
                getHTML() {
                    const l = this.strings.length - 1;
                    let html = '';
                    let isCommentBinding = false;
                    for (let i = 0; i < l; i++) {
                        const s = this.strings[i];
                        // For each binding we want to determine the kind of marker to insert
                        // into the template source before it's parsed by the browser's HTML
                        // parser. The marker type is based on whether the expression is in an
                        // attribute, text, or comment position.
                        //   * For node-position bindings we insert a comment with the marker
                        //     sentinel as its text content, like <!--{{lit-guid}}-->.
                        //   * For attribute bindings we insert just the marker sentinel for the
                        //     first binding, so that we support unquoted attribute bindings.
                        //     Subsequent bindings can use a comment marker because multi-binding
                        //     attributes must be quoted.
                        //   * For comment bindings we insert just the marker sentinel so we don't
                        //     close the comment.
                        //
                        // The following code scans the template source, but is *not* an HTML
                        // parser. We don't need to track the tree structure of the HTML, only
                        // whether a binding is inside a comment, and if not, if it appears to be
                        // the first binding in an attribute.
                        const commentOpen = s.lastIndexOf('<!--');
                        // We're in comment position if we have a comment open with no following
                        // comment close. Because <-- can appear in an attribute value there can
                        // be false positives.
                        isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                            s.indexOf('-->', commentOpen + 1) === -1;
                        // Check to see if we have an attribute-like sequence preceding the
                        // expression. This can match "name=value" like structures in text,
                        // comments, and attribute values, so there can be false-positives.
                        const attributeMatch = template_js_2.lastAttributeNameRegex.exec(s);
                        if (attributeMatch === null) {
                            // We're only in this branch if we don't have a attribute-like
                            // preceding sequence. For comments, this guards against unusual
                            // attribute values like <div foo="<!--${'bar'}">. Cases like
                            // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                            // below.
                            html += s + (isCommentBinding ? commentMarker : template_js_2.nodeMarker);
                        }
                        else {
                            // For attributes we use just a marker sentinel, and also append a
                            // $lit$ suffix to the name to opt-out of attribute-specific parsing
                            // that IE and Edge do for style and certain SVG attributes.
                            html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                                attributeMatch[2] + template_js_2.boundAttributeSuffix + attributeMatch[3] +
                                template_js_2.marker;
                        }
                    }
                    html += this.strings[l];
                    return html;
                }
                getTemplateElement() {
                    const template = document.createElement('template');
                    template.innerHTML = this.getHTML();
                    return template;
                }
            };
            exports_6("TemplateResult", TemplateResult);
            /**
             * A TemplateResult for SVG fragments.
             *
             * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
             * SVG namespace, then modifies the template to remove the `<svg>` tag so that
             * clones only container the original fragment.
             */
            SVGTemplateResult = class SVGTemplateResult extends TemplateResult {
                getHTML() {
                    return `<svg>${super.getHTML()}</svg>`;
                }
                getTemplateElement() {
                    const template = super.getTemplateElement();
                    const content = template.content;
                    const svgElement = content.firstChild;
                    content.removeChild(svgElement);
                    dom_js_2.reparentNodes(content, svgElement.firstChild);
                    return template;
                }
            };
            exports_6("SVGTemplateResult", SVGTemplateResult);
        }
    };
});
System.register("lib/parts", ["lib/directive", "lib/dom", "lib/part", "lib/template-instance", "lib/template-result", "lib/template"], function (exports_7, context_7) {
    "use strict";
    var directive_js_1, dom_js_3, part_js_1, template_instance_js_1, template_result_js_1, template_js_3, isPrimitive, isIterable, AttributeCommitter, AttributePart, NodePart, BooleanAttributePart, PropertyCommitter, PropertyPart, eventOptionsSupported, EventPart, getOptions;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (directive_js_1_1) {
                directive_js_1 = directive_js_1_1;
            },
            function (dom_js_3_1) {
                dom_js_3 = dom_js_3_1;
            },
            function (part_js_1_1) {
                part_js_1 = part_js_1_1;
            },
            function (template_instance_js_1_1) {
                template_instance_js_1 = template_instance_js_1_1;
            },
            function (template_result_js_1_1) {
                template_result_js_1 = template_result_js_1_1;
            },
            function (template_js_3_1) {
                template_js_3 = template_js_3_1;
            }
        ],
        execute: function () {
            exports_7("isPrimitive", isPrimitive = (value) => {
                return (value === null ||
                    !(typeof value === 'object' || typeof value === 'function'));
            });
            exports_7("isIterable", isIterable = (value) => {
                return Array.isArray(value) ||
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    !!(value && value[Symbol.iterator]);
            });
            /**
             * Writes attribute values to the DOM for a group of AttributeParts bound to a
             * single attribute. The value is only set once even if there are multiple parts
             * for an attribute.
             */
            AttributeCommitter = class AttributeCommitter {
                constructor(element, name, strings) {
                    this.dirty = true;
                    this.element = element;
                    this.name = name;
                    this.strings = strings;
                    this.parts = [];
                    for (let i = 0; i < strings.length - 1; i++) {
                        this.parts[i] = this._createPart();
                    }
                }
                /**
                 * Creates a single part. Override this to create a differnt type of part.
                 */
                _createPart() {
                    return new AttributePart(this);
                }
                _getValue() {
                    const strings = this.strings;
                    const l = strings.length - 1;
                    let text = '';
                    for (let i = 0; i < l; i++) {
                        text += strings[i];
                        const part = this.parts[i];
                        if (part !== undefined) {
                            const v = part.value;
                            if (isPrimitive(v) || !isIterable(v)) {
                                text += typeof v === 'string' ? v : String(v);
                            }
                            else {
                                for (const t of v) {
                                    text += typeof t === 'string' ? t : String(t);
                                }
                            }
                        }
                    }
                    text += strings[l];
                    return text;
                }
                commit() {
                    if (this.dirty) {
                        this.dirty = false;
                        this.element.setAttribute(this.name, this._getValue());
                    }
                }
            };
            exports_7("AttributeCommitter", AttributeCommitter);
            /**
             * A Part that controls all or part of an attribute value.
             */
            AttributePart = class AttributePart {
                constructor(committer) {
                    this.value = undefined;
                    this.committer = committer;
                }
                setValue(value) {
                    if (value !== part_js_1.noChange && (!isPrimitive(value) || value !== this.value)) {
                        this.value = value;
                        // If the value is a not a directive, dirty the committer so that it'll
                        // call setAttribute. If the value is a directive, it'll dirty the
                        // committer if it calls setValue().
                        if (!directive_js_1.isDirective(value)) {
                            this.committer.dirty = true;
                        }
                    }
                }
                commit() {
                    while (directive_js_1.isDirective(this.value)) {
                        const directive = this.value;
                        this.value = part_js_1.noChange;
                        directive(this);
                    }
                    if (this.value === part_js_1.noChange) {
                        return;
                    }
                    this.committer.commit();
                }
            };
            exports_7("AttributePart", AttributePart);
            /**
             * A Part that controls a location within a Node tree. Like a Range, NodePart
             * has start and end locations and can set and update the Nodes between those
             * locations.
             *
             * NodeParts support several value types: primitives, Nodes, TemplateResults,
             * as well as arrays and iterables of those types.
             */
            NodePart = class NodePart {
                constructor(options) {
                    this.value = undefined;
                    this.__pendingValue = undefined;
                    this.options = options;
                }
                /**
                 * Appends this part into a container.
                 *
                 * This part must be empty, as its contents are not automatically moved.
                 */
                appendInto(container) {
                    this.startNode = container.appendChild(template_js_3.createMarker());
                    this.endNode = container.appendChild(template_js_3.createMarker());
                }
                /**
                 * Inserts this part after the `ref` node (between `ref` and `ref`'s next
                 * sibling). Both `ref` and its next sibling must be static, unchanging nodes
                 * such as those that appear in a literal section of a template.
                 *
                 * This part must be empty, as its contents are not automatically moved.
                 */
                insertAfterNode(ref) {
                    this.startNode = ref;
                    this.endNode = ref.nextSibling;
                }
                /**
                 * Appends this part into a parent part.
                 *
                 * This part must be empty, as its contents are not automatically moved.
                 */
                appendIntoPart(part) {
                    part.__insert(this.startNode = template_js_3.createMarker());
                    part.__insert(this.endNode = template_js_3.createMarker());
                }
                /**
                 * Inserts this part after the `ref` part.
                 *
                 * This part must be empty, as its contents are not automatically moved.
                 */
                insertAfterPart(ref) {
                    ref.__insert(this.startNode = template_js_3.createMarker());
                    this.endNode = ref.endNode;
                    ref.endNode = this.startNode;
                }
                setValue(value) {
                    this.__pendingValue = value;
                }
                commit() {
                    if (this.startNode.parentNode === null) {
                        return;
                    }
                    while (directive_js_1.isDirective(this.__pendingValue)) {
                        const directive = this.__pendingValue;
                        this.__pendingValue = part_js_1.noChange;
                        directive(this);
                    }
                    const value = this.__pendingValue;
                    if (value === part_js_1.noChange) {
                        return;
                    }
                    if (isPrimitive(value)) {
                        if (value !== this.value) {
                            this.__commitText(value);
                        }
                    }
                    else if (value instanceof template_result_js_1.TemplateResult) {
                        this.__commitTemplateResult(value);
                    }
                    else if (value instanceof Node) {
                        this.__commitNode(value);
                    }
                    else if (isIterable(value)) {
                        this.__commitIterable(value);
                    }
                    else if (value === part_js_1.nothing) {
                        this.value = part_js_1.nothing;
                        this.clear();
                    }
                    else {
                        // Fallback, will render the string representation
                        this.__commitText(value);
                    }
                }
                __insert(node) {
                    this.endNode.parentNode.insertBefore(node, this.endNode);
                }
                __commitNode(value) {
                    if (this.value === value) {
                        return;
                    }
                    this.clear();
                    this.__insert(value);
                    this.value = value;
                }
                __commitText(value) {
                    const node = this.startNode.nextSibling;
                    value = value == null ? '' : value;
                    // If `value` isn't already a string, we explicitly convert it here in case
                    // it can't be implicitly converted - i.e. it's a symbol.
                    const valueAsString = typeof value === 'string' ? value : String(value);
                    if (node === this.endNode.previousSibling &&
                        node.nodeType === 3 /* Node.TEXT_NODE */) {
                        // If we only have a single text node between the markers, we can just
                        // set its value, rather than replacing it.
                        // TODO(justinfagnani): Can we just check if this.value is primitive?
                        node.data = valueAsString;
                    }
                    else {
                        this.__commitNode(document.createTextNode(valueAsString));
                    }
                    this.value = value;
                }
                __commitTemplateResult(value) {
                    const template = this.options.templateFactory(value);
                    if (this.value instanceof template_instance_js_1.TemplateInstance &&
                        this.value.template === template) {
                        this.value.update(value.values);
                    }
                    else {
                        // Make sure we propagate the template processor from the TemplateResult
                        // so that we use its syntax extension, etc. The template factory comes
                        // from the render function options so that it can control template
                        // caching and preprocessing.
                        const instance = new template_instance_js_1.TemplateInstance(template, value.processor, this.options);
                        const fragment = instance._clone();
                        instance.update(value.values);
                        this.__commitNode(fragment);
                        this.value = instance;
                    }
                }
                __commitIterable(value) {
                    // For an Iterable, we create a new InstancePart per item, then set its
                    // value to the item. This is a little bit of overhead for every item in
                    // an Iterable, but it lets us recurse easily and efficiently update Arrays
                    // of TemplateResults that will be commonly returned from expressions like:
                    // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
                    // If _value is an array, then the previous render was of an
                    // iterable and _value will contain the NodeParts from the previous
                    // render. If _value is not an array, clear this part and make a new
                    // array for NodeParts.
                    if (!Array.isArray(this.value)) {
                        this.value = [];
                        this.clear();
                    }
                    // Lets us keep track of how many items we stamped so we can clear leftover
                    // items from a previous render
                    const itemParts = this.value;
                    let partIndex = 0;
                    let itemPart;
                    for (const item of value) {
                        // Try to reuse an existing part
                        itemPart = itemParts[partIndex];
                        // If no existing part, create a new one
                        if (itemPart === undefined) {
                            itemPart = new NodePart(this.options);
                            itemParts.push(itemPart);
                            if (partIndex === 0) {
                                itemPart.appendIntoPart(this);
                            }
                            else {
                                itemPart.insertAfterPart(itemParts[partIndex - 1]);
                            }
                        }
                        itemPart.setValue(item);
                        itemPart.commit();
                        partIndex++;
                    }
                    if (partIndex < itemParts.length) {
                        // Truncate the parts array so _value reflects the current state
                        itemParts.length = partIndex;
                        this.clear(itemPart && itemPart.endNode);
                    }
                }
                clear(startNode = this.startNode) {
                    dom_js_3.removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
                }
            };
            exports_7("NodePart", NodePart);
            /**
             * Implements a boolean attribute, roughly as defined in the HTML
             * specification.
             *
             * If the value is truthy, then the attribute is present with a value of
             * ''. If the value is falsey, the attribute is removed.
             */
            BooleanAttributePart = class BooleanAttributePart {
                constructor(element, name, strings) {
                    this.value = undefined;
                    this.__pendingValue = undefined;
                    if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
                        throw new Error('Boolean attributes can only contain a single expression');
                    }
                    this.element = element;
                    this.name = name;
                    this.strings = strings;
                }
                setValue(value) {
                    this.__pendingValue = value;
                }
                commit() {
                    while (directive_js_1.isDirective(this.__pendingValue)) {
                        const directive = this.__pendingValue;
                        this.__pendingValue = part_js_1.noChange;
                        directive(this);
                    }
                    if (this.__pendingValue === part_js_1.noChange) {
                        return;
                    }
                    const value = !!this.__pendingValue;
                    if (this.value !== value) {
                        if (value) {
                            this.element.setAttribute(this.name, '');
                        }
                        else {
                            this.element.removeAttribute(this.name);
                        }
                        this.value = value;
                    }
                    this.__pendingValue = part_js_1.noChange;
                }
            };
            exports_7("BooleanAttributePart", BooleanAttributePart);
            /**
             * Sets attribute values for PropertyParts, so that the value is only set once
             * even if there are multiple parts for a property.
             *
             * If an expression controls the whole property value, then the value is simply
             * assigned to the property under control. If there are string literals or
             * multiple expressions, then the strings are expressions are interpolated into
             * a string first.
             */
            PropertyCommitter = class PropertyCommitter extends AttributeCommitter {
                constructor(element, name, strings) {
                    super(element, name, strings);
                    this.single =
                        (strings.length === 2 && strings[0] === '' && strings[1] === '');
                }
                _createPart() {
                    return new PropertyPart(this);
                }
                _getValue() {
                    if (this.single) {
                        return this.parts[0].value;
                    }
                    return super._getValue();
                }
                commit() {
                    if (this.dirty) {
                        this.dirty = false;
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        this.element[this.name] = this._getValue();
                    }
                }
            };
            exports_7("PropertyCommitter", PropertyCommitter);
            PropertyPart = class PropertyPart extends AttributePart {
            };
            exports_7("PropertyPart", PropertyPart);
            // Detect event listener options support. If the `capture` property is read
            // from the options object, then options are supported. If not, then the third
            // argument to add/removeEventListener is interpreted as the boolean capture
            // value so we should only pass the `capture` property.
            eventOptionsSupported = false;
            // Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
            // blocks right into the body of a module
            (() => {
                try {
                    const options = {
                        get capture() {
                            eventOptionsSupported = true;
                            return false;
                        }
                    };
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    window.addEventListener('test', options, options);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    window.removeEventListener('test', options, options);
                }
                catch (_e) {
                    // event options not supported
                }
            })();
            EventPart = class EventPart {
                constructor(element, eventName, eventContext) {
                    this.value = undefined;
                    this.__pendingValue = undefined;
                    this.element = element;
                    this.eventName = eventName;
                    this.eventContext = eventContext;
                    this.__boundHandleEvent = (e) => this.handleEvent(e);
                }
                setValue(value) {
                    this.__pendingValue = value;
                }
                commit() {
                    while (directive_js_1.isDirective(this.__pendingValue)) {
                        const directive = this.__pendingValue;
                        this.__pendingValue = part_js_1.noChange;
                        directive(this);
                    }
                    if (this.__pendingValue === part_js_1.noChange) {
                        return;
                    }
                    const newListener = this.__pendingValue;
                    const oldListener = this.value;
                    const shouldRemoveListener = newListener == null ||
                        oldListener != null &&
                            (newListener.capture !== oldListener.capture ||
                                newListener.once !== oldListener.once ||
                                newListener.passive !== oldListener.passive);
                    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
                    if (shouldRemoveListener) {
                        this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
                    }
                    if (shouldAddListener) {
                        this.__options = getOptions(newListener);
                        this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
                    }
                    this.value = newListener;
                    this.__pendingValue = part_js_1.noChange;
                }
                handleEvent(event) {
                    if (typeof this.value === 'function') {
                        this.value.call(this.eventContext || this.element, event);
                    }
                    else {
                        this.value.handleEvent(event);
                    }
                }
            };
            exports_7("EventPart", EventPart);
            // We copy options because of the inconsistent behavior of browsers when reading
            // the third argument of add/removeEventListener. IE11 doesn't support options
            // at all. Chrome 41 only reads `capture` if the argument is an object.
            getOptions = (o) => o &&
                (eventOptionsSupported ?
                    { capture: o.capture, passive: o.passive, once: o.once } :
                    o.capture);
        }
    };
});
System.register("lib/default-template-processor", ["lib/parts"], function (exports_8, context_8) {
    "use strict";
    var parts_js_1, DefaultTemplateProcessor, defaultTemplateProcessor;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (parts_js_1_1) {
                parts_js_1 = parts_js_1_1;
            }
        ],
        execute: function () {
            /**
             * Creates Parts when a template is instantiated.
             */
            DefaultTemplateProcessor = class DefaultTemplateProcessor {
                /**
                 * Create parts for an attribute-position binding, given the event, attribute
                 * name, and string literals.
                 *
                 * @param element The element containing the binding
                 * @param name  The attribute name
                 * @param strings The string literals. There are always at least two strings,
                 *   event for fully-controlled bindings with a single expression.
                 */
                handleAttributeExpressions(element, name, strings, options) {
                    const prefix = name[0];
                    if (prefix === '.') {
                        const committer = new parts_js_1.PropertyCommitter(element, name.slice(1), strings);
                        return committer.parts;
                    }
                    if (prefix === '@') {
                        return [new parts_js_1.EventPart(element, name.slice(1), options.eventContext)];
                    }
                    if (prefix === '?') {
                        return [new parts_js_1.BooleanAttributePart(element, name.slice(1), strings)];
                    }
                    const committer = new parts_js_1.AttributeCommitter(element, name, strings);
                    return committer.parts;
                }
                /**
                 * Create parts for a text-position binding.
                 * @param templateFactory
                 */
                handleTextExpression(options) {
                    return new parts_js_1.NodePart(options);
                }
            };
            exports_8("DefaultTemplateProcessor", DefaultTemplateProcessor);
            exports_8("defaultTemplateProcessor", defaultTemplateProcessor = new DefaultTemplateProcessor());
        }
    };
});
System.register("lib/template-factory", ["lib/template"], function (exports_9, context_9) {
    "use strict";
    var template_js_4, templateCaches;
    var __moduleName = context_9 && context_9.id;
    /**
     * The default TemplateFactory which caches Templates keyed on
     * result.type and result.strings.
     */
    function templateFactory(result) {
        let templateCache = templateCaches.get(result.type);
        if (templateCache === undefined) {
            templateCache = {
                stringsArray: new WeakMap(),
                keyString: new Map()
            };
            templateCaches.set(result.type, templateCache);
        }
        let template = templateCache.stringsArray.get(result.strings);
        if (template !== undefined) {
            return template;
        }
        // If the TemplateStringsArray is new, generate a key from the strings
        // This key is shared between all templates with identical content
        const key = result.strings.join(template_js_4.marker);
        // Check if we already have a Template for this key
        template = templateCache.keyString.get(key);
        if (template === undefined) {
            // If we have not seen this key before, create a new Template
            template = new template_js_4.Template(result, result.getTemplateElement());
            // Cache the Template for this key
            templateCache.keyString.set(key, template);
        }
        // Cache all future queries for this TemplateStringsArray
        templateCache.stringsArray.set(result.strings, template);
        return template;
    }
    exports_9("templateFactory", templateFactory);
    return {
        setters: [
            function (template_js_4_1) {
                template_js_4 = template_js_4_1;
            }
        ],
        execute: function () {
            exports_9("templateCaches", templateCaches = new Map());
        }
    };
});
System.register("lib/render", ["lib/dom", "lib/parts", "lib/template-factory"], function (exports_10, context_10) {
    "use strict";
    var dom_js_4, parts_js_2, template_factory_js_1, parts, render;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (dom_js_4_1) {
                dom_js_4 = dom_js_4_1;
            },
            function (parts_js_2_1) {
                parts_js_2 = parts_js_2_1;
            },
            function (template_factory_js_1_1) {
                template_factory_js_1 = template_factory_js_1_1;
            }
        ],
        execute: function () {
            exports_10("parts", parts = new WeakMap());
            /**
             * Renders a template result or other value to a container.
             *
             * To update a container with new values, reevaluate the template literal and
             * call `render` with the new result.
             *
             * @param result Any value renderable by NodePart - typically a TemplateResult
             *     created by evaluating a template tag like `html` or `svg`.
             * @param container A DOM parent to render to. The entire contents are either
             *     replaced, or efficiently updated if the same result type was previous
             *     rendered there.
             * @param options RenderOptions for the entire render tree rendered to this
             *     container. Render options must *not* change between renders to the same
             *     container, as those changes will not effect previously rendered DOM.
             */
            exports_10("render", render = (result, container, options) => {
                let part = parts.get(container);
                if (part === undefined) {
                    dom_js_4.removeNodes(container, container.firstChild);
                    parts.set(container, part = new parts_js_2.NodePart(Object.assign({ templateFactory: template_factory_js_1.templateFactory }, options)));
                    part.appendInto(container);
                }
                part.setValue(result);
                part.commit();
            });
        }
    };
});
System.register("lit-html", ["lib/default-template-processor", "lib/template-result", "lib/directive", "lib/dom", "lib/part", "lib/parts", "lib/render", "lib/template-factory", "lib/template-instance", "lib/template"], function (exports_11, context_11) {
    "use strict";
    var default_template_processor_js_1, template_result_js_2, html, svg;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (default_template_processor_js_1_1) {
                default_template_processor_js_1 = default_template_processor_js_1_1;
                exports_11({
                    "DefaultTemplateProcessor": default_template_processor_js_1_1["DefaultTemplateProcessor"],
                    "defaultTemplateProcessor": default_template_processor_js_1_1["defaultTemplateProcessor"]
                });
            },
            function (template_result_js_2_1) {
                template_result_js_2 = template_result_js_2_1;
                exports_11({
                    "SVGTemplateResult": template_result_js_2_1["SVGTemplateResult"],
                    "TemplateResult": template_result_js_2_1["TemplateResult"]
                });
            },
            function (directive_js_2_1) {
                exports_11({
                    "directive": directive_js_2_1["directive"],
                    "isDirective": directive_js_2_1["isDirective"]
                });
            },
            function (dom_js_5_1) {
                exports_11({
                    "removeNodes": dom_js_5_1["removeNodes"],
                    "reparentNodes": dom_js_5_1["reparentNodes"]
                });
            },
            function (part_js_2_1) {
                exports_11({
                    "noChange": part_js_2_1["noChange"],
                    "nothing": part_js_2_1["nothing"]
                });
            },
            function (parts_js_3_1) {
                exports_11({
                    "AttributeCommitter": parts_js_3_1["AttributeCommitter"],
                    "AttributePart": parts_js_3_1["AttributePart"],
                    "BooleanAttributePart": parts_js_3_1["BooleanAttributePart"],
                    "EventPart": parts_js_3_1["EventPart"],
                    "isIterable": parts_js_3_1["isIterable"],
                    "isPrimitive": parts_js_3_1["isPrimitive"],
                    "NodePart": parts_js_3_1["NodePart"],
                    "PropertyCommitter": parts_js_3_1["PropertyCommitter"],
                    "PropertyPart": parts_js_3_1["PropertyPart"]
                });
            },
            function (render_js_1_1) {
                exports_11({
                    "parts": render_js_1_1["parts"],
                    "render": render_js_1_1["render"]
                });
            },
            function (template_factory_js_2_1) {
                exports_11({
                    "templateCaches": template_factory_js_2_1["templateCaches"],
                    "templateFactory": template_factory_js_2_1["templateFactory"]
                });
            },
            function (template_instance_js_2_1) {
                exports_11({
                    "TemplateInstance": template_instance_js_2_1["TemplateInstance"]
                });
            },
            function (template_js_5_1) {
                exports_11({
                    "createMarker": template_js_5_1["createMarker"],
                    "isTemplatePartActive": template_js_5_1["isTemplatePartActive"],
                    "Template": template_js_5_1["Template"]
                });
            }
        ],
        execute: function () {
            // IMPORTANT: do not change the property name or the assignment expression.
            // This line will be used in regexes to search for lit-html usage.
            // TODO(justinfagnani): inject version number at build time
            if (typeof window !== 'undefined') {
                (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.2.1');
            }
            /**
             * Interprets a template literal as an HTML template that can efficiently
             * render to and update a container.
             */
            exports_11("html", html = (strings, ...values) => new template_result_js_2.TemplateResult(strings, values, 'html', default_template_processor_js_1.defaultTemplateProcessor));
            /**
             * Interprets a template literal as an SVG template that can efficiently
             * render to and update a container.
             */
            exports_11("svg", svg = (strings, ...values) => new template_result_js_2.SVGTemplateResult(strings, values, 'svg', default_template_processor_js_1.defaultTemplateProcessor));
        }
    };
});

const __exp = __instantiate("lit-html");
export const DefaultTemplateProcessor = __exp["DefaultTemplateProcessor"];
export const defaultTemplateProcessor = __exp["defaultTemplateProcessor"];
export const directive = __exp["directive"];
export const isDirective = __exp["isDirective"];
export const removeNodes = __exp["removeNodes"];
export const reparentNodes = __exp["reparentNodes"];
export const noChange = __exp["noChange"];
export const nothing = __exp["nothing"];
export const AttributeCommitter = __exp["AttributeCommitter"];
export const AttributePart = __exp["AttributePart"];
export const BooleanAttributePart = __exp["BooleanAttributePart"];
export const EventPart = __exp["EventPart"];
export const isIterable = __exp["isIterable"];
export const isPrimitive = __exp["isPrimitive"];
export const NodePart = __exp["NodePart"];
export const PropertyCommitter = __exp["PropertyCommitter"];
export const PropertyPart = __exp["PropertyPart"];
export const parts = __exp["parts"];
export const render = __exp["render"];
export const templateCaches = __exp["templateCaches"];
export const templateFactory = __exp["templateFactory"];
export const TemplateInstance = __exp["TemplateInstance"];
export const SVGTemplateResult = __exp["SVGTemplateResult"];
export const TemplateResult = __exp["TemplateResult"];
export const createMarker = __exp["createMarker"];
export const isTemplatePartActive = __exp["isTemplatePartActive"];
export const Template = __exp["Template"];
export const html = __exp["html"];
export const svg = __exp["svg"];
