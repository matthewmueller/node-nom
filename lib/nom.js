
/*!
 * nom
 * Copyright(c) 2011 Matthew Mueller <mattmuelle@gmail.com>
 * MIT Licensed
 */

/*
  Module Dependencies
*/
var cheerio = require('cheerio'),
    request = require('request'),
    utils = require('./utils'),
    isArray = Array.isArray,
    after = utils.after;

var slice = Array.prototype.slice;

/*
  Public: The `nom` function takes in URLs and returns a
  cheerio object
  
  This function can take in a variable number of urls,
  returning the same number of cheerio objects in the
  callback function.
  
  Examples -
    
    nom('http://google.com', function(err, $) {
      $('title').text(); // => Google
    })
    
    nom('http://google.com', 'http://apple.com', function(err, $g, $a) {
      $g('title').text(); // => Google
      $a('title').text(); // => Apple
    });
    
  Returns : wrapped self, so you can run the same command again
    ex. nom('http://google.com', google)
           ('http://apple.com', apple);
*/
var nom = module.exports = function() {
  var args = normalize(arguments),
      cb = args.pop(),
      finished = after(args.length),
      out = {};

  args.forEach(function(url, i) {
    request(url, function(err, res, body) {
      if(err) return cb(err);
      out[url] = cheerio.load(body);
      
      if(finished()) {
        return cb(null, out);
      }
    });
  });

  // Allow currying
  return function() {
    return nom.apply(this, arguments);
  };
};

// Normalize the inputs
// Returns a normalized array of arguments
function normalize(urls, fn) {
  var isArr = isArray(arguments),
      args, cb;

  if(isArr) {
    args = urls;
    cb = fn;
  } else {
    args = slice.call(arguments);
    cb = args.pop();
    cb = function(err, obj) {
      console.log('lol');
      return cb.apply(this, arguments);
    };
  }

  return args.concat([cb]);
}
