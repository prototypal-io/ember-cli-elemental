/* jshint node: true */
'use strict';
var fs = require('fs');
var path = require('path');

module.exports = {
  name: 'ember-cli-theme-editor',
  serverMiddleware: function(config) {
    var app = config.app;
    var options = config.options;
    var project = options.project;
    var themeFile = path.join(__dirname, 'theme.json');

    app.get('theme', function(req, res, next) {
      fs.exists(themeFile, function(exists) {
        var output;
        if (exists) {
          fs.readFile(themeFile, function(err, data) {
            res.json(data);
          });
        } else {
          res.json({});
        }
      });

      next();
    });

    app.post('theme', function(req, res, next) {
      var requestData = '{ "some": "json" }';
      fs.writeFile(themeFile, requestData, function(err) {
        if (err) {
          res.json({ error: err });
        } else {
          res.status(200);
        }
      });
      
      next();
    });
  }
};
