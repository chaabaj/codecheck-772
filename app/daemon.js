const startStopDaemon = require('start-stop-daemon');

startStopDaemon(() => {
    require('./main.js');
});