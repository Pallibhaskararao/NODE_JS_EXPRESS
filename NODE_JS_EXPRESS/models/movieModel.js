const mongoose = require("mongoose");
const fs = require("fs");
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
    },
    createdBy : String
},{
    toJSON : {virtuals :true},
    toObject : {virtuals : true}
});

movieSchema.virtual("durationInHours").get(function(){
    return this.duration / 60;
})
movieSchema.pre("save",function(next) {
    this.createdBy = "Bhaskar";
    next();
})

movieSchema.post("save",function(doc,next) {
    content = `This is by ${doc.name} at the time of ${doc.createdAt} \n`;
    fs.writeFileSync("./log/log.txt",content,{flag : 'a'},(err)=>{
        console.log(err.message);
    })
    next();
})

movieSchema.pre(/^find/,function(next) {
    this.find({releseDate : {$lte : Date.now()}});
    this.createdBy = "Bhaskar";
    this.start = Date.now();
    next();
})
movieSchema.post(/^find/,function(docs,next) {
    this.find({releseDate : {$lte : Date.now()}});
    this.end = Date.now();
    content = `the execution time is ${this.end - this.start} \n`;
    fs.writeFileSync("./log/log.txt",content,{flag : 'a'},(err)=>{
        console.log(err.message);
    })
    next()
})

const Movie = mongoose.model("Movie",movieSchema);

module.exports = Movie;