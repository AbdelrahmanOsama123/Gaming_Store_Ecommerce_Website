'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = __importDefault(require('express'));
var street_1 = __importDefault(require('./api/street'));
var country_1 = __importDefault(require('./api/country'));
var logger_1 = __importDefault(require('./Middleware/logger'));
var routes = express_1.default.Router();
routes.get('/', logger_1.default, function (req, res) {
  res.send('main api route is visited');
});
routes.use('/country', country_1.default);
routes.use('/street', logger_1.default, street_1.default);
exports.default = routes;
