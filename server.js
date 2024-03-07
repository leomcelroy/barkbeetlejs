var app, 
    express = require('express'),
    path = require('path'),
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000,
    root = path.resolve(__dirname);
 
app = express();
app.use(express.static(root));
server = app.listen(port, host, serverStarted);
 
function serverStarted () {
    console.log('Server started', host, port);
    console.log('Root directory', root);
    console.log('Press Ctrl+C to exit...\n');
}