'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * <%= entityName %> Schema
 */
var <%= entityName %>Schema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
<%= entityName %>Schema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
<%= entityName %>Schema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('<%= entityName %>', <%= entityName %>Schema);
