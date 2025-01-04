const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true,"this is must be filled"],
        unique : true,
        trim : true
    },
    description : {
        type : String,
        required : [true,"this is must be filled"],
        trim : true
    },
    duration : {
        type : Number,
        required : [true,"this is must filled"]
    },
    rating : {
        type : Number,
    },
    totalRatings :{
        type : Number,
    },
    releseYear :{
        type : Number,
        required : [true,"releseyear is rquired"]
    },
    releseDate : {
        type : Date,
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    generes :{
        type : [String],
        required : [true ,"generes is a required flied"]
    },
    directors : {
        type : [String],
        required : [true,"directors is a required field"]
    },
    coverImage :{
        type : String,
        required : [true ,"coverimage is a required field"]
    },
    actors : {
        type : [String],
        required : [true ,"actors is a required field"]
    },
    price :{
        type : Number,
        required : [true ,"price is a required field"]
    }
});
const Movie = mongoose.model("Movie",movieSchema);

module.exports = Movie;