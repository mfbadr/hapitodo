/**
 * Created by mikeybadr on 11/17/14.
 */

var Priority = require('./models/priorities.js')
var Task = require('./models/tasks.js')


//called by a get to /tasks/{id}
exports.showTask = function(){};

//called by a put to /tasks/{id}
exports.updateTask = function(req){

};

// Updates an existing task in the DB.
exports.updateTask = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    Task.findById(req.params.id, function (err, task) {
        if (err) { return handleError(res, err); }
        if(!task) { return res.send(404); }
        var updated = _.merge(task, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, task);
        });
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
exports.deleteTask = function(){};

//called by a get to /priorities
exports.showPriorities = function(){};

//called by a post to /priorities
exports.createPriorities = function(payload){
    var newPriority = new Priority(payload);
    newPriority.save();
};

function handleError(res, err) {
    return res.send(500, err);
}