const request = require("request");

const geocode = (adress, callback)=>{
    const url = "https://www.metaweather.com/api/location/search/?query="+encodeURIComponent(adress);

    request({url, json: true}, (error, {body})=>{
        if(error){
            callback("Trouble with connection", undefined);
        }else if(!body[0]){
            callback("not right city", undefined);
        }else{
            callback(undefined, body[0].woeid);
        }
    })

};



module.exports = geocode;