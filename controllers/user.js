// // const User = require("../models/user");
// const User = require("../models/user"); // importing the User model
// module.exports.renderSignupForm = (req, res) => {
//   res.render("users/signup.ejs");
// };

// module.exports.signup = async (req, res) => {
//   try {
//     let { username, email, password } = req.body;
//     const newUser = new User({ email, username });
//     const registerUser = await User.register(newUser, password);
//     console.log(registerUser);
//     req.login(registerUser, (err) => {
//       if (err) {
//         return next(err);
//       }
//       console.log(err);
//       req.flash("success", "Welcome to wanderlust!");
//       res.redirect("/listings");
//     });
//   } catch (e) {
//     req.flash("error", e.message);
//     res.redirect("/signup");
//   }
// };

// module.exports.renderLoginForm = (req, res) => {
//   res.render("users/login.ejs");
// };

// module.exports.login = async (req, res) => {
//   req.flash("success", "Welcome to wanderlust ! You are logged In !");
//   let redirectUrl = res.locals.redirectUrl || "/listings";
//   res.redirect(redirectUrl);
// };

// module.exports.logout = (req, res) => {
//   req.logout(function (err) {
//     if (err) {
//       console.log(err);
//     }
//     req.flash("success", "Logged Out Successfully!");
//     res.redirect("/listings");
//   });
// };

const User = require("../Models/user");

// Render signup form
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// Handle signup logic
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log("User Registered:", registeredUser);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// Render login form
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// Handle login
module.exports.login = (req, res) => {
  req.flash("success", "Welcome to Wanderlust! You are logged in!");
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// Handle logout
module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return res.redirect("/listings");
    }
    req.flash("success", "Logged out successfully!");
    res.redirect("/listings");
  });
};
