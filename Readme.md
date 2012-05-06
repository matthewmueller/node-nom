# nom #

Om nom nom. Super simple screen scrapper for Node.js. Nom uses [cheerio](http://github.com/MatthewMueller/cheerio) to provide the core jQuery API for grabbing and manipulating the response.
  
## Installation ##

`npm install nom`

## Usage ##

### Basic ###
    nom('http://google.com', function(err, $) {
      $('title').text() // => "Google"
    });

### Multiple Requests ###
    nom('http://google.com', 'http://apple.com', function(err, $g, $a) {
      $g('title').text(); // => Google
      $a('title').text(); // => Apple
    });


### Another way... ###
    function apple(err, $) {
      $('title').text(); // => Google
    }

    function google(err, $) {
      $('title').text(); // => Apple
    }

    // Request currying
    nom('http://google.com', google)
       ('http://apple.com', apple);

## Command Line Usage ##

    $ nom <url> [selector] 

Arguments: 
* url: website you'd like to request
* selector: id, class, attribute or any other soupselect compatible selector

### Example ###

    $ nom http://google.com '#hplogo'

## License 

(The MIT License)

Copyright (c) 2012 Matthew Mueller &lt;mattmuelle@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.