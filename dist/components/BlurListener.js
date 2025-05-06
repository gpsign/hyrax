"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlurListener = BlurListener;
const react_1 = require("react");
const useChildrenRefs_1 = require("../hooks/useChildrenRefs");
const utils_1 = require("../utils");
function BlurListener({ children, ignoreFocusRequirement, onBlur, }) {
    const childRefs = (0, useChildrenRefs_1.useChildrenRefs)(children);
    const active = (0, react_1.useRef)(false);
    const childrenWithRefs = childRefs.getChildrenWithRefs();
    (0, react_1.useEffect)(() => {
        function compare(t) {
            return Array.from(childRefs).some((c) => c.current === t);
        }
        function traceClick(e) {
            const target = e.target;
            if (!(target instanceof HTMLElement) || !onBlur)
                return;
            const tree = (0, utils_1.traceHierarchy)(target, "parentElement");
            const isWithin = tree.some(compare);
            if (ignoreFocusRequirement)
                active.current = true;
            if (!isWithin && active.current) {
                active.current = false;
                onBlur(e);
            }
            else
                active.current = isWithin;
        }
        document.addEventListener("click", traceClick);
        return () => {
            document.removeEventListener("click", traceClick);
        };
    }, [childRefs, onBlur]);
    return childrenWithRefs;
}
