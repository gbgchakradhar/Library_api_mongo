
const Time = require("../models/timeLog")

const router = require("express").Router()

//in time 
router.post("/", async (req, res) => {
    const newLog = new Time(req.body);
    try {
        const savedLog = await newLog.save()
        res.status(200).json(savedLog)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})
//out time 
router.put("/", async (req, res) => {

    try {
        const updatedLog = await Time.findOneAndUpdate(
            { Id: req.body.Id, designation: req.body.designation },
            req.body,
            { new: true }
        );

        res.status(200).json(updatedLog)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router

