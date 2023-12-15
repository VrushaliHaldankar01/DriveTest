const DriveTest = require("../models/drivetest");

module.exports = async (req, res) => {
  try {
    const testTypeFilter = req.query.testTypeFilter;
    const query = testTypeFilter ? { testResult: testTypeFilter } : {};

    // Populate the appointmentId field to get the appointment details
    const drivetest = await DriveTest.find(query).populate("appointmentId");

    if (drivetest.length > 0) {
      res.render("appointment.ejs", {
        drivetest,
        availableTimes: [],
        bookedTimes: [],
        selectedDate: null,
      });
    } else {
      res.render("appointment.ejs", {
        drivetest: [],
        availableTimes: [],
        bookedTimes: [],
        selectedDate: null,
      });
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("An error occurred while retrieving data.");
  }
};
