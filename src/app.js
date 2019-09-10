const path = require('path')
const express = require('express')  
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define Path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup Static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Divyanshu Singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Divyanshu Singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        message: 'message from node nigga',
        title: 'Help',
        name: 'Divyanshu Singh'
    })
})


app.get('/weather' , (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please Provide Address'
        })
    }

    geocode(req.query.address , (error,{latitude,longitude,location} = { }) =>{ 
        if(error){
         return res.send({
             error
         })
        }
          
        forecast(latitude, longitude, (error, forecastdata) => {
           if(error){
              return res.send({
                  error
              })
           }
           var data ={}
           console.log(location)
           data.address = req.query.address
           data.location = location
           data.forecastData = forecastdata 
           res.send(data)
         }) 
     })

})

app.get('/products' , (req,res) => {
    if(!req.query.search){
        return  res.send({
            error: 'Provide Search Term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        name: 'Divyanshu Singh',
        title: 'help page error',
        message: 'Help Article Not Found'
    })
})
  
//math anything that hasnt been matched so far
app.get('*', (req,res) => {
    res.render('404',{
        name: 'Divyanshu Singh',
        title: 'ERROR',
        message: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Sever is up on port ' + port)
})