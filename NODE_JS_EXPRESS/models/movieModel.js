const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true,"this is must be filled"],
        unique : true
    },
    description : String,
    duration : {
        type : Number,
        required : [true,"this is must filled"]
    },
    rating : {
        type : Number,
        default : 5.0
    }
});
const Movie = mongoose.model("Movie",movieSchema);

module.exports = Movie;