const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  password: { type: String },
  profilePic: String,
  email: String,
  phone: String,
});

UserSchema.pre("save", function (next) {
  const user = this;
  // only hash the password if it has been modified or is new
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (saltError, salt) {
    if (saltError) return next(saltError);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (hashErorr, hash) {
      if (hashErorr) return next(hashErorr);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (
  candidatePassword,
  password,
  cb
) {
  bcrypt.compare(candidatePassword, password, function (err, isMatch) {
    
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;
