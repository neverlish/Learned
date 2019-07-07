#!/usr/bin/env node
import http from 'http';
import app from './server';
const port = normalizePort(process.env.PORT || '3000');

// Set port for app
app.set('port', port);

// Create the server
const server = http.createServer(app);

// Listen...and we're off!
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.extest(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.extest(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    console.info(`==> 🌎  Newsfeed is running on port ${addr.port} ✅`);
}
