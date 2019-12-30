let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let articleSchema = new Schema({
    title: String,
    preview: String,
    text: String
});

let Article = mongoose.model("Article", articleSchema);
module.exports = Article;