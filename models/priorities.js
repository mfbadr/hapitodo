'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var PrioritySchema = new Schema({
    name: String
});

PrioritySchema
    .virtual('priority')
    .get(function() {
        return {
            'name': this.name
        };
    });

module.exports = mongoose.model('Priority', PrioritySchema);