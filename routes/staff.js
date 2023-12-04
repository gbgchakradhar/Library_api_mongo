const Staff = require("../models/staff")
const router = require("express").Router()

// register
router.post("/register", async (req, res) => {
    const newStaff = new Staff(req.body);
    try {
        const savedStaff = await newStaff.save()
        res.status(200).json(savedStaff)
    }
    catch (err) {
        res.status(501).json(err)
    }
})

//get all
router.get("/:id", async (req, res) => {
    try {
        const staffDetails = await Staff.findOne()
        res.status(200).json(staffDetails)
    } catch (err) {
        res.status(500).json(err);
    }
})
//get
router.get("/:id", async (req, res) => {
    try {
        const staffDetails = await Staff.find(

            { "staffId": req.params.id }
        )
        res.status(200).json(staffDetails)
    } catch (err) {
        res.status(500).json(err);
    }
})
// update
router.put("/:id", async (req, res) => {
    try {
        const updatedStaff = await Staff.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedStaff);
    } catch (err) {
        res.status(500).json(err);
    }
})


// delete
router.delete("/:id", async (req, res) => {
    try {
        await Staff.findByIdAndDelete(req.params.id);
        res.status(200).json("Staff has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router