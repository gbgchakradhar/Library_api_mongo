const router = require("express").Router()
const Book = require("../models/book")
const Subject = require("../models/subject")
const Time = require("../models/timeLog")

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

//In a given time range number of students and staff in library

router.get("/count", async (req, res) => {
    const from_time = req.body.from_time;
    const to_time = req.body.to_time;
    const branch = req.body.branch;
    const date = req.body.date;

    const fromTime = new Date(`${date}T${from_time}Z`);
    const toTime = new Date(`${date}T${to_time}Z`);

    try {

        const data = await Time.find({
            branch: branch,
            date: date
        });


        const filteredData = data.filter(entry => {
            const entryInTime = new Date(`${date}T${entry.in_time}Z`);

            return entryInTime >= fromTime && entryInTime <= toTime;
        });


        const studentCount = filteredData.filter(entry => entry.designation === "Student").length;
        const staffCount = filteredData.filter(entry => entry.designation === "Staff").length;

        const result = {
            studentCount: studentCount,
            staffCount: staffCount
        };

        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});




module.exports = router