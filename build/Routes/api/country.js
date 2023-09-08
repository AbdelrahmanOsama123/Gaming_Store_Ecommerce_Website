'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = __importDefault(require('express'));
var countres = express_1.default.Router();
countres.get('/', function (req, res) {
  res.send('countries api route is visited');
});
exports.default = countres;
