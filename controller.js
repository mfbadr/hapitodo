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
// Updates an existing task in the DB.
exports.updateTask = function(request, reply) {
    Task.findByIdAndUpdate(request.params.id, request.payload, function (err, task) {
        if (err) return handleError(err);
        if (task) {
            reply(task);
        };
    });
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
exports.deleteTask = function(request){
   Task.find({id: request.params.id}).remove(
       reply('Task removed')
   );
};

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
