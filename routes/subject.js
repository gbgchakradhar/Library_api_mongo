const Subject = require("../models/subject")
const router = require("express").Router()

// register
router.post("/register", async (req, res) => {
    const newSubject = new Subject(req.body);
    try {
        const savedStaff = await newSubject.save()
        res.status(200).json(savedStaff)
    }
    catch (err) {
        res.status(501).json(err)
    }
})

//get
router.get("/:id", async (req, res) => {
    try {
        const subjectDetails = await Subject.findOne(

            { "subjectId": req.params.id }
        )
        res.status(200).json(subjectDetails)
    } catch (err) {
        res.status(500).json(err);
    }
})

//get all
router.get("/", async (req, res) => {
    try {
        const subjectDetails = await Subject.find(


        )
        res.status(200).json(subjectDetails)
    } catch (err) {
        res.status(500).json(err);
    }
})

// update
router.put("/:id", async (req, res) => {
    try {
        const updatedSubject = await Subject.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedSubject);
    } catch (err) {
        res.status(500).json(err);
    }
})


// delete
router.delete("/:id", async (req, res) => {
    try {
        await Subject.findByIdAndDelete(req.params.id);
        res.status(200).json("Subject has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router