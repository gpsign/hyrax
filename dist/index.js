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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hx = void 0;
const hooks = __importStar(require("./hooks"));
const utils = __importStar(require("./utils"));
const components = __importStar(require("./components"));
const classes = __importStar(require("./classes"));
const dom_1 = require("./dom");
const string_1 = require("./string");
const number_1 = require("./number");
__exportStar(require("./hooks"), exports);
__exportStar(require("./types"), exports);
__exportStar(require("./utils"), exports);
__exportStar(require("./components"), exports);
__exportStar(require("./dom"), exports);
__exportStar(require("./string"), exports);
__exportStar(require("./number"), exports);
__exportStar(require("./classes"), exports);
var components_1 = require("./components");
Object.defineProperty(exports, "hx", { enumerable: true, get: function () { return components_1.hx; } });
const Hyrax = {
    health() {
        console.info("Hyrax is ready!");
        return 0;
    },
    ...utils,
    ...hooks,
    ...components,
    ...classes,
    ...dom_1.HyraxDOM,
    ...string_1.HyraxString,
    ...number_1.HyraxNumber,
};
exports.default = Hyrax;
