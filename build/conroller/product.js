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
Object.defineProperty(exports, '__esModule', { value: true });
exports.getProductsByCatagory =
  exports.Delete =
  exports.update =
  exports.create =
  exports.show =
  exports.index =
    void 0;
var Product_1 = require('../models/Product');
var store = new Product_1.productStore();
var index = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var products, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [4 /*yield*/, store.index()];
        case 1:
          products = _a.sent();
          return [2 /*return*/, products];
        case 2:
          error_1 = _a.sent();
          console.log('cannot get products '.concat(error_1));
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.index = index;
var show = function (id) {
  return __awaiter(void 0, void 0, void 0, function () {
    var product, error_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [4 /*yield*/, store.show(id)];
        case 1:
          product = _a.sent();
          return [2 /*return*/, product];
        case 2:
          error_2 = _a.sent();
          console.log('cannot get product '.concat(id, ' ').concat(error_2));
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.show = show;
var create = function (product) {
  return __awaiter(void 0, void 0, void 0, function () {
    var result, error_3;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [4 /*yield*/, store.create(product)];
        case 1:
          result = _a.sent();
          return [2 /*return*/, result];
        case 2:
          error_3 = _a.sent();
          console.log('cannot insert this product '.concat(error_3));
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.create = create;
var update = function (id, product) {
  return __awaiter(void 0, void 0, void 0, function () {
    var result, error_4;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [4 /*yield*/, store.update(id, product)];
        case 1:
          result = _a.sent();
          return [2 /*return*/, result];
        case 2:
          error_4 = _a.sent();
          console.log('cannot update product '.concat(id, ' ').concat(error_4));
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.update = update;
var Delete = function (id) {
  return __awaiter(void 0, void 0, void 0, function () {
    var result, error_5;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [4 /*yield*/, store.delete(id)];
        case 1:
          result = _a.sent();
          return [2 /*return*/, result];
        case 2:
          error_5 = _a.sent();
          console.log('cannot delete product '.concat(id, ' ').concat(error_5));
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.Delete = Delete;
var getProductsByCatagory = function (catagory) {
  return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
      try {
        result = store.getProductsByCatagory(catagory);
        return [2 /*return*/, result];
      } catch (error) {
        console.log('cannot get '.concat(catagory, ' ').concat(error));
        return [2 /*return*/, null];
      }
      return [2 /*return*/];
    });
  });
};
exports.getProductsByCatagory = getProductsByCatagory;
