"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Error = /** @class */ (function () {
    function Error() {
        this.error = {
            status: 400,
            message: 'some Error test',
        };
    }
    Error.prototype.getEObject = function (status, message, code) {
        return {
            error: __assign(__assign({}, this.error), { status: status,
                message: message,
                code: code })
        };
    };
    return Error;
}());
exports.Error = Error;
module.exports = new Error();
