/**
 * Created by mikeybadr on 11/17/14.
 */

var Priority = require('./models/priorities.js')
var Task = require('./models/tasks.js')


//called by a get to /tasks/{id}
exports.showTask = function(){};

//called by a put to /tasks/{id}
exports.updateTask = function(){};

//called by a post to /tasks
exports.createTask = function(){};

//called by a get to /tasks
exports.allTasks = function(){};

//called by a delete to /tasks/{id}
exports.deleteTask = function(){};

//called by a get to /priorities
exports.showPriorities = function(){};

//called by a post to /priorities
exports.createPriorities = function(){};
