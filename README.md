ES6 Marionette Mobile Application
======================
ES6 Marionette Mobile Application Base Code

What's inside
----------------
Batteries included:
 - Cordova
 - Gulp
 - Browserify
 - Babelify
 - Bootstrap
 - jQuery
 - Underscore
 - Backbone
 - Marionette
 - Handlebars
 - BrowserSync
 - Karma
 - Mocha, Chai, Sinon
 - Framework7
 - Backbone Validation
 - Locally JS
 - FastClick
 - moment
 - Swiper
 - Transition

Setup
-----
Clone the repository and install the dependencies.

    $ git clone https://github.com/emrullah3737/Marionette.Js-Mobile-App.git my-project
    $ cd my-project
    $ npm install
    $ bower install
    $ gulp serve

Do not forget to install globally gulp if not installed yet.

Build
------
If you want to build the project run.

    $ gulp build

It will compile the project and put the result under `dist` directory. You can run the compiled project also.

    $ gulp serve:dist

Testing
---------
Two options exists to run tests, the first one is for development process and aims to practice Test Driven Development.

    $ gulp tdd

It will open a Google Chrome instance and run all tests on it, when a file is updated tests will be run again. You can see the rests as a notification or in the console.
The other option to run tests is for Continuous Integration purposes, it will run all the tests against PanthomJS and output a jUnit format file for analysis.
    
    $ gulp test