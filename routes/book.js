const Book = require("../models/book")
const router = require("express").Router()

// register
router.post("/register", async (req, res) => {
    const newBook = new Book(req.body);
    try {
        const savedBook = await newBook.save()
        res.status(200).json(savedBook)
    }
    catch (err) {
        res.status(501).json(err)
    }
})

//get all
router.get("/", async (req, res) => {
    try {
        const bookDetails = await Book.find()
        res.status(200).json(bookDetails)
    } catch (err) {
        res.status(500).json(err);
    }
})
//get
router.get("/:id", async (req, res) => {
    try {
        const bookDetails = await Book.findOne(

            { "bookId": req.params.id }
        )
        res.status(200).json(bookDetails)
    } catch (err) {
        res.status(500).json(err);
    }
})

// update
router.put("/:id", async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(500).json(err);
    }
})


// delete
router.delete("/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json("Book has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router