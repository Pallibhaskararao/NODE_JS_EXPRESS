const express = require("express");
const fs = require("fs");
let app = express();
let movies = JSON.parse(fs.readFileSync("./files/movies.json"));
let port = 3000;
//create server
app.listen(port,()=>{
    console.log("the server is started");
});

const logger = (req,res,next) =>{
    console.log(req.method,req.url);
    next();
}

app.use(logger);
//middle ware
app.use(express.json());

//another middle ware
app.use((req,res,next)=>{
    req.addDate = new Date().toISOString();
    next();
})

const getMovies = (req,res) =>{
    res.status(200).json({
        "status": "success",
        "Date" : req.addDate,
        "data" : {
            "movies" : movies
        }
    });
}

const createMovie = (req,res)=>{
    // console.log(req.body);
    let new_id = movies[movies.length - 1].id + 1;
    
    const newMovie = Object.assign({id : new_id},req.body);
    movies.push(newMovie);

    fs.writeFile("./files/movies.json",JSON.stringify(movies),(err)=>{
        res.status(201).json({
            "status": "success",
            "data" : {
                "movie" : newMovie
                }
        })
    })
    //res.send("complete the push operation");
}

const getMovie = (req,res) =>{
    const id = req.params.id * 1;
    let movie = movies.find(mov => mov.id === id);

    if(!movie)
    {
        return res.status(404).json({
            status : "failure",
            message : "movie not found"
        })
    }

    res.status(200).json({
        status : "success",
        data : {
            movie : movie
        }
    })
}

const updateMovie = (req,res) =>{
    let id = req.params.id * 1;
    let updateMovie = movies.find(mov => mov.id === id);

    if(!updateMovie)
    {
        return res.status(404).json({
            status : "failure",
            message : "movie not found"
        });
    }
    let index = movies.indexOf(updateMovie);

    Object.assign(updateMovie , req.body);
    movies[index] = updateMovie;

    fs.writeFile("./files/movies.json",JSON.stringify(movies),(err)=>{
        res.status(200).json({
            status : "success",
            data : {
                movie : updateMovie
            }
        })
    })
}

const deleteMovie = (req,res) =>{
    let id = req.params.id * 1;
    let deleteMovie = movies.find(mov => mov.id === id);
    if(!deleteMovie)
        {
            return res.status(404).json({
                status : "failure",
                message : "movie not found"
            });
        }
    let index = movies.indexOf(deleteMovie);
    movies.splice(index,1);
    
    fs.writeFile("./files/movies.json",JSON.stringify(movies),(err)=>{
        res.status(204).json({
            status : "success",
            data : {
                message : null
            }
        })
    });
}


// app.get("/api/v1/movies",getMovies);
// app.post("/api/v1/movies",createMovie);
// app.get("/api/v1/movies/:id",getMovie);
// app.patch("/api/v1/movies/:id",updateMovie);
// app.delete("/api/v1/movies/:id",deleteMovie);

const moviesRouter = express.Router();

moviesRouter.route("/").get(getMovies).post(createMovie)

moviesRouter.route("/:id").get(getMovie).delete(deleteMovie).patch(updateMovie)

app.use('/api/v1/movies' , moviesRouter);