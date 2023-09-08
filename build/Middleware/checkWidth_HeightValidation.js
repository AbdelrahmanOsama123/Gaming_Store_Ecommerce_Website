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
var jsdom_1 = require('jsdom');
var lodash_1 = require('lodash');
function getWindowSize() {
  var window = new jsdom_1.JSDOM().window;
  var screenwidth = window.innerWidth;
  var screenheight = window.innerHeight;
  return { screenwidth: screenwidth, screenheight: screenheight };
}
var checkWidth_HeightValidation =
  // eslint-disable-next-line @typescript-eslint/ban-types
  function (req, res, next) {
    return __awaiter(void 0, void 0, void 0, function () {
      var _a, screenwidth, screenheight, _b, filename, width, height;
      return __generator(this, function (_c) {
        (_a = getWindowSize()),
          (screenwidth = _a.screenwidth),
          (screenheight = _a.screenheight);
        (_b = req.query),
          (filename = _b.filename),
          (width = _b.width),
          (height = _b.height);
        if (
          filename == undefined ||
          width == undefined ||
          height == undefined
        ) {
          return [
            2 /*return*/,
            res
              .status(400)
              .json({
                error: "you don't enter file name with width and height",
              }),
          ];
        }
        if (
          !(0, lodash_1.parseInt)(width) ||
          !(0, lodash_1.parseInt)(height) ||
          isNaN((0, lodash_1.parseInt)(width)) ||
          isNaN((0, lodash_1.parseInt)(height))
        ) {
          return [
            2 /*return*/,
            res.status(400).json({ error: 'Invalid width or height' }),
          ];
        }
        if (
          (0, lodash_1.parseInt)(width) > screenwidth ||
          (0, lodash_1.parseInt)(height) > screenheight
        ) {
          return [
            2 /*return*/,
            res
              .status(400)
              .json({ error: 'width or height are higher than screen size' }),
          ];
        } else {
          next();
        }
        return [2 /*return*/];
      });
    });
  };
exports.default = checkWidth_HeightValidation;
