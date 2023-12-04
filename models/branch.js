const mongoose = require("mongoose")

const branchSchema = new mongoose.Schema(
    {
        branchId: { type: String, required: true },
        location: { type: String, required: true },
        capacity: { type: Number, required: true },
        book: [
            {
                bookId: { type: String, required: true },
                subjects: [
                    { type: String, required: true }
                ],
            }

        ],
        staff: [
            {
                staffId: { type: String, required: true },
            }
        ],
    }
);

module.exports = mongoose.model("branch", branchSchema);