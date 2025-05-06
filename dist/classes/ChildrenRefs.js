"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildrenRefs = void 0;
const react_1 = __importStar(require("react"));
const utils_1 = require("../utils");
class ChildrenRefs {
    constructor(children) {
        this.refs = new Map();
        this.children = children;
        react_1.default.Children.forEach(children, (child) => {
            const ref = (0, utils_1.fabricate)(() => {
                if (!(0, react_1.isValidElement)(child))
                    return (0, react_1.createRef)();
                if ("ref" in child)
                    return child.ref;
                const props = child.props;
                if ("ref" in props)
                    return props.ref;
                return (0, react_1.createRef)();
            });
            this.set(child, ref);
        });
    }
    getKey(child) {
        let index = -1;
        react_1.default.Children.forEach(this.children, (c, i) => {
            if (index != -1)
                return;
            if (c === child)
                index = i;
        });
        if (!react_1.default.isValidElement(child))
            return String(index);
        return (child.key ?? String(index));
    }
    get(child) {
        const key = this.getKey(child);
        return this.refs.get(key);
    }
    set(child, ref) {
        const key = this.getKey(child);
        return this.refs.set(key, ref);
    }
    getChildrenWithRefs() {
        return react_1.default.Children.map(this.children, (child) => {
            if (!react_1.default.isValidElement(child))
                return child;
            const ref = this.get(child);
            return react_1.default.cloneElement(child, {
                ...(child.props ?? {}),
                ref,
            });
        });
    }
    *[Symbol.iterator]() {
        for (const ref of this.refs.values()) {
            yield ref;
        }
    }
    values() {
        return this.refs.values();
    }
    entries() {
        return this.refs.entries();
    }
    keys() {
        return this.refs.keys();
    }
}
exports.ChildrenRefs = ChildrenRefs;
