const Student = require("../models/student")
const router = require("express").Router()

// register
router.post("/register", async (req, res) => {
    const newStudent = new Student(req.body);
    try {
        const savedStudent = await newStudent.save()
        res.status(200).json(savedStudent)
    }
    catch (err) {
        res.status(501).json(err)
    }
})

//get all
router.get("/", async (req, res) => {
    try {
        const studentDetails = await Student.find()
        res.status(200).json(studentDetails)
    } catch (err) {
        res.status(500).json(err);
    }
})
//get
router.get("/:id", async (req, res) => {
    try {
        const studentDetails = await Student.findOne(

            { "studentId": req.params.id }
        )
        res.status(200).json(studentDetails)
    } catch (err) {
        res.status(500).json(err);
    }
})

// update
router.put("/:id", async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(500).json(err);
    }
})


// delete
router.delete("/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json("Student has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router