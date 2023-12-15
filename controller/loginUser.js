const DriveTest = require("../models/drivetest");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const { Username, password } = req.body;
  try {
    const user = await DriveTest.findOne({ Username: Username }).exec();
    console.log("user", user);

    if (user) {
      const same = await bcrypt.compare(password, user.password);
      console.log("same", same);

      if (same) {
        req.session.userId = user._id.toString();
        // const userId = user._id;
        req.session.userType = user.UserType;
        console.log("req.session.userId", req.session.userId);
        console.log("req.session.userType", req.session.userType);
        res.redirect("/");
      } else {
        req.flash("loginError", "Invalid username or password");
        res.redirect("/login");
      }
    } else {
      console.log("erro in login");
      // res.redirect("/login");
      req.flash("switchToRegister", true);
      req.flash("registerError", "User not found. Please register.");
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during login");
  }
};
