const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: "./config.env"});
const app = require("./app");

console.log(process.env);

mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser: true,
}).then((conn)=>{
    //console.log(conn); //it is a connection object
    console.log("DB connected Successful");
}).catch((err)=>{
    console.log("some error is occured");
});



// let port = process.env.PORT || 3000;
// app.listen(port,()=>{
//     console.log("the server is started");
// });