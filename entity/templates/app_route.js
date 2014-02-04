'use strict';

// <%= entityName %> routes use <%= entityName %> controller
var <%= entityName %> = require('../controllers/<%= entityName %>s');
var authorization = require('./middlewares/authorization');

// <%= entityName %> authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.<%= entityName %>.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/<%= entityName %>s', <%= entityName %>.all);
    app.post('/<%= entityName %>s', authorization.requiresLogin, <%= entityName %>.create);
    app.get('/<%= entityName %>s/:<%= entityName %>Id', <%= entityName %>.show);
    app.put('/<%= entityName %>s/:articleId', authorization.requiresLogin, hasAuthorization, <%= entityName %>.update);
    app.del('/<%= entityName %>s/:<%= entityName %>Id', authorization.requiresLogin, hasAuthorization, <%= entityName %>.destroy);

    // Finish with setting up the articleId param
    app.param('<%= entityName %>Id', <%= entityName %>s.<%= entityName %>);

};
