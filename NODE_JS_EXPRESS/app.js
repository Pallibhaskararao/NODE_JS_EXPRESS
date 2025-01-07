const morgan = require("morgan");
const express = require("express");
const app = express();
const moviesRouter = require("./routers/MoviesRouter");

// const logger = (req,res,next) =>{
//     console.log(req.method,req.url);
//     next();
// };
// app.use(logger);

// app.use((req,res,next)=>{
//     req.Date = new Date().toISOString();
//     next();
// });

// app.use(express.static("./public"));
// app.use(morgan('dev'));

app.use(express.json());//to add the content to request body
app.use('/api/v1/movies',moviesRouter);
module.exports = app;