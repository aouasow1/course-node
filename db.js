
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://song-1:song1234@SongDB.vhy4bsm.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true})

module.exports = mongoose

