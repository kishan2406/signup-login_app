const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// hashing the password
userSchema.pre("save", function (next) {
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  return next();
});

//comparing the previous and current password
userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;
