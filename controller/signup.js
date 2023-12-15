const DriveTest = require("../models/drivetest");

module.exports = async (req, res) => {
  const { Username } = req.body;

  // Check if the username already exists
  const existingUser = await DriveTest.findOne({ Username });

  if (existingUser) {
    // User with the same username already exists
    req.flash("validationErrors", ["Username is already taken"]);
    return res.redirect("/login"); // Redirect to the registration page with an error message
  }
  try {
    const userpost = DriveTest.create({ ...req.body });
    res.redirect("/login");
    // Rest of your code
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessage = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      console.error(errorMessage);
      req.flash("validationErrors", errorMessage);
    } else {
      console.error(error.message);
    }

    res.status(500).send("An error occurred.");
  }
};
