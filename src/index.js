const express = require("express")

const connect = require("./Configs/db")

const userController = require("./Controllers/user.controllers")
const {register, login} = require("./Controllers/auth.controllers")

const app = express()

app.use(express.json())

app.use("/admin", userController)

app.post("/register",register)

app.post("/login",login)





app.listen(5000, async () =>{
     
    try{
         await connect();
    console.log("listening on port 5000")

    }catch(err){
        console.log(err.message)
    }
})


// module.exports = app;
