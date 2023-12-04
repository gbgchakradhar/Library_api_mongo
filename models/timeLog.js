const mongoose = require("mongoose")

const timeSchema = new mongoose.Schema(
    {
        designation: { type: String, required: true },
        Id: { type: String, required: true },
        branch: { type: String, required: true },
        date: { type: Date, required: true },
        in_time: { type: String },
        out_time: { type: String }

    }
);

module.exports = mongoose.model("time", timeSchema);