const Branch = require("../models/branch")
const router = require("express").Router()

// register
router.post("/register", async (req, res) => {
    const newBranch = new Branch(req.body);
    try {
        const savedBranch = await newBranch.save()
        res.status(200).json(savedBranch)
    }
    catch (err) {
        res.status(501).json(err)
    }
})


//get all
router.get("/:id", async (req, res) => {
    try {
        const branchDetails = await Branch.find()
        res.status(200).json(branchDetails)
    } catch (err) {
        res.status(500).json(err);
    }
})
//get
router.get("/:id", async (req, res) => {
    try {
        const branchDetails = await Branch.findOne(

            { "branchId": req.params.id }
        )
        res.status(200).json(branchDetails)
    } catch (err) {
        res.status(500).json(err);
    }
})

// update
router.put("/:id", async (req, res) => {
    try {
        const updatedBranch = await Branch.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedBranch);
    } catch (err) {
        if (err.name === 'ValidationError') {
            // Handle Mongoose validation errors separately
            return res.status(422).json(err.errors);
        }
        console.error(err);
        res.status(500).json(err);
    }
});



// delete
router.delete("/:id", async (req, res) => {
    try {
        await Branch.findByIdAndDelete(req.params.id);
        res.status(200).json("Branch has been deleted...");
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

module.exports = router