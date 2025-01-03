const Movie = require("./../models/movieModel");


exports.getMovies = (req,res) =>{
    
};

exports.createMovie = (req,res)=>{
    
};

exports.getMovie = (req,res) =>{
    
};

exports.updateMovie = (req,res) =>{

};

exports.deleteMovie = (req,res) =>{

};

exports.validateBody = (req,res,next) =>{
    if(!req.body.name || !req.body.relese)
    {
        return res.status(400).json({
            status : "failure",
            message : "name and relese year are required"
        })
    }
    next();
};