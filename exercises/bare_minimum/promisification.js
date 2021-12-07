/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */

var fs = require('fs');
var request = require('needle');
var crypto = require('crypto');
var Promise = require('bluebird');

// (1) Asyncronous HTTP request
var getGitHubProfile = function (user, callback) {
  var url = 'https://api.github.com/users/' + user;
  var options = {
    headers: { 'User-Agent': 'request' },
  };

  request.get(url, options, function (err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(
        new Error('Failed to get GitHub profile: ' + body.message),
        null
      );
    } else {
      callback(null, body);
    }
  });
};

// var getGitHubProfileAsync = Promise.promisify(getGitHubProfile); // TODO
var getGitHubProfileAsync = function (user) {
  var url = 'https://api.github.com/users/' + user;
  var options = {
    headers: { 'User-Agent': 'request' },
  };
  return new Promise( (resolve, reject) => {
    request.get(url, options, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (body.message) {
        reject(new Error('Failed to get GitHub profile: ' + body.message));
      } else {
        resolve(body);
      }
    });
  });
};


// (2) Asyncronous token generation
var generateRandomToken = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

// var generateRandomTokenAsync = Promise.promisify(generateRandomToken); // TODO
var generateRandomTokenAsync = () => {
  return new Promise ( (resolve, reject) => {
    crypto.randomBytes(20, (error, buffer) => {
      if (error) {
        reject(error);
      } else {
        resolve(buffer.toString('hex'));
      }
    });
  });
};


// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) { return callback(err); }

    var funnyFile = file.split('\n')
      .map(function(line) {
        return line + ' lol';
      })
      .join('\n');

    callback(funnyFile);
  });
};

// var readFileAndMakeItFunnyAsync = Promise.promisify(readFileAndMakeItFunny); // TODO
var readFileAndMakeItFunnyAsync = (filePath) => {
  return new Promise ( (resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, file) => {
      if (error) {
        reject(error);
      } else {
        var funnyFile = file.split('\n');
        funnyFile.forEach( (line, index) => {
          funnyFile[index] = line + ' lol';
        });
        resolve(funnyFile.join('\n'));
      }
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};
