//NPM Requires
const express = require('express');
const path = require('path');
const cors = require('cors');
//Project's own requires
const config  = require('./config/config').server;
//Initializations
const app = express();
const report = require('./routes/reports');
const booking = require('./routes/booking');
//Express Settings
app.use(cors());
//Express Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
//Express Routes
// Vista por defecto para la ruta raiz
app.get("/", function (request, response) {
    response.sendFile(path.join(__dirname, 'views/index.html'));
});
app.use('/report', report);
app.use('/booking',booking);
//Start Server
const PORT = process.env.PORT || config.port;

app.listen(PORT, function(){
    console.log(`Server running on ${config.host}:${PORT}`)
});