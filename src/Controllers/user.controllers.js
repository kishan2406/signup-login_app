

const express  = require("express");

const UserModel = require("../Models/user.models")
const authenticate = require("../MIddelware/authenticate")
const authorise = require("../MIddelware/authorise")
const router = express.Router()

router.get("", authenticate, authorise(["admin"]), async(req, res)=>{
    try{
        const user = await UserModel.find()
        // .lean().exec();
        return res.status(200).send(user)
    }
    catch(err){
        return res.status(400).send({message: err.message})
    }
})

module.exports = router;

