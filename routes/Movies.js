const express = require('express');
const Movie = require('../schemas/Movies'); // Use a different name for the imported module
const router = express.Router();

// Sample data (you should replace this with your actual data)


router.get("/", async (req, res) => {
  try {
    // Retrieve movies from the database
    const movies = await Movie.find({});
    res.send(movies); // Send the retrieved movies as the response
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    // Create a new movie document and save it to the database
    const body = req.body;
    const newMovie = new Movie({
      name: body.name,
      genre: body.genre,
      rating: body.rating,
      Year: body.Year,
    });
    const savedMovie = await newMovie.save();
    res.send(savedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(400).send("No ID provided")
        return
    }
    await Movie.findByIdAndDelete(id)
    res.send("Deleted")
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(400).send("No ID provided")
        return
    }
    const body = req.body
    const newMovie = await Movie.findOneAndUpdate({_id: id}, {...body}, {new: true})
    res.send(newMovie);

})

module.exports = router;
