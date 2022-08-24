const mongoose = require("mongoose")


module.exports = () => {

    return mongoose.connect(
        "mongodb+srv://kishan141:pW6MetCnpudV210S@cluster0.yjxak.mongodb.net/?retryWrites=true&w=majority"
        ).then(console.log("mongoDB is conntected"))
}

