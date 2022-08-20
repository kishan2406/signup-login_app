const UserModel = require("../Models/user.models");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ user }, "secretKey");
};
// var newToken = jwt.sign({user}, "secretKey");

const register = async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });

    //checking email
    if (user) {
      return res.status(400).send({ message: "Email already exists" });
    }
    // if new user, create it or allow to register;
    user = await UserModel.create(req.body);

    const token = generateToken(user);

    return res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
   
    // check email is exists or not
    if (!user) {
      return res.status(400).send("Wrong either email or password");
    }
     
    // if email is correct, check password
    const match = user.checkPassword(req.body.password);

    // if password is not correct then
    if (!match) {
      res.status(400).send({ message: "Wrong either email or password" });
    }

    //if password is correct
    const token = generateToken(user);
    return res.status(200).send({ user, token });
  
} catch(err) {
      res.status(400).send({message: err.message})
}
};
module.exports = { register, login };
