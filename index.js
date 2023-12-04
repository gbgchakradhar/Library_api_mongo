const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors");

const bookRoute = require("./routes/book")
const branchRoute = require("./routes/branch")
const staffRoute = require("./routes/staff")
const studentRoute = require("./routes/student")
const subjectRoute = require("./routes/subject")
const monitorRoute = require("./routes/monitor")
const operationRoute = require("./routes/operations")

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("Db connxn Success"); })
    .catch((err) => { console.log(err); });

app.use(cors());
app.use(express.json())
app.listen(process.env.PORT || 5000, () => { console.log("Backend server is Running"); })
app.get('/', (req, res) => { res.send("this is home") })

app.use("/api/book", bookRoute);
app.use("/api/branch", branchRoute);
app.use("/api/staff", staffRoute);
app.use("/api/student", studentRoute);
app.use("/api/subject", subjectRoute);
app.use("/api/monitor", monitorRoute);
app.use("/api/operation", operationRoute);
