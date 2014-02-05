'use strict';

// <%= entityName %>s routes use <%= _.slugify(entityName) %>s controller
var <%= _.slugify(entityName) %>s = require('../controllers/<%= _.slugify(entityName) %>s');
var authorization = require('./middlewares/authorization');

// <%= entityName %> authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.<%= _.slugify(entityName) %>.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/<%= _.slugify(entityName) %>s', <%= _.slugify(entityName) %>s.all);
    app.post('/<%= _.slugify(entityName) %>s', authorization.requiresLogin, <%= _.slugify(entityName) %>s.create);
    app.get('/<%= _.slugify(entityName) %>s/:<%= _.slugify(entityName) %>Id', <%= _.slugify(entityName) %>s.show);
    app.put('/<%= _.slugify(entityName) %>s/:<%= _.slugify(entityName) %>Id', authorization.requiresLogin, hasAuthorization, <%= _.slugify(entityName) %>s.update);
    app.del('/<%= _.slugify(entityName) %>s/:<%= _.slugify(entityName) %>Id', authorization.requiresLogin, hasAuthorization, <%= _.slugify(entityName) %>s.destroy);

    // Finish with setting up the <%= _.slugify(entityName) %>Id param
    app.param('<%= _.slugify(entityName) %>Id', <%= _.slugify(entityName) %>s.<%= _.slugify(entityName) %>);

};