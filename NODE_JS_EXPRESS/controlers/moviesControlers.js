const Movie = require("./../models/movieModel");

exports.getMovies = async (req,res) =>{
    try{
    const movies = await Movie.find(req.query);
    // const movies = await Movie.find()
    //                     .where('duration').equals(req.query.duration)
    //                     .where('rating').equals(req.query.rating);
    res.status(200).json({
        status: 'success',
        length : movies.length,
        data:{
            movies
        }
    });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.createMovie = async (req,res)=>{
    try{
    const movie = await Movie.create(req.body);
        res.status(201).json({
            status: 'success',
            data:{
                movie
                }
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getMovie = async (req,res) =>{
    try{
    // const movie = Movie.find({_id : req.params.id});
    const movie = await Movie.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data:{
            movie
            }
    });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.updateMovie = async (req,res) =>{
    try{
    const movieUpdate = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true ,runValidators : true ,upsert :true});
        res.status(200).json({
            status: 'success',
            data:{
                movie : movieUpdate
                }
        });
        }catch(err){
            res.status(404).json({
                status: 'fail',
                message: err.message
            });
        }
};

exports.deleteMovie = async (req,res) =>{
    try{
        await Movie.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
            });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
            });
    }
};