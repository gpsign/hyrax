"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChildrenRefs = useChildrenRefs;
const react_1 = require("react");
const classes_1 = require("../classes");
function useChildrenRefs(children) {
    const childrenRefs = (0, react_1.useMemo)(() => new classes_1.ChildrenRefs(children), [children]);
    return childrenRefs;
}
