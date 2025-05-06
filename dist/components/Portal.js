"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portal = Portal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_dom_1 = require("react-dom");
const utils_1 = require("../utils");
function Portal(props) {
    const { children, disabled, transient } = props;
    const defId = react_1.default.useId();
    const id = (0, utils_1.nvl)(props.id, "PORTAL" + defId);
    const open = (0, utils_1.nvl)(props.open, true);
    if (!open)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    if (disabled)
        return children;
    if (transient)
        return (0, react_dom_1.createPortal)(children, document.body, id);
    return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)("div", { style: { position: "fixed" }, id: id, children: children }), document.body, id);
}
