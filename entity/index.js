'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _ = require('yeoman-generator/node_modules/lodash')



var EntityGenerator = module.exports = function EntityGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the entity subgenerator with the argument ' + this.name + '.');
  this.entityName = this.name;
  this.slugName = _.slugify(this.name);
};

util.inherits(EntityGenerator, yeoman.generators.NamedBase);


EntityGenerator.prototype.files = function files() {

	var sluggy = _.slugify(this.name);

  this.template('app_controller.js', 'app/controllers/' + sluggy + 's.js');
  this.template('app_model.js', 'app/models/' + sluggy + 's.js');
  this.template('app_route.js', 'app/routes/' + sluggy + 's.js');
  this.template('public_js_controllers.js', 'public/js/controllers/' + sluggy + 's.js');
  this.template('public_js_services.js', 'public/js/services/' + sluggy + 's.js');
  this.template('public_views_create.html', 'public/views/' + sluggy + 's/create.html');
  this.template('public_views_edit.html', 'public/views/' + sluggy + 's/edit.html');
  this.template('public_views_list.html', 'public/views/' + sluggy + 's/list.html');
  this.template('public_views_view.html', 'public/views/' + sluggy + 's/view.html');

String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

  // inject config
  var configPath = "public/js/config.js",
  configFile = this.readFileAsString(configPath);
  if(configFile.indexOf('/' + sluggy + '/') === -1)
  {
		var index = configFile.indexOf("otherwise({");
		var newConfig = 'when(\'/' + sluggy + 's\', {\n' +
	        '            templateUrl: \'views/' + sluggy + 's/list.html\'\n' +
	        '        }).\n' +
	        '        when(\'/' + sluggy + 's/create\', {\n' +
	        '            templateUrl: \'views/' + sluggy + 's/create.html\'\n' +
	        '        }).\n' +
	        '        when(\'/' + sluggy + 's/:' + sluggy + 'Id/edit\', {\n' +
	        '            templateUrl: \'views/' + sluggy + 's/edit.html\'\n' +
	        '        }).\n' +
	        '        when(\'/' + sluggy + 's/:' + sluggy + 'Id\', {\n' +
	        '            templateUrl: \'views/' + sluggy + 's/view.html\'\n' +
	        '        }).\n        '

		configFile = configFile.splice(index, 0, newConfig)
		this.write(configPath, configFile);
  }

  // inject app
  var appPath = "public/js/app.js",
	appFile = this.readFileAsString(appPath);
	if(appFile.indexOf('.' + sluggy + 's') === -1)
  {
  	appFile = appFile + 'angular.module(\'mean.' + sluggy + 's\', []);\n';
  	var topBracketIndex = appFile.indexOf('\']);');
  	appFile = appFile.splice(topBracketIndex, 0, '\', \'mean.' + sluggy + 's');
		this.write(appPath, appFile);
  }

	// inject foot.jade
  var footJadePath = "app/views/includes/foot.jade",
	footJadeFile = this.readFileAsString(footJadePath);
	if(footJadeFile.indexOf('/' + sluggy + 's.js\'') === -1)
  {
  	var injectIndex = footJadeFile.indexOf('//Application Services') + '//Application Services'.length;
  	footJadeFile = footJadeFile.splice(injectIndex, 0, '\nscript(type=\'text/javascript\', src=\'/js/services/' + sluggy + 's.js\')');

  	injectIndex = footJadeFile.indexOf('//Application Controllers') + '//Application Controllers'.length;
  	footJadeFile = footJadeFile.splice(injectIndex, 0, '\nscript(type=\'text/javascript\', src=\'/js/controllers/' + sluggy + 's.js\')');

		this.write(footJadePath, footJadeFile);
  }

  // inject headerJs
  var headerPath = "public/js/controllers/header.js",
  headerFile = this.readFileAsString(headerPath);
  if(headerFile.indexOf(': "' + this.name + 's",') === -1)
  {
    var injectIndex = headerFile.indexOf('];');
    headerFile = headerFile.splice(injectIndex, 0, ', {\n      \'title\': \'' + this.name + 's\',\n      \'link\': \'' + sluggy + 's\'\n    }\n');

    this.write(headerPath, headerFile);
  }

};
