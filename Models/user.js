// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const passportlocalMongoose = require("passport-local-mongoose");

// const userSchem = new Schema({
//   email: {
//     type: String,
//     require: true,
//   },
// });

// userSchem.plugin(passportlocalMongoose);

// module.exports = mongoose.model("User", userSchem)

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // spelling fixed
  },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
