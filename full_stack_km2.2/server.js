'use strict';

const Hapi = require('@hapi/hapi');
require('dotenv').config();
const routes = require('./routes/movie_routes');

// Funktion för att starta servern
const init = async () => {
    // Skapar en ny Hapi-serverinstans med konfiguration
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['http://localhost:3000/'],
                credentials: true,
                maxAge: 43200,
                headers: ["headers", "Access-Control-Allow-Origin"]
            }
        }
    });
    // Registrerar API rutterna i servern
    server.route(routes);
    

    // Startar server
    await server.start();
    console.log('Server running on %s', server.info.uri);

    return server;
};

// Hantera ohanterade avslag
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);  // Avslutar processen med statuskod 1
});
// Exporterar init
module.exports = init;
