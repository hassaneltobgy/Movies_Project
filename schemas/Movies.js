const mongoose=require('mongoose');
const movieSchema = new mongoose.Schema({
    name: {type: String, required: true},
    genre: {type: String, required: true},
    rating: {type: Number, required: true},
    Year: {type: Number, required: true},
    
})

const Movie = mongoose.model("Movies", movieSchema);
module.exports=Movie;