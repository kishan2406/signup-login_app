 // Authentication will check user is signed in or not

require("dotenv").config()
const jwt  = require("jsonwebtoken")

const verifyToken = (token)=>{
    return new Promise((resolve, reject)=>{

        var decodedResult = jwt.verify(token, process.env.secretKey, (err, decoded)=>{
            if(err) return reject(err);
    
            return resolve(decoded);
        })

    })
    
}

const authenticate = async(req, res, next)=>{
    if(!req.headers.authorization)
        return res.status(400).send({message: "Authhrization token is not found or incorrect"})
    
    if(!req.headers.authorization.startsWith("Bearer "))
        return res.status(400).send({message: "Autorization token not found or incorrect"})
   
    const token = req.headers.authorization.trim().split(" ")[1]
    
    let decoded;
    try{
        decoded = await verifyToken(token)
    }
     catch(err){
        console.log(err)
        return res.status(400).send({message: "Autorization token not found or incorrect"})
     }
   
     console.log(decoded)
     req.userID = decoded.user._id;
     req.user = decoded.user
     return next()
    
}
module.exports = authenticate;
