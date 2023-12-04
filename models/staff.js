const mongoose = require("mongoose")

const staffSchema = new mongoose.Schema(
    {
        staffId: { type: String, required: true },
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        current_branch: { type: String, required: true },
        role: { type: String, required: true },
        // time_in: { type: Date, required: true },
        // time_out: { type: Date, required: true },
    }, { timestamps: true }
);

module.exports = mongoose.model("staff", staffSchema);