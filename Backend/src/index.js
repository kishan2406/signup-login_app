const express = require("express")

const userController = require("./Controllers/user.controllers")
const {register, login} = require("./Controllers/auth.controllers")

const app = express()

app.use(express.json())

app.use("/admin", userController)

app.post("/register",register)

app.post("/login",login)

app.get("/", (req, res)=>{
    return res.status(200).send("welcome")
})


module.exports = app;
