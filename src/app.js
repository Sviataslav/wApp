const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");




const app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res)=>{
    res.render("index",{
        title: "weather",
        name: "Slava"
    });
});

app.get("/about", (req, res)=>{
    res.render("about", {
        title: "My site",
        name: "Slava"
    });
});

app.get("/help", (req, res)=>{
    res.render("help", {
        title: "Some help",
        name: "Slava"
    });
})



app.get("/weather", (req, res)=>{
    if(!req.query.adress){
       return res.send({
            error: "You must provide an adress"
        });
    };

    geocode(req.query.adress, (error, data="")=>{
        if(error){
            return res.send({
                error
            });
        }
    
        forecast(data, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                });
            };
    
            res.send({
                location: req.query.adress,
                data: forecastData
            });
         });
    
    });

    
});

app.get("/products",(req, res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    res.send({
        products: []
    })
});

app.get("/help/*", (req, res)=>{
    res.render("errorPage404",{
        title: "help error",
        name:"Slava",
        errMass:"Help article is not found"
    });
})


app.get("*", (req, res)=>{
    res.render("errorPage404",{
        title:"error page",
        name:"Slava",
        errMass: "Page not found"
    });
});



app.listen(port, ()=>{
    console.log("server work on port "+port);
});