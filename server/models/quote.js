var mongoose = require("mongoose");

var quoteSchema = new mongoose.Schema({
    name: {type:String, required:true},
    quote: {type:String, required:true}
}, {timestamps:true});

mongoose.model("Quote", quoteSchema);

var Quote = mongoose.model("Quote");

mongoose.Promise = global.Promise;