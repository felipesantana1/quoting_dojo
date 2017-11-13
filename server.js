var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var moment = require("moment")

app.use(bodyParser.urlencoded({extended:true}));
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/quoting_dojo", {useMongoClient:true});

var quoteSchema = new mongoose.Schema({
    name: {type:String, required:true},
    quote: {type:String, required:true}
}, {timestamps:true});

mongoose.model("Quote", quoteSchema);

var Quote = mongoose.model("Quote");

mongoose.Promise = global.Promise;

app.get("/", function(req, res){
    res.render("index", {errors: {}});
});

app.post("/quotes", function(req, res){
    let quote = new Quote({
        name: req.body.name,
        quote: req.body.quote
    });
    quote.save(function(err){
        if(err){
            res.render("index", {errors: quote.errors});
        } else {
            res.redirect("/quotes");
        }
    });
});

app.get("/quotes", function(req, res){
    Quote.find({}, function(err, quotes){
        if(err){
            res.render("quotes", {quotes:[]});
        } else {
            res.render("result", {quotes:quotes, moment:moment});
        }
    })
    
});

app.listen(8000, function(){
    console.log("listening on port 8000");
});