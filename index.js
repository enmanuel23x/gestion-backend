//NPM Requires
require('dotenv').config();
const http = require('http');
const express = require('express');
const path = require('path');
const cors = require('cors');
//Project's own requires
const config  = require('./config/config').server;
//Initializations
const app = express();
const report = require('./routes/reports')
const booking = require('./routes/booking')
//Express Settings
app.use(cors());
//Express Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
// CUBEJS
const WebSocketServer = require('@cubejs-backend/server/WebSocketServer');
const CubejsServerCore = require('@cubejs-backend/server-core');
const MySQLDriver = require('@cubejs-backend/mysql-driver');
const options = {
    dbType: 'mysql',
    devServer: true,
    driverFactory: () => new MySQLDriver({
        host: process.env.CUBEJS_DB_HOST,
        database: process.env.CUBEJS_DB_NAME,
        port: process.env.CUBEJS_DB_PORT,
        user: process.env.CUBEJS_DB_USER,
        password: process.env.CUBEJS_DB_PASS,
    }),
    schemaPath: path.join( 'schema'),
    orchestratorOptions: {
        queryCacheOptions: {
            refreshKeyRenewalThreshold: 1,
        }
    }
    // logger: (msg, params) => {
    //     console.log(`${msg}: ${JSON.stringify(params)}`);
    // }
}


const server = http.createServer({}, app);
// Vista por defecto para la ruta raiz
app.get("/html", function (request, response) {
    response.sendFile(path.join(__dirname, 'views/index.html'));
});
//Express Routes
app.use('/report', report)
app.use('/booking',booking)
//Start Server

const serverCore = CubejsServerCore.create(options);
// setInterval(() => serverCore.runScheduledRefresh(), 5000);
serverCore.initApp(app);


const socketServer = new WebSocketServer(serverCore, { processSubscriptionsInterval: 1 });
socketServer.initServer(server);
const PORT = process.env.PORT || config.port;
server.listen(PORT, (err) => {
    if (err) {
        console.error('Fatal error during server start: ');
        console.error(e.stack || e);
    }
    console.log(`🚀 Cube.js server (${CubejsServerCore.version()}) is listening on ${PORT}`);
});
