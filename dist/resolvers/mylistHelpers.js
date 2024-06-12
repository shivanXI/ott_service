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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.removeFavorite = exports.getUserFavorites = exports.checkFavourite = exports.addToFavorites = exports.getUserById = void 0;
var pg_1 = require("pg");
var myListQueries_1 = require("../queries/myListQueries");
var uuid_1 = require("uuid");
var pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
});
// Helper functions to interact with the database
//Get user by ID
function getUserById(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var client, result, user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, 5, 6]);
                    return [4 /*yield*/, client.query(myListQueries_1.GET_USER_BY_ID, [userId])];
                case 3:
                    result = _a.sent();
                    user = result.rows[0];
                    if (!user) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, user]; // Cast to User type
                case 4:
                    error_1 = _a.sent();
                    console.error("Error fetching user:", error_1);
                    throw error_1; // Re-throw for handling at the handler level
                case 5:
                    if (client) {
                        client.release();
                    }
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getUserById = getUserById;
// Add to favorites list
function addToFavorites(userId, contentId, contentType) {
    return __awaiter(this, void 0, void 0, function () {
        var client, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, 6, 7]);
                    return [4 /*yield*/, checkFavourite(userId, contentId, contentType)];
                case 3:
                    if (_a.sent()) {
                        console.log("Already added to favorites");
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, client.query(myListQueries_1.ADD_TO_MY_LIST, [(0, uuid_1.v4)(), userId, contentId, contentType, false])];
                case 4:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 5:
                    error_2 = _a.sent();
                    console.error("Error adding to favorites:", error_2);
                    throw error_2; // Re-throw for handling at the handler level
                case 6:
                    client.release();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.addToFavorites = addToFavorites;
// Check if content is already in favorites list 
function checkFavourite(userId, contentId, contentType) {
    return __awaiter(this, void 0, void 0, function () {
        var client, result, present, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 7, 8, 9]);
                    return [4 /*yield*/, client.query(myListQueries_1.CHECK_FAVORITE, [contentId, contentType, userId])];
                case 3:
                    result = _a.sent();
                    present = result.rows[0];
                    console.log("Present:", present);
                    if (!present) return [3 /*break*/, 6];
                    if (!present.is_removed) return [3 /*break*/, 5];
                    return [4 /*yield*/, client.query(myListQueries_1.UPDATE_MY_LIST, [present.id, false])];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/, true];
                case 6: return [2 /*return*/, false];
                case 7:
                    error_3 = _a.sent();
                    console.error("Error fetching user:", error_3);
                    throw error_3; // Re-throw for handling at the handler level
                case 8:
                    if (client) {
                        client.release();
                    }
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.checkFavourite = checkFavourite;
// Get user's favorites with pagination from the list
function getUserFavorites(userId, limit, offset) {
    return __awaiter(this, void 0, void 0, function () {
        var client, result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, 5, 6]);
                    return [4 /*yield*/, client.query(myListQueries_1.GET_MY_LIST, [userId, limit, offset])];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, result.rows];
                case 4:
                    error_4 = _a.sent();
                    console.error("Error fetching user favorites:", error_4);
                    throw error_4; // Re-throw for handling at the handler level
                case 5:
                    client.release();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getUserFavorites = getUserFavorites;
// Remove favorite from the list
function removeFavorite(id) {
    return __awaiter(this, void 0, void 0, function () {
        var client, result, removed, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, 5, 6]);
                    return [4 /*yield*/, client.query(myListQueries_1.UPDATE_MY_LIST, [id, true])];
                case 3:
                    result = _a.sent();
                    removed = (result === null || result === void 0 ? void 0 : result.rowCount) ? (result.rowCount > 0) : false;
                    return [2 /*return*/, removed];
                case 4:
                    error_5 = _a.sent();
                    console.error("Error removing favorite:", error_5);
                    throw error_5; // Re-throw for handling at the handler level
                case 5:
                    client.release();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.removeFavorite = removeFavorite;
//# sourceMappingURL=mylistHelpers.js.map