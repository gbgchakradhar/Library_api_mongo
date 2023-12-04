const mongoose = require("mongoose")
// const moment = require('moment');
const studentSchema = new mongoose.Schema(

    {
        studentId: { type: String, required: true },
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        books_availed: [
            {
                bookId: { type: String, required: true },
                branchId: { type: String, required: true },
                availed_date: { type: Date, required: true },
                return_date: { type: Date, required: true },
                availed_time: { type: String, required: true },
                return_time: { type: String, required: true },

            }

        ],
    }, { timestamps: true }
);
module.exports = mongoose.model("student", studentSchema);