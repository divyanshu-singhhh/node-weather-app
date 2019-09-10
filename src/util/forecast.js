const request = require('request')

const forecast = (latitude, longitude , callback) =>{
    const url = 'https://api.darksky.net/forecast/ce6c41eda5ef76eff7a65fd750508192/'+ latitude + ',' + longitude + '?units=si'

    request({url , json: true},(error, {body})=>{
        if(error){
            callback('Unable to connect to location service!',undefined)
        }else if (body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,{
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                rain: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast