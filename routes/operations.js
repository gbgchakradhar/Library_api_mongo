const router = require("express").Router()
const Book = require("../models/book")
const Subject = require("../models/subject")

//show available copies of a book
router.get("/book", async (req, res) => {
    try {
        const result = await Book.findOne({ "bookId": req.body.bookId });

        if (result) {
            const availableCopies = result.available_copies;
            res.status(200).json({ availableCopies });
        } else {

            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//(8)To check if a book is available to read and update the frequency and availability upon taking one
router.put("/book", async (req, res) => {
    try {
        const result = await Book.findOne({ "bookId": req.body.bookId });

        if (result) {
            const availableCopies = result.available_copies;
            // let updatedResult;
            if (availableCopies >= 1) {
                const updatedResult = await Book.findOneAndUpdate(
                    { "bookId": req.body.bookId },
                    { $inc: { "available_copies": -1 } },
                    { new: true })


                const response = {
                    bookId: updatedResult.bookId,
                    name: updatedResult.name,
                    available_copies: updatedResult.available_copies,
                };
                const subjectList = result.subject
                for (let index = 0; index < subjectList.length; index++) {
                    const subjectName = subjectList[index].subject_name;
                    await Subject.findOneAndUpdate({ "subject_name": subjectName }, { $inc: { "frequency": 1 } })
                }

                res.status(200).json(response);
            }
            else {
                res.status(200).json({ message: "All Books are Occupied" })
            }
        } else {

            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//(7)available books of a subject
router.get("/subject", async (req, res) => {

    try {
        const subjectDetails = await Subject.findOne({
            "subjectId": req.body.Id
        })
        const BooksList = subjectDetails.books

        var result = new Array();
        for (let index = 0; index < BooksList.length; index++) {
            const BookId = BooksList[index].bookId;

            const bookDetails = await Book.findOne({ "bookId": BookId })
            if (bookDetails.available_copies >= 1) {
                result.push(bookDetails)
            }
        }
        res.status(200).json(result)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


//Most read subject
router.get("/popular", async (req, res) => {
    try {
        var listOfSubjects = await Subject.find().sort({ "frequency": -1 }).limit(3);

        res.status(200).json({ "subjects": listOfSubjects })
    }
    catch (err) {
        console.err(err);
        res.status(500).json(err)
    }
})


module.exports = router