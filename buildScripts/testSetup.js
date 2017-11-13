require('babel-register')();

//Disable the webpack features that Mocha doesn't understand
require.extensions['.css'] = function() {};
