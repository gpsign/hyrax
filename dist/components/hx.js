"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hx = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable react/display-name */
const react_1 = __importDefault(require("react"));
const styleShortcuts = [
    "backgroundColor",
    "width",
    "height",
    "margin",
    "padding",
    "color",
    "textAlign",
    "border",
    "borderRadius",
    "display",
    "position",
    "top",
    "left",
    "right",
    "bottom",
    "opacity",
];
function removeStyleShortcuts(props) {
    const result = { ...props };
    for (const key of styleShortcuts) {
        if (key in result) {
            delete result[key];
        }
    }
    return result;
}
function mergeStyles(baseStyle, props) {
    const mergedStyle = { ...baseStyle };
    const propRecord = props;
    for (const key of styleShortcuts) {
        const value = propRecord[key];
        if (value !== undefined) {
            mergedStyle[key] = value;
        }
    }
    const restProps = removeStyleShortcuts(props);
    return { mergedStyle, restProps };
}
function createHxComponent(render) {
    return react_1.default.memo((props) => {
        // eslint-disable-next-line react/prop-types
        const { rendered, transient, children, style, ...rest } = props;
        if (rendered === false)
            return null;
        if (transient)
            return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
        const { mergedStyle, restProps } = mergeStyles(style, rest);
        return render({
            ...restProps,
            style: mergedStyle,
            children,
        });
    });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const intrinsicCache = new Map();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customCache = new WeakMap();
function createIntrinsic(tag) {
    if (intrinsicCache.has(tag)) {
        return intrinsicCache.get(tag);
    }
    const component = createHxComponent((props) => react_1.default.createElement(tag, props, props.children));
    intrinsicCache.set(tag, component);
    return component;
}
function wrapCustomComponent(Component) {
    if (customCache.has(Component)) {
        return customCache.get(Component);
    }
    const component = createHxComponent((props) => (0, jsx_runtime_1.jsx)(Component, { ...props }));
    customCache.set(Component, component);
    return component;
}
exports.hx = new Proxy(function () { }, {
    apply(_target, _thisArg, args) {
        return wrapCustomComponent(args[0]);
    },
    get(_target, prop) {
        return createIntrinsic(prop);
    },
});
