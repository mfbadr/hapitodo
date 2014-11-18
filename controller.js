/**
 * Created by mikeybadr on 11/17/14.
 */

var Priority = require('./models/priorities.js')
var Task = require('./models/tasks.js')


//called by a get to /tasks/{id}
exports.showTask = function(request, reply){
    Task.find().populate('priority').exec(function(err, tasks){
        reply(tasks);
    });
};

//called by a put to /tasks/{id}
exports.updateTask = function(req){

};

//called by a post to /tasks
exports.createTask = function(payload){

    Priority.findOne({ 'name': payload.priority}, function (err, priority) {
        if (err) return handleError(err);
        console.log('error');
        if (priority) {
            payload.priority = priority._id;
            var newTask = new Task(payload);
            newTask.save();
        }
    })
};

//called by a get to /tasks
exports.allTasks = function(){};

//called by a delete to /tasks/{id}
exports.deleteTask = function(){};

//called by a get to /priorities;
exports.showPriorities = function(request, reply){
    Priority.find(function(err, priorities){
        reply(priorities);
    });
};

//called by a post to /priorities
exports.createPriorities = function(payload){
    var newPriority = new Priority(payload);
    newPriority.save();
};
