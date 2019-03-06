const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);


app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Daniel Abrgel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Daniel Abrgel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title:'Help',
        name:'Daniel Abrgel'
    })
})



app.get('/products',(req,res)=>{
    const query =req.query.search;
    if(!query){
        return res.send({
            error:"You must proide a serach term"
        })
    }
    res.send({
        products:[]
    })
})





app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(err,result)=>{
            if(err){
                return res.send({error})
            }
            res.send({
                forecast: result,
                location,
                address: req.query.address
            });
        })
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Daniel Abrgel',
        error:"Page not found."
    })

})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Daniel Abrgel',
        error:"Help article not found"
    })

})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})