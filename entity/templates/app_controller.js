'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    <%= entityName %> = mongoose.model('<%= entityName %>'),
    _ = require('lodash');


/**
 * Find <%= slugName %> by id
 */
exports.<%= slugName %> = function(req, res, next, id) {
    <%= entityName %>.load(id, function(err, <%= slugName %>) {
        if (err) return next(err);
        if (!<%= slugName %>) return next(new Error('Failed to load <%= slugName %> ' + id));
        req.<%= slugName %> = <%= slugName %>;
        next();
    });
};

/**
 * Create a <%= slugName %>
 */
exports.create = function(req, res) {
    var <%= slugName %> = new <%= entityName %>(req.body);
    <%= slugName %>.user = req.user;

    <%= slugName %>.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                <%= slugName %>: <%= slugName %>
            });
        } else {
            res.jsonp(<%= slugName %>);
        }
    });
};

/**
 * Update a <%= slugName %>
 */
exports.update = function(req, res) {
    var <%= slugName %> = req.<%= slugName %>;

    <%= slugName %> = _.extend(<%= slugName %>, req.body);

    <%= slugName %>.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                <%= slugName %>: <%= slugName %>
            });
        } else {
            res.jsonp(<%= slugName %>);
        }
    });
};

/**
 * Delete an <%= slugName %>
 */
exports.destroy = function(req, res) {
    var <%= slugName %> = req.<%= slugName %>;

    <%= slugName %>.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                <%= slugName %>: <%= slugName %>
            });
        } else {
            res.jsonp(<%= slugName %>);
        }
    });
};

/**
 * Show an <%= slugName %>
 */
exports.show = function(req, res) {
    res.jsonp(req.<%= slugName %>);
};

/**
 * List of <%= entityName %>s
 */
exports.all = function(req, res) {
    <%= entityName %>.find().sort('-created').populate('user', 'name username').exec(function(err, <%= slugName %>s) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(<%= slugName %>s);
        }
    });
};