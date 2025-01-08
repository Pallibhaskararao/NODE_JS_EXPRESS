const ApiFeatures = require("../Utils/AppFeatures");
const Movie = require("./../models/movieModel");

exports.getTopMovies =  (req,res,next) =>{
    req.query.limlit = '5';
    req.query.sort = "-rating";
}
exports.getStats = async (req,res) =>{
    try{
        const stats = await Movie.aggregate([
            {$match :{rating :{$gte:1}}},
            {$group : {
                _id : '$coverImage',
                totalPrice : {$sum : '$price'},
                avgRating : {$avg : '$rating'},
                minPrice : {$min : '$price'},
                maxPrice : {$max : '$price'},
                MovieCount : {$sum : 1}
            }},
            {$sort : {avgRating : 1}},
            {$match  :{minPrice : {$gt : 49}}}
        ]);
        res.status(200).json({
            status: 'success',
            length : stats.length,
            data:{
                stats
            }
    });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
    });
}
}

exports.getGeneres = async (req,res) =>{
    try{
        const generes = req.params.generes;
        const gener = await Movie.aggregate([
            {$unwind : '$generes'},
            {$group :{
                count : {$sum : 1},
                movies : {$push : '$name'}
            }},
            {$project : {_id :0}},
            {$sort : {count : -1}},
            {$match : {generes : generes}},

        ]);

        res.status(200).json({
            status: 'success',
            length : gener.length,
            data:{
                gener
            }
    });
    }catch(err)
    {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.getMovies = async (req,res) =>{
    try{
        const features = new ApiFeatures(Movie.find(),req.query)
                            .filter()
                            .sort()
                            .limitFields()
                            .paginate();
        let movies = await features.query;
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