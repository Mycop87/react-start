"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require('bcrypt');
var DataBaseService = require('./data-base.service');
var Error = require('../utils/error');
var saltRounds = 10;
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.checkToken = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var url, error, user, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = req.originalUrl;
                        if (!(!url.includes('api/auth') && (url.includes('api/users') && req.method.toLowerCase() !== 'post'))) return [3 /*break*/, 2];
                        if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
                            error = Error.getEObject(403, 'invalid Token', 1000);
                            return [2 /*return*/, res.status(error.error.status).json(error)];
                        }
                        return [4 /*yield*/, DataBaseService.getDocument('users', { token: req.headers.authorization.substring(7) })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            error = Error.getEObject(403, 'invalid Token', 1000);
                            return [2 /*return*/, res.status(error.error.status).json(error)];
                        }
                        next();
                        return [2 /*return*/];
                    case 2:
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.getHash = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.hash(password, saltRounds).then(function (hash) {
                            return hash;
                        })];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            return [2 /*return*/];
                        }
                        try {
                            return [2 /*return*/, result];
                        }
                        catch (e) {
                            console.log(e);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.getUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var existUser, isPasswordCorrect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DataBaseService.getDocument('users', { email: data.email })];
                    case 1:
                        existUser = _a.sent();
                        if (!existUser) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, bcrypt.compare(data.password, existUser.password).then(function (res) { return res; })];
                    case 2:
                        isPasswordCorrect = _a.sent();
                        if (!isPasswordCorrect) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, existUser];
                }
            });
        });
    };
    AuthService.prototype.setUserToken = function (email, token) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DataBaseService.updateDocument('users', { email: email }, { token: token })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return AuthService;
}());
module.exports = new AuthService();
