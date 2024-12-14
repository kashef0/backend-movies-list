const { description } = require("@hapi/joi/lib/base");
const { type } = require("@hapi/joi/lib/extend");
const { string, required, boolean } = require("joi");
const mongoose = require("mongoose");
const schema = mongoose.Schema; // Skapar ett schema för MongoDB

// Definierar ett schema för Movie
const Movie_Schema = new schema ({
    movie: {
        type: String,
        required: true,
        trim: true
    },
    priority: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    is_watched: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});
// Exporterar modellen för att användas i andra delar av projektet
module.exports = mongoose.model("movie", Movie_Schema);