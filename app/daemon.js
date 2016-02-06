const startStopDaemon = require('start-stop-daemon');

/**
 * Run the server as a daemon and manage it(start,stop,restart,status)
 * Redirect output log to the file out.log
 * Redirect error log to the file err.log
 */
startStopDaemon(() => {
    require('./main.js');
});