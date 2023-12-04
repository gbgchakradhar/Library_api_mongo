const mongoose = require("mongoose")

const bookSchema = mongoose.Schema(
    {
        bookId: { type: String, required: true },
        name: { type: String, required: true },
        total_copies: { type: Number, required: true },
        available_copies: { type: Number, required: true },

        subject: [
            {
                subject_name: { type: String, required: true }
            }
        ]
    }, { timestamps: true }
);

module.exports = mongoose.model("book", bookSchema);