/**
 * Created by mikeybadr on 11/17/14.
 */

var Hapi      = require('hapi'),
    Joi       = require('joi'),
    mongoose  = require('mongoose'),
    port      = process.env.PORT,
    db        = process.env.DB,
    server    = new Hapi.Server(port);
