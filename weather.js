const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res)
{
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  var cityname = req.body.city;

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid=8d35535b5b84f2888a2be17f87e5642a&units=metric";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data)
  {
    const jdata = JSON.parse(data);
    //console.log(jdata);
    const temp = Math.ceil(jdata.main.temp);
    //console.log(temp);
    const desc = jdata.weather[0].description;

    const icon = jdata.weather[0].icon;

    //res.write();
    //res.send();
    res.write("<h1>The weather is currently "+desc+"</h1>");
    res.write("<h1>The Temperature in "+cityname+" is "+ temp + " degree Celcius.</h1>");
    res.write("<img src = "+"http://openweathermap.org/img/wn/"+icon+"@2x.png>");

    res.send();
  });
  });
});


app.listen(3000, function(){
  console.log("Server is running on PORT: 3000");
});
