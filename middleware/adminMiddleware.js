// const DriveTest = require("../models/drivetest");

// module.exports = async (req, res, next) => {
//   try {
//     const user = await DriveTest.findById(req.session.userId).exec();
//     console.log("userid", user);

//     if (!user) {
//       // Handle the case where the user is not found
//       console.log("User not found in the database.");
//       res.redirect("/login");
//     }
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred while checking the user session");
//   }
// };
const DriveTest = require("../models/drivetest");

module.exports = async (req, res, next) => {
  try {
    const user = await DriveTest.findById(req.session.userId).exec();
    console.log("userid", user);

    if (user && req.session.userType == "Admin") {
      // Handle the case where the user is not found
      next();
    } else {
      console.log("User not found in the database.");
      return res.redirect("/login");
    }

    // Send a response only if the user is found
    // next();
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in user session middleware:", error);

    // Handle the error by sending an appropriate response to the client
    res.status(500).send("An error occurred while checking the user session");
  }
};
