'use strict';

var mongoose = require('mongoose'),
    db        = process.env.DB,
    Schema   = mongoose.Schema;

//mongoose.connect(db);

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