/**
 * Created by mikeybadr on 11/17/14.
 */

var Hapi       = require('hapi'),
    Joi        = require('joi'),
    port       = process.env.PORT,
    db         = process.env.DB,
    mongoose   = require('mongoose'),
    controller = require('./controller.js'),
    server     = new Hapi.Server(port);

mongoose.connect(db);

/*
Routes to make:
 get /home --> home
 get /about --> about

 get /tasks         --> all tasks
 post /tasks        --> make task
 put /tasks/{id}    --> update task
 delete /tasks/{id} --> delete task
 get /tasks/{id}    --> show task

 get /priorities    --> show all priorities
 post /priorities    --> create priority
 */

server.route({
    config: {
        description: 'post here to make a task',
        notes: 'tasks have a name that is a string',
        tags: ['tasks', 'a', 'b']
    },
    method: 'POST',
    path: '/tasks',
    handler: function (request, reply) {
        controller.createTask(request.payload);
        reply('Task successfully created!')
    }
});

server.route({
    config: {
        description: 'post here to make a priority',
        notes: 'priorities have a name that is a string',
        tags: ['priorities', 'a', 'b']
    },
    method: 'POST',
    path: '/priorities',
    handler: function (request, reply) {
        controller.createPriorities(request.payload);
        reply('Priority successfully created!')
    }
});

server.route({
    config: {
        description: 'this is the home page route',
        notes: 'here are some notes about the home page',
        tags: ['home', 'a', 'b']
    },
    method: 'GET',
    path: '/home',
    handler: function (request, reply) {
        reply('Hello, this is the home page');
    }
});

server.route({
    config: {
        description: 'this is how users get to the about page',
        notes: 'notes about the about page go here',
        tags: ['about', 'a', 'b']
    },
    method: 'GET',
    path: '/about',
    handler: function (request, reply) {
        reply('Hello, this is the about page');
    }
});

server.route({
    config: {
        description: 'this will get to an index of all tasks',
        notes: 'get to tasks',
        tags: ['tasks']
    },
    method: 'GET',
    path: '/tasks',
    handler: controller.showTask
});
server.route({
    config: {
        description: 'this will get to an index of all priorities',
        notes: 'get to priorities',
        tags: ['priorities']
    },
    method: 'GET',
    path: '/priorities',
    handler: controller.showPriorities
});

server.route({
   config: {
       description: 'Update an existing task in the DB.',
       notes: 'Finds a task & updates it\'s properties.',
       tags: ['tasks', 'update'],
       validate: {
           params: {
               taskId: Joi.number().required().min(24).description('task objectID')
           },
           payload: {
               name: Joi.number().required().min(5).description('name of task'),
               dueOn: Joi.date().required().min('now').format('MM/DD/YYYY').description('due date of task'),
               priority: Joi.number().required().min(24).description('id of task priority')
           }
       }
   },
    method: 'PUT',
    path: '/tasks/{id}',
    handler: function (request, reply) {
        controller.updateTask(request.payload);
        reply('Task successfully updated!');
    }
});


server.pack.register(

    [
        {
            plugin: require('good'),
            options: {
                reporters: [{
                    reporter: require('good-console'),
                    args: [{log: '*', request: '*'}]
                }]
            }
        },
        {
            plugin: require('lout')
        }
    ], function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});