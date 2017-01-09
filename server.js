const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
var app = express();


hbs.registerPartials(__dirname + "/views/partials");

app.set('view engine', hbs);


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} ${req.ips}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log("There was an error");
        }
    });
    res.render("maintainence.hbs")
});

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear(); 
});

hbs.registerHelper('screamIt', (text) => {
 return text.toUpperCase();
});

app.get("/", (req, res) => {
    res.render("home.hbs", {
        pageTitle: "About Page",
        welcomeMessage: "Welcome to my Awesome Website"
    })
});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About Page",
    });
});

app.listen(process.env.PORT, process.env.IP, ()=> {
   console.log(`You are running on port ${process.env.PORT}`); 
});