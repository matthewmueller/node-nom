
/**
 * Module dependencies.
 */

var nom = require('../'),
    should = require('should'),
    utils = nom.utils,
    after = utils.after;

describe('nom', function() {
  
  function google(http, done) {
    nom(http, function(err, $) {
      if(err) return done(err);
      $('title').text().should.equal('Google');
      done();
    });
  }
  
  it('should have a version number', function() {
    nom.version.should.match(/^\d+\.\d+\.\d+$/);
  });
  
  it('should open up a single website', function(done) {
    nom('http://google.com', function(err, $) {
      if(err) return done(err);
      $('title').text().should.equal('Google');
      done();
    });
  });
  
  it('should allow multiple websites to be requested', function(done) {
    
    nom('http://google.com', 'http://apple.com', function(err, $google, $apple) {
      if(err) return done(err);
      $google('title').text().should.equal('Google');
      $apple('title').text().should.equal('Apple');
      done();
    });
  });

  it('should allow multiple websites to be requested using an array', function(done) {
    
    nom(['http://google.com', 'http://apple.com'], function(err, out) {
      if(err) return done(err);
      done();
    });
  });
  
  it('kinda hilarious chaining', function(done) {
    var finished = after(2);
    
    function apple(err, $) {
      $('title').text().should.equal('Apple');
      if(finished()) return done();
    }
    
    function google(err, $) {
      $('title').text().should.equal('Google');
      if(finished()) return done();
    }
    
    nom('http://google.com', google)
       ('http://apple.com', apple);
  });
});
