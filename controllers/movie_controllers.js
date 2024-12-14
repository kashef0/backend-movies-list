const Joi = require('@hapi/joi');
const movieModel = require('../models/move_schema');
const { details } = require('@hapi/joi/lib/errors');



const MovieControllers = {
     // hämta alla filmer
     async getAllMovies(request, h) {
        try {
            const allMovies = await movieModel.find().exec(); // Hämtar alla filmer från databasen genom att anropa find på movieModel och sedan köra frågan
            if (!allMovies) {
                return h.response({ error: 'Det finns inga filmer.' }).code(404);
            }
            return h.response(allMovies).code(200);  // Om hämtningen lyckas, returnera alla filmer
        } catch (error) {
            // Om ett fel inträffar, fånga felet och returnera ett felmeddelande med details
            return h.response({ error: 'Fel vid hämtning av data', details: error.message }).code(500);
        }
    },
    // hämta film via id
    async getMovieById(request, h) {
        const {id} = request.params;
        try {
            const movie = await movieModel.findById(id);
            if (!movie) {
                return h.response({ error: `det finns ingen film med iD: "${id}"` }).code(406);
            }
            return h.response(movie).code(200);
        } catch (error) {
            return h.response({ error: `Movie med id: "${id}" hittades ej..`, details: error.message }).code(500);
        }
    },
    // skapa en ny film 
    async createMovie(request, h) {
        try {
            // tar payload som skickas med begäran från klienten
            const { movie, priority, description, is_watched } = request.payload;

            const existMovie = await movieModel.find();
            const movieExists  = existMovie.find(el => el.movie === movie);
            existMovie.forEach(el => { 
                return el.movie;
            });
            if (movieExists) {
                return h.response({error: `Den filmen: ${movieExists.movie} finns redan, försök något annan.`}).code(406);;
            }
            // Skapa en ny instans av movieModel med de data som skickades in i förfrågan
            const addMovie = new movieModel({ movie, priority, description, is_watched });
            await addMovie.save();  // Spara den nya filmen i databasen
            return h.response({addMovie, message: `Filmen med namn: ${movie} har skapats!`}); // returnera ett svar Om filmen skapas framgångsrikt
        } catch (error) {
             // Om ett fel inträffar, fånga felet och returnera ett felmeddelande
            return h.response({ error: 'Fel vid skapande av data', details: error.message }).code(500);
        }
    },
    // ta bort film med id
    async deleteMovie(request, h) {
        const {id} = request.params;
        try {
            const deletedMovie = await movieModel.findByIdAndDelete(id);
            if (!deletedMovie) {
                return h.response({ error: 'Fel vid radering av movie' }).code(404);
            }
            return h.response({deletedMovie, message: `Movie med id: ${id}  har raderats!`}).code(200);
        } catch (error) {
            return h.response({ error: `Movie med id: ${id} hittades ej.`, details: error.message }).code(500);
        }
    },

    // uppdatera en film passerat på id
    async updateMovie(request, h) {
        const { id } = request.params; // Hämtar id från URL parametrarna
        try {
            
            const { movie, priority, description, is_watched } = request.payload; // Hämtar de uppdaterade värdena för filmen från klientens request-body

            // ID och data för filmen som ska uppdateras och sedan retunera uppdaterade filmen efter ändringen
            const updatedMovie = await movieModel.findByIdAndUpdate(id, { movie, priority, description, is_watched }, { runValidators: true, new: true });

            if (!updatedMovie) {
                return h.response({ error: 'Fel vid uppdatering av movie' }).code(404);
            }
            // Om uppdateringen lyckas, returnera den uppdaterade filmen och ett framgångsmeddelande
            return h.response({updatedMovie, message: `Movie med id: ${id} har uppdaterats!`}).code(200);
        } catch (error) {
            return h.response({ error: `Movie med id: ${id} hittades ej.`, details: error.message }).code(500);
        }
    },


    // behandla 404 error
    async notFound(request, h) {
        return h.response('404 Error! sidan hittades ej!').code(404);
    }
}

module.exports = MovieControllers;
