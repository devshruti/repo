const express = require("express");
const { userRouter } = require("./routes/user.routes");
const { connection } = require("./db");
const cors = require("cors");
const { carsRouter } = require("./routes/cars.routes");
require("dotenv").config()

const app = express();
app.use(cors())
app.use(express.json())

app.use("/", userRouter)
app.use("/cars", carsRouter)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log(`Running at port ${process.env.port}`)
        console.log("connected to the DB")
    } catch (err) {
        console.log(err)
        console.log("Something went wrong!")
    }
})