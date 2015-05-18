/* exported Logger */
/* global window */

var Logger = function Logger() {
    'use strict';
    var logger = {};

    // todo: add custom events so that other scripts can listen for log changes (think vis).

    logger.init = function() {
        global.tools.notify('Logger initialising.', 1);

        global.log = global.session.registerData('log', true);

        // listen for log events
        window.addEventListener('log', function (e) {
            logger.addToLog(e.detail);
        }, false);

        return true;
    };

    logger.addToLog = function(e) {
        global.tools.notify('Event being added to log.',1);
        if (!e) { return false; }

        var data = {
            'eventType': e.eventType,
            'targetObject':e.eventObject,
            'eventTime': new Date()
        };

        global.session.addData('log', data, true);
        var eventLogged = new window.CustomEvent('eventLogged', {'detail':data});
        window.dispatchEvent(eventLogged);
        var unsavedChanges = new window.Event('unsavedChanges');
        window.dispatchEvent(unsavedChanges);
        return true;
    };

    logger.getLog = function() {
        return global.log;

    };

    logger.getLastEvent = function() {

    };

    return logger;
};

module.exports = new Logger();
