'use strict';

// <%= entityName %>s routes use <%= slugName %>s controller
var <%= slugName %>s = require('../controllers/<%= slugName %>s');
var authorization = require('./middlewares/authorization');

// <%= entityName %> authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.<%= slugName %>.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/<%= slugName %>s', <%= slugName %>s.all);
    app.post('/<%= slugName %>s', authorization.requiresLogin, <%= slugName %>s.create);
    app.get('/<%= slugName %>s/:<%= slugName %>Id', <%= slugName %>s.show);
    app.put('/<%= slugName %>s/:<%= slugName %>Id', authorization.requiresLogin, hasAuthorization, <%= slugName %>s.update);
    app.del('/<%= slugName %>s/:<%= slugName %>Id', authorization.requiresLogin, hasAuthorization, <%= slugName %>s.destroy);

    // Finish with setting up the <%= slugName %>Id param
    app.param('<%= slugName %>Id', <%= slugName %>s.<%= slugName %>);

};