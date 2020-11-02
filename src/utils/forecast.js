const request = require("request");

const forecast = (codeplsce, callback)=>{
    const url = "https://www.metaweather.com/api/location/"+encodeURIComponent(codeplsce)+"/";

    request({url, json: true}, (error, {body})=>{
        if(error){
            callback("Trouble with connection", undefined);
        }else if(body.detail){
            callback("Unable to find location", undefined);
        }else{
            const data = body.consolidated_weather[0];
            callback(undefined, `It is currently ${data.the_temp} degress out. Percent of rain: ${data.predictability}%`);
        }
    })
};

module.exports = forecast;