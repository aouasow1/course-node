//this is similar to when we use our default tags in html
const express = require('express');
var cors = require('cors')
//activate or tell this app variable to be an express server
const app = express();
app.use(cors())

const router = express.Router();

//start the web server...app.listener(parameter, functions)
//app.listen(3000, function() {
//    console.log('Listen on port 3000');
//})

//making an api using routes
//routes are use to handle browser requests, the look like urls.the difference is that when a browser request a route, it is dynamically handle by using a function.

//GET or regular request when someone go to http://localhost:3000/hello, when using a function on a route, we almost always have a parameter or handle a response or request

router.get('/songs', function(req, res) {
    const songs = [
        {
            title: 'We Found Love',
            artist: 'Rihanna',
            popularity: 10,
            releaseDate: new Date(2011,9,22),
            genre: ['electro house']
        },
        {
            title: 'Happy',
            artist: 'Pharrell Williams',
            popularity: 10,
            releaseDate: new Date(2013,11,21),
            genre: ['soul', 'new soul']
        }
    ];
    res.json(songs)
})
//all requests that usually use an api start with /api....so the url would be localhost:3000/api/songs
app.use('/api', router)
app.listen(3000)



//app.get('/hello', function(req, res) {
    //res.send('<h1>Hello express</h1>')
//})

//app.get('/goodbye', function(req, res) {
    //res.send('<h1>Goodbye, express</h1>')
//})



