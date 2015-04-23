/* jshint node: true */
'use strict';
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors')

module.exports = {
  name: 'ember-cli-elemental',
  serverMiddleware: function(config) {
    var app = config.app;
    var options = config.options;
    var project = options.project;
    var themeFile = path.resolve(__dirname, '../..', 'theme.json');

    app.use(bodyParser.json());
    app.use(cors());

    app.get('/theme', function(req, res, next) {
      // TODO: read node_modules/*/package.json and extract the metadata for elemental packages
      // send down something like:
      /*
        {
          components: [
            {name: 'ele-calendar', themes: [{backgroundColor: 'units'}]}
          ],
          theme: {
            // contents of theme.json
          }
        }
      */
      if (fs.existsSync(themeFile)) {
        var data = fs.readFileSync(themeFile);
        res.end(data);
      } else {
        res.json({});
      }
      next();
    });

    app.post('/theme', function(req, res, next) {
      console.log('posted ' + Object.keys(req.body));
      var themeJson = req.body;

      fs.writeFileSync(themeFile, JSON.stringify(themeJson, null, '  '));
      res.json({theme: req.body});
      next();
    });
  }
};
