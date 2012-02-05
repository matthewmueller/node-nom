/*
  Counter used for async calls
  
  Example:
    var files = ['a', 'b'];
    finished = after(files.length);
    
    finished() // false
    finished() // true
    
*/
var after = exports.after = function(length) {
  var left = length;
  return function() {
    if(--left <= 0) return true;
    return false;
  };
};

/*
  Simple benchmark timer
*/
timer = exports.timer = function(name) {
  return {
    name : name,
    startTime : 0,
    stopTime : 0,
    
    start : function() {
      this.startTime = Date.now();
    },
    
    stop : function() {
      this.stopTime = Date.now();
    },
    
    results : function() {
      var diff = this.stopTime - this.startTime;
      return "Results " + this.name + " : " + diff + "ms";
    }
  };
};