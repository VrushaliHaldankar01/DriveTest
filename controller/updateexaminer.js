const DriveTest = require("../models/drivetest");

module.exports = async (req, res) => {
  try {
    const dataid = req.body._id;
    const storedata = {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      plateNumber: req.body.plateNumber,
    };

    // Retrieve Pass/Fail and comments from the form
    const testResult = req.body.testResult;
    const comments = req.body.comments;

    // Update the DriveTest document
    const updatedDriveTest = await findAndUpdateById(
      dataid,
      storedata,
      testResult,
      comments
    );

    // Render the updated data with appointment details
    res.render("examiner.ejs", { drivetest: [updatedDriveTest] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred.");
  }
};

async function findAndUpdateById(dataid, storedata, testResult, comments) {
  try {
    const updatedDriveTest = await DriveTest.findByIdAndUpdate(
      dataid,
      {
        firstName: storedata.firstName,
        lastName: storedata.lastName,
        licenseNumber: storedata.licenseNumber,
        age: storedata.age,
        dob: storedata.dob,
        car_details: {
          make: storedata.make,
          model: storedata.model,
          year: storedata.year,
          plateNumber: storedata.plateNumber,
        },
        // Update Pass/Fail and comments
        testResult: testResult,
        comments: comments,
      },
      { new: true }
    ).populate("appointmentId"); // Use populate to include appointment details

    console.log("updated data", updatedDriveTest);
    return updatedDriveTest;
  } catch (error) {
    console.log(error);
  }
}
