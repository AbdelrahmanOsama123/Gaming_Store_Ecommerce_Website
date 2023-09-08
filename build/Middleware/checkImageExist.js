'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var fs_1 = __importDefault(require('fs'));
// eslint-disable-next-line @typescript-eslint/ban-types
var checkImageExist = function (req, res, next) {
  var imagePaths = [];
  var fullImagesPath =
    'C:/Users/hp/OneDrive/Desktop/ImageProcessing_API/src/images/fullImages/';
  fs_1.default.readdir(fullImagesPath, function (err, filesNames) {
    if (err) {
      throw new Error('Error =>' + err);
    } else {
      filesNames.forEach(function (fileName) {
        if (fileName.endsWith('.jpg')) {
          imagePaths.push(fileName);
        }
      });
    }
    var myFilename = req.query.filename + '.jpg';
    if (imagePaths.includes(myFilename)) {
      next();
    } else {
      return res
        .status(400)
        .json({
          error:
            'File name you have entered is not exist , please enter available name',
        });
    }
  });
};
exports.default = checkImageExist;
