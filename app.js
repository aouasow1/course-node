//this is similar to when we use our default tags in html
const express = require('express');
//activate or tell this app variable to be an express server

const Song = require('./models/song')
var cors = require('cors')
//const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const User = require('./models/user')

const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router()
const secret = 'supersecret'

//create new user
router.post('/user', async(req, res) => {
    if(!req.body.username || !req.body.password) {
        res.status(400).json({error: 'Missing Password or Username'})
    }
    const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status

    })
    try {
        await newUser.save()
        console.log(newUser)
        res.sendStatus(201)
    }
    catch(err) {
        res.status(400).send(err)
            
    }
})
//Authentificate
//post request-reason why is because when you login you are creating what we call a new session
router.post('/auth', async(req, res) => {
    if(!req.body.username || !req.body.password) {
        res.status(400).json({error: "Missing username or password"})
        return
    }
    //try to find the udsername in the database, then see if it match with username and password
    //await finding a user
    let user = await User.findOne({username: req.body.username})
        //connection or server error
    if(!user) {
            res.status(401).json({error: "Bad Username"})
        }
        //check to see if user password match the request password
    else {
        if(user.password != req.body.password) {
            res.status(401).json({error: 'Bad Password'})
            }
            //successful login
        else {
                //create a token that is encoded with the jwt
            username2 = user.username

            const token = jwt.encode({username: user.username}, secret)
            const auth = 1

            //respond with token
            res.json({
                username2,
                token: token,
                auth: auth
            })
            }
        }
})
//check status with valid token, see if it match with front end
router.get('/status', async(req,res) => {
    if(!req.headers['x-auth']) {
        return res.status(401).json({error: 'Missing x-auth'})
    }
    //if x-auth contains the token(it should)
    const token = req.headers['x-auth']
    try {
        const decoded = jwt.decode(token, secret)
        //send back all username and status to the user or in frontend
        let users = User.find({}, 'username status')
        res.json(users)
    }
    catch(ex) {
        res.status().json({error: 'Invalid JWT'})
    }
})


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

router.get('/songs/:id', async(req, res) => {
    try{
        const song = await Song.findById(req.params.id)
        res.json(song)
    }
    catch(err) {
        res.status(400).send(err)
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

//update is to update an existing record/ressources databases entry...it use a put request
router.put('/songs/:id', async(req, res) => {
    //first we need to find and update the song, the front end want us to update.
    //to do this we need to request the id of the song from the request
    //and find it in the database and update it.
    try {
        const song = req.body
        await Song.updateOne({_id: req.params.id},song)
        console.log(song)
        res.sendStatus(204)
    }
    
    catch(err) {
        res.status(400).send(err)
    }
})

router.delete('/songs/:id', async(req, res) => {
    try{
        const song = await Song.findById(req.params.id)
        console.log(song)
        await Song.deleteOne({_id: song._id})
        res.sendStatus(204)
    }
    catch(err){
        res.status(400).send(err)
    }
})


app.use(cors({
    origin: 'https://aouasow1.github.io/'
}));
app.use('/api', router);
app.listen(8080)






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



