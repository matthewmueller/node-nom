
/*!
 * nom
 * Copyright(c) 2011 Matthew Mueller <mattmuelle@gmail.com>
 * MIT Licensed
 */

/*
  Module Dependencies
*/
var cheerio = require('cheerio'),
    request = require('superagent'),
    utils = require('./utils'),
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
  var args = slice.call(arguments),
      cb = args.pop(),
      finished = after(args.length),
      $s = { length : args.length };

  args.forEach(function(url, i) {
    request(url, function(res) {
      if(!res.ok) return cb(res.text);
      $s[i] = cheerio.load(res.text);
      
      if(finished()) {
        return cb.apply(null, [null].concat(slice.call($s)));
      }
    });
  });

  // Allow currying
  return function() {
    return nom.apply(this, arguments);
  };
};

