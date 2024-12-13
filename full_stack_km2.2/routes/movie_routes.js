const { options } = require('joi');
const MovieControllers = require('../controllers/movie_controllers');
const Joi = require('@hapi/joi');
const { validate } = require('../models/move_schema');

const routes = [
    {
        method: 'GET', // hämta alla filmar
        path: '/api/movie',
        handler: MovieControllers.getAllMovies,
    },
    {
        method: 'Get',// hämta en film beroande på id
        path: '/api/movie/{id}',
        handler: MovieControllers.getMovieById,
    },
    {
        method: 'POST',
        path: '/api/create',
        handler: MovieControllers.createMovie,  // Peka på vilken funktion i controllers map som ska hantera förfrågan
        options: {
            validate: { // Validera inkommande data i förfrågan
                payload: Joi.object({
                    movie: Joi.string().min(1).required(),
                    priority: Joi.number().greater(0).less(11).required(),
                    is_watched: Joi.boolean().default(false)
                }),failAction: (request, h, error) => { // felhantering vid valideringsfel
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover(); 
                    // hantera valideringsfel och visa första felmeddelande och returneras ett svar till klienten direkt 
                }
            }
        }
    },
    {
        method: 'PUT', // uppdatera en film med specifik id i databas
        path: '/api/update/{id}',
        handler: MovieControllers.updateMovie,
        options: {
            validate: { // Validera inkommande data i förfrågan
                payload: Joi.object({
                    movie: Joi.string().min(1).required(),
                    priority: Joi.number().greater(0).less(11).required(),
                    is_watched: Joi.boolean().default(false)
                }),failAction: (request, h, error) => {
                    return h.response({ error: error.details[0].message }).code(400).takeover();
                }
            }
        }
    },
    {
        method: 'DELETE', // ta bort en film med specifik id i databas
        path: '/api/delete/{id}',
        handler: MovieControllers.deleteMovie,
    },
    {
        method: '*', // Tillåta alla HTTP-metoder
        path: '/{any*}', // kontrollera alla sökvägar som inte har definierade routes
        handler: MovieControllers.notFound // Anropar funktionen notFound i movie_controllers för att hantera förfrågningar
    }

]

module.exports = routes;

