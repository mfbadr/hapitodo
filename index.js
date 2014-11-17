/**
 * Created by mikeybadr on 11/17/14.
 */

var Hapi      = require('hapi'),
    Joi       = require('joi'),
    port      = process.env.PORT,
    db        = process.env.DB,
    controller = require('./controller.js'),
    server    = new Hapi.Server(port);

/*
Routes to make:
 get /home --> home
 get /about --> about

 get /tasks         --> all tasks
 post /tasks        --> make task
 put /tasks/{id}    --> update task
 delete /tasks/{id} --> delete task
 get /tasks/{id}    --> show task

 get /priorities    --> show all priorites
 post /priorities    --> create priority
 */

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