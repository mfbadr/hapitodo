/**
 * Created by mikeybadr on 11/17/14.
 */

var Hapi      = require('hapi'),
    Joi       = require('joi'),
    port      = process.env.PORT,
    db        = process.env.DB,
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
