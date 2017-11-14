var mongoose = require("mongoose");
var moment = require("moment");
var Quote = mongoose.model("Quote");

module.exports = {
    show: function(req, res){
        Quote.find({}, function(err, quotes){
            if(err){
                res.render("quotes", {quotes:{}});
            } else {
                res.render("result", {quotes:quotes, moment:moment});
            }
        });
    },
    
    create: function(req, res){
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
    }
}