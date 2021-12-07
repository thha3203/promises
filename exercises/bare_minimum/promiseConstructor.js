/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var request = require('needle');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var nodeStyle = require('./callbackReview.js');

// This function should retrieve the first line of the file at `filePath`
// var pluckFirstLineFromFileAsync = function(filePath) {
//   // TODO
//   return new Promise( (resolve, reject) => {
//     fs.readFile(filePath, (error, data) => {
//       if (error) {
//         reject(error);
//       } else {
//         let lineBreak = data.toString().indexOf('\n');
//         let firstLine = data.toString().substring(0, lineBreak);
//         resolve(firstLine);
//       }
//     });
//   });
// };
var pluckFirstLineFromFileAsync = Promise.promisify(nodeStyle.pluckFirstLineFromFile);

// This function should retrieve the status code of a GET request to `url`
// var getStatusCodeAsync = function(url) {
//   // TODO
//   return new Promise( (resolve, reject) => {
//     request.get(url, (error, response) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(response.statusCode);
//       }
//     });
//   });
// };
var getStatusCodeAsync = Promise.promisify(nodeStyle.getStatusCode);

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
