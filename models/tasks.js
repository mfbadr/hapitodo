
'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    Priority = require('./priorities.js');

var TaskSchema = new Schema({
    name: String,
    //createdOn: { type: Date, default: Date.now },
    dueOn: { type: Date },
    priority: {type: mongoose.Schema.Types.ObjectId, ref: 'Priority'}
});

TaskSchema
    .virtual('tasks')
    .get(function() {
        return {
            'name': this.name,
            'createdOn': this.createdOn,
            'dueOn': this.dueOn,
            'priority': this.priority
        };
    });

module.exports = mongoose.model('Task', TaskSchema);