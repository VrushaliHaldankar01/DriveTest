// const DriveTest = require("../models/drivetest");
// module.exports = async (req, res) => {
//   try {
//     console.log("in gpage controller");
//     const drivetest = await DriveTest.findById(req.session.userId).exec();

//     console.log("gpage id1", drivetest);

//     if (drivetest) {
//       console.log("gpage id2", drivetest);
//       // If data is found, render a page with the data
//       res.render("G_page.ejs", { drivetest });
//     } else {
//       // If no data is found, render a page with a message
//       res.render("G_page.ejs", {
//         drivetest: [], // Provide an empty array since no data was found
//       });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("An error occurred.");
//   }
// };

//actual

// const DriveTest = require("../models/drivetest");

// module.exports = async (req, res) => {
//   try {
//     console.log("in gpage controller");
//     const drivetest = await DriveTest.findById(req.session.userId).exec();

//     console.log("gpage id1", drivetest);

//     if (drivetest) {
//       console.log("gpage id2", drivetest);
//       // If data is found, render a page with the data and set selectedDate to null
//       res.render("G_page.ejs", {
//         drivetest,
//         selectedDate: null,
//         bookedTimes: [],
//       });
//     } else {
//       // If no data is found, render a page with a message and set selectedDate to null
//       res.render("G_page.ejs", {
//         drivetest: [], // Provide an empty array since no data was found
//         selectedDate: null,
//       });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("An error occurred.");
//   }
// };

//end
// module.exports = (req, res) => {
//   res.render("G2_page.ejs");
// };

// const Appointment = require("../models/appointment");

// module.exports = async (req, res) => {
//   try {
//     const { date, times } = req.body;

//     // Check if the combination of date and time already exists
//     const existingAppointment = await Appointment.findOne({ date, times });
//     console.log("existing App", existingAppointment);

//     if (existingAppointment) {
//       // Handle duplicate appointment
//       console.error("Duplicate appointment:", existingAppointment);
//       res.redirect("/appointment");
//       return;
//     }

//     // If not a duplicate, proceed with insertion
//     const appointmentData = await Appointment.create({ date, times });
//     console.log("Appointment data", appointmentData);

//     // Use flash messages or send a response to indicate success
//     res.redirect("/"); // Redirect to home or another appropriate page
//   } catch (error) {
//     console.error("Error storing appointment:", error);
//     // Handle the error and redirect to the appointment page or another appropriate page
//     res.redirect("/appointment");
//   }
// };
const Appointment = require("../models/appointment");
const DriveTest = require("../models/drivetest");
module.exports = async (req, res) => {
  try {
    const storedata = await DriveTest.findById(req.session.userId).exec();
    console.log("storeee", storedata);

    // Retrieve availableTimes from your database or other data source
    const availableTimes = [
      "9:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ];

    // Extract the selected date from the request query parameters
    const selectedDate = req.body.date;

    return res.render("G_page.ejs", {
      availableTimes,
      bookedTimes: [],
      selectedDate: null,
      // storedata: "",
      storedata,
    });
  } catch (error) {
    console.error("Error fetching existing appointments:", error);
    res.redirect("/appointment");
  }
};
