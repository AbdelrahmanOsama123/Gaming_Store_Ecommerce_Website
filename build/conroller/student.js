'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var student_1 = require('../models/student');
var jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
var dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config();
var store = new student_1.studentStore();
///index function to make index Route
var index = function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    var students, err_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [4 /*yield*/, store.index()];
        case 1:
          students = _a.sent();
          res.json(students);
          return [3 /*break*/, 3];
        case 2:
          err_1 = _a.sent();
          res.status(400);
          res.json('Invalid get data from db ' + err_1);
          return [3 /*break*/, 3];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
var show = function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    var id, student;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          id = parseInt(req.params.id);
          return [4 /*yield*/, store.show(id)];
        case 1:
          student = _a.sent();
          res.json(student);
          return [2 /*return*/];
      }
    });
  });
};
var create = function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    var student, result, err_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          student = {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            weight: req.body.weight,
          };
          return [4 /*yield*/, store.create(student)];
        case 1:
          result = _a.sent();
          res.send(result);
          return [3 /*break*/, 3];
        case 2:
          err_2 = _a.sent();
          res.status(400);
          res.json('Invalid insert ' + err_2);
          return [3 /*break*/, 3];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
var update = function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    var student, id, result;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          student = {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            weight: req.body.weight,
          };
          id = parseInt(req.params.id);
          return [4 /*yield*/, store.update(id, student)];
        case 1:
          result = _a.sent();
          res.send(result);
          return [2 /*return*/];
      }
    });
  });
};
var Delete = function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    var authorizationHeader, token, id, result;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          try {
            authorizationHeader = req.headers.authorization;
            token =
              authorizationHeader === null || authorizationHeader === void 0
                ? void 0
                : authorizationHeader.split(' ')[1];
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
          } catch (error) {
            res.status(401);
            res.json('Invalid Token ' + error);
            return [2 /*return*/];
          }
          id = parseInt(req.params.id);
          return [4 /*yield*/, store.delete(id)];
        case 1:
          result = _a.sent();
          res.send(result);
          return [2 /*return*/];
      }
    });
  });
};
var students_routes = function (app) {
  app.get('/students', index);
  app.get('/students/:id', show);
  app.post('/students', create);
  app.put('/students/:id', update);
  app.delete('/students/:id', Delete);
};
exports.default = students_routes;
