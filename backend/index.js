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
var surrealdb_js_1 = require("surrealdb.js");
var express = require("express");
var app = express();
var port = 3000;
var db = new surrealdb_js_1.Surreal();
app.use(express.json());
var getUserById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var key, value, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = id.length === 12 ? "id" : "identifier";
                value = key === "id" ? "user:" + id : id;
                return [4 /*yield*/, db.query("select * from user where ".concat(key, " = '").concat(value, "' limit 1"))];
            case 1:
                results = _a.sent();
                if (results.length === 0 || results[0].length === 0) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, results[0][0]];
        }
    });
}); };
app.get('/user/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getUserById(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(404);
                    res.send(JSON.stringify({ error: "User not found" }));
                }
                res.status(200);
                res.send(JSON.stringify(user));
                return [2 /*return*/];
        }
    });
}); });
app.get('/users/:name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.params.name;
                return [4 /*yield*/, db.query("SELECT *, search::score(1) AS score FROM user WHERE name @1@ '".concat(name, "' ORDER BY score DESC LIMIT 50;"))];
            case 1:
                results = _a.sent();
                if (results.length === 0) {
                    res.status(500);
                    res.send(JSON.stringify({ error: "Database is dysfunctional" }));
                }
                res.status(200);
                res.send(JSON.stringify(results[0]));
                return [2 /*return*/];
        }
    });
}); });
// TODO: optimize by just extracting `grade?` field
var AI_SCHOOL_TEMPLATE = "Assistant: {ass}\nUser: {usr}\nAll schools: Keller Elementary, Juanita Elementary, Twain Elementary, Rush Elementary, McAuliffe Elementary, Bell Elementary, Alcott Elementary, Kirk Elementary, Einstein Elementary, Rockwell Elementary, Rose Hill Elementary, Franklin Elementary, Dickinson Elementary, Thoreau Elementary, Summer School, Sandburg Elementary, Redmond Elementary, Baker Elementary, Barton Elementary, Smith Elementary, Muir Elementary, Carson Elementary, Wilder Elementary, Mead Elementary, Special Services, Lakeview Elementary, Rosa Parks Elementary, Audubon Elementary, Mann Elementary, Discovery Elementary, Frost Elementary, Blackwell Elementary, Community School, Explorer Elementary, Emerson K-12, Contractual School, Environmental, Timberline Middle School, Redmond Middle School, Rose Hill Middle School, Finn Hill Middle School, Kamiakin Middle School, Evergreen Middle School, Kirkland Middle School, Inglewood Middle School, International, Stella Schola, Northstar Middle School, Renaissance, Eastlake High School, WaNIC Summer School, Redmond High School, Lake Washington High School, STEM School, Emerson High School, WaNIC Skill Center, WaNIC Skill Center, WaNIC Summer School, Futures School\nPlease classify the user reply into one of these:\n1 - They said they do go to the given school\n2 - They said they do not go to the given school\n3 - They said they do not go to the given school, but stated which one they do go to\n4 - They tried to change the topic\n5 - They said something rude or offensive\nRespond in JSON format. {type: number, school?: string}. For type 3 include the FULL NAME (use the list!) of the school they stated they go to.\n{\n";
app.post('/ai/schools', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, result, r, content;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                console.log(data);
                if (!data.user || !data.assistant) {
                    res.status(404);
                    res.send("Missing mandatory fields in request");
                }
                console.log("Embarking on a great journey...");
                return [4 /*yield*/, fetch("https://api.groq.com/openai/v1/chat/completions", {
                        method: "POST",
                        body: JSON.stringify({
                            "messages": [
                                {
                                    "role": "user",
                                    "content": AI_SCHOOL_TEMPLATE.replace("{ass}", data.assistant).replace("{usr}", data.user),
                                },
                            ],
                            "model": "mixtral-8x7b-32768",
                            "temperature": 0.5,
                            "max_tokens": 75,
                            "top_p": 1,
                            "stream": false,
                            "stop": null,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer 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",
                        },
                    })];
            case 1:
                result = _a.sent();
                return [4 /*yield*/, result.json()];
            case 2:
                r = _a.sent();
                content = r.choices[0].message.content;
                res.status(200);
                res.send((content.startsWith("{") ? "" : "{") + content + (content.endsWith("}") ? "" : "}"));
                return [2 /*return*/];
        }
    });
}); });
var AI_GRADE_TEMPLATE = "Assistant: {ass}\nUser: {usr}\nValid grades: first through twelfth (inclusive)\nPlease classify the user reply into one of these:\n1 - They said they are in the given grade\n2 - They said they are not in the given grade, did not offer an alternative\n3 - They said they are not in the given grade, but stated which one they are in\n4 - They tried to change the topic or provided an invalid value (ex -1, 14)\n5 - They said something rude or offensive\nRespond in JSON format. {type: number, grade?: number}. For type 3 include the stated grade as an integer starting from 1.\n{\n";
app.post('/ai/grades', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, result, r, content;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                console.log(data);
                if (!data.user || !data.assistant) {
                    res.status(404);
                    res.send("Missing mandatory fields in request");
                }
                console.log("Embarking on an excellent journey...");
                return [4 /*yield*/, fetch("https://api.groq.com/openai/v1/chat/completions", {
                        method: "POST",
                        body: JSON.stringify({
                            "messages": [
                                {
                                    "role": "user",
                                    "content": AI_GRADE_TEMPLATE.replace("{ass}", data.assistant).replace("{usr}", data.user),
                                },
                            ],
                            "model": "mixtral-8x7b-32768",
                            "temperature": 0.5,
                            "max_tokens": 75,
                            "top_p": 1,
                            "stream": false,
                            "stop": null,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer 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",
                        },
                    })];
            case 1:
                result = _a.sent();
                return [4 /*yield*/, result.json()];
            case 2:
                r = _a.sent();
                content = r.choices[0].message.content;
                res.status(200);
                res.send((content.startsWith("{") ? "" : "{") + content + (content.endsWith("}") ? "" : "}"));
                return [2 /*return*/];
        }
    });
}); });
app.get("/browsersso", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(200);
        res.setHeader("Content-Type", "text/html");
        res.send(require("fs").readFileSync("./onedrive.html"));
        return [2 /*return*/];
    });
}); });
app.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(200);
        res.setHeader("Content-Type", "text/html");
        res.send(require("fs").readFileSync("./onedrive.html"));
        return [2 /*return*/];
    });
}); });
app.get("/browsersso/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(200);
        res.setHeader("Content-Type", "text/html");
        res.send(require("fs").readFileSync("./onedrive.html"));
        return [2 /*return*/];
    });
}); });
// TODO implement `/user/:id/{login, register, verify}`
// TODO implement `/users/:name?grade=8&school=42`
app.listen(port, '0.0.0.0', function () { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Hannah servers running on ".concat(port, "!"));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 5]);
                return [4 /*yield*/, db.connect('ws://127.0.0.1:5005/rpc', {
                        namespace: 'hannah',
                        database: 'main',
                        auth: {
                            username: 'admin',
                            password: 'jai123',
                        },
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                e_1 = _a.sent();
                console.error(e_1);
                return [4 /*yield*/, db.close()];
            case 4:
                _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
