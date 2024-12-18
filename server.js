'use strict';

const Hapi = require('@hapi/hapi');
require('dotenv').config();
const routes = require('./routes/movie_routes');

// Funktion för att starta servern
const init = async () => {
    // Skapar en ny Hapi-serverinstans med konfiguration
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
                credentials: true,
                maxAge: 43200,
                headers: ['Content-Type', 'Authorization', 'X-Requested-With']
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
