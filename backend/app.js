let express = require("express"),
    mongoose = require("mongoose");

let app = express();

app.get("/", function(req, res) {
    res.send("Hello, world!");
})

app.listen(3000, function() {
    console.log("The team hub server has started");
});
