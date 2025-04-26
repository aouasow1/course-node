//this is similar to when we use our default tags in html
const express = require('express');
//activate or tell this app variable to be an express server

const Song = require('./models/song')
var cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router()


//grab all song in a database
router.get('/songs', async(req, res) => {
    try{
        const songs = await Song.find({})
        res.send(songs)
        console.log(songs)
    }

    catch(err){
        console.log(err)
    }
})

router.post('/songs', async(req, res) => {
    try{
        const song = await new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log(song)
    }
    catch(err){
        res.status(400).send(err)

    }
})

app.use('/api', router);
app.listen(8000)






//start the web server...app.listener(parameter, functions)
//app.listen(3000, function() {
//    console.log('Listen on port 3000');
//})

//making an api using routes
//routes are use to handle browser requests, the look like urls.the difference is that when a browser request a route, it is dynamically handle by using a function.

//GET or regular request when someone go to http://localhost:3000/hello, when using a function on a route, we almost always have a parameter or handle a response or request

//router.get('/songs', function(req, res) {
//    const songs = [
//        {
//           title: 'We Found Love',
//           artist: 'Rihanna',
//           popularity: 10,
//           releaseDate: new Date(2011,9,22),
//           genre: ['electro house']
//        },
//        {
//           title: 'Happy',
//            artist: 'Pharrell Williams',
//            popularity: 10,
//            releaseDate: new Date(2013,11,21),
//            genre: ['soul', 'new soul']
//        }
//    ];
//    res.json(songs)
//})
//all requests that usually use an api start with /api....so the url would be localhost:3000/api/songs




//app.get('/hello', function(req, res) {
    //res.send('<h1>Hello express</h1>')
//})

//app.get('/goodbye', function(req, res) {
    //res.send('<h1>Goodbye, express</h1>')
//})



