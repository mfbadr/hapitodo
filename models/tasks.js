
'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    Priority = require('./priorities.js');

var TaskSchema = new Schema({
    name: String,
    //createdOn: { type: Date, default: Date.now },
    //isComplete: {type: Boolean, default: false},
    dueOn: Date,
    priority: {type: Schema.Types.ObjectId, ref: 'Priority'}
});

TaskSchema
    .virtual('tasks')
    .get(function() {
        return {
            'name': this.name,
            //'createdOn': this.createdOn,
            //'isComplete': this.isComplete,
            'dueOn': this.dueOn,
            'priority': this.priority
        };
    });

module.exports = mongoose.model('Task', TaskSchema);