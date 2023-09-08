'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var fs_1 = __importDefault(require('fs'));
// eslint-disable-next-line @typescript-eslint/ban-types
var checkResizedImage = function (req, res, next) {
  var resizedImages = [];
  var resizedImagesPath =
    'C:/Users/hp/OneDrive/Desktop/ImageProcessing_API/src/images/resizedImages/';
  fs_1.default.readdir(resizedImagesPath, function (err, filesNames) {
    if (err) {
      throw new Error('Error =>' + err);
    } else {
      filesNames.forEach(function (fileName) {
        if (fileName.endsWith('.jpg')) {
          resizedImages.push(fileName);
        }
      });
    }
  });
  var currFileName = req.query.filename;
  var currWidth = parseInt(req.query.width);
  var currHeight = parseInt(req.query.height);
  var currResizedImage = ''
    .concat(currFileName, '_')
    .concat(currWidth, '_')
    .concat(currHeight, '.jpg');
  console.log(currResizedImage);
  console.log(resizedImages);
  if (resizedImages.includes(currResizedImage)) {
    return res.sendFile(
      ''.concat(resizedImagesPath, '/').concat(currResizedImage)
    );
  } else {
    next();
  }
};
exports.default = checkResizedImage;
