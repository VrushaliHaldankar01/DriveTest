const DriveTest = require("../models/drivetest");
const bcrypt = require("bcrypt");
const Appointment = require("../models/appointment");
const appointment = require("./appointment");

module.exports = async (req, res) => {
  const storedata = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    licenseNumber: req.body.licenseNumber,
    age: req.body.age,
    dob: req.body.dob,
    make: req.body["car_details.make"],
    model: req.body["car_details.model"],
    year: req.body["car_details.year"],
    plateNumber: req.body["car_details.plateNumber"],
    testtype: "G2",
  };
  console.log("storedata", storedata);
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

  const selectedTimes = req.body.times || [];
  const selectedTimesArray = Array.isArray(selectedTimes)
    ? selectedTimes
    : [selectedTimes];

  try {
    const selectedDate = req.body.date;
    console.log("sssss", selectedDate);

    if (selectedDate) {
      const startOfDay = new Date(selectedDate);
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const existingAppointments = await Appointment.find({
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
        isTimeSlotAvailable: true,
      });

      if (existingAppointments.length > 0) {
        const bookedTimes = existingAppointments
          .map((appointment) => appointment.times)
          .flat();

        console.log("Booked Times:", existingAppointments);
        // console.log("Booked id:", bookedTimes[0]._id);

        // Render the page synchronously
        res.render("G2_page.ejs", {
          bookedTimes: bookedTimes,
          selectedDate: selectedDate,
          storedata: storedata,
          // formData: storedata,
        });

        // console.log("formdata", formData);
        await executeAfterRendering(req, res, req.session.userId, selectedDate);
      } else {
        res.render("G2_page.ejs", {
          bookedTimes: "",
          selectedDate: selectedDate,
          storedata: storedata,
        });
      }
    } else {
      console.log("no selected date");
      console.log("user id in no selected date", req.session.userId);
      const hashedLicenseNumber = await hashLicenseNumber(
        storedata.licenseNumber
      );

      // Update DriveTest with the appointmentId
      await findAndUpdateById(
        req.session.userId,
        {
          ...storedata,
          licenseNumber: hashedLicenseNumber,
        },
        null
      );
      res.redirect("/G");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred.");
  }
};

async function executeAfterRendering(req, res, userId, selectedDate) {
  const storedata = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    licenseNumber: req.body.licenseNumber,
    age: req.body.age,
    dob: req.body.dob,
    make: req.body["car_details.make"],
    model: req.body["car_details.model"],
    year: req.body["car_details.year"],
    plateNumber: req.body["car_details.plateNumber"],
  };

  console.log("Processing selected time:");
  const selectedTimes = req.body.times || [];
  const selectedTimesArray = Array.isArray(selectedTimes)
    ? selectedTimes
    : [selectedTimes];

  const savedAppointments = [];

  for (const selectedTime of selectedTimesArray) {
    console.log("Processing selected time:", selectedTime);

    try {
      // Check if an appointment exists for the selected date and time
      const existingAppointment = await Appointment.findOne({
        date: selectedDate,
        times: selectedTime,
        isTimeSlotAvailable: true,
      });

      if (existingAppointment) {
        // If an appointment exists, update it
        existingAppointment.isTimeSlotAvailable = false;
        const updatedAppointment = await existingAppointment.save();
        savedAppointments.push(updatedAppointment);
        console.log("Updated appointment:", updatedAppointment);
      } else {
        // If no appointment exists, create a new one
        const newAppointment = new Appointment({
          date: selectedDate,
          times: [selectedTime],
          isTimeSlotAvailable: false,
        });

        console.log("New appointment created:", newAppointment);

        const savedAppointment = await newAppointment.save();
        savedAppointments.push(savedAppointment);
        console.log("Saved appointment:", savedAppointment);
      }
    } catch (error) {
      console.error("Error saving/updating appointment:", error);
    }
  }

  // Hash the licenseNumber
  const hashedLicenseNumber = await hashLicenseNumber(storedata.licenseNumber);

  // Update DriveTest with the appointmentId
  await findAndUpdateById(
    userId,
    {
      ...storedata,
      licenseNumber: hashedLicenseNumber,
    },
    savedAppointments.length > 0 ? savedAppointments[0]._id : null
  );
}

async function hashLicenseNumber(licenseNumber) {
  // Check if licenseNumber is defined before hashing
  if (licenseNumber) {
    // Use bcrypt to hash the licenseNumber
    return bcrypt.hash(licenseNumber, 10);
  } else {
    // Handle the case where licenseNumber is not defined
    throw new Error("License number is undefined");
  }
}

// async function findAndUpdateById(dataid, storedata, appointmentid) {
//   try {
//     // Find the existing appointment by ID

//     const updatedDriveTest = await DriveTest.findByIdAndUpdate(
//       dataid,
//       {
//         firstName: storedata.firstName,
//         lastName: storedata.lastName,
//         licenseNumber: storedata.licenseNumber,
//         age: storedata.age,
//         dob: storedata.dob,
//         car_details: {
//           make: storedata.make,
//           model: storedata.model,
//           year: storedata.year,
//           plateNumber: storedata.plateNumber,
//         },
//         appointmentId: appointmentid,
//       },
//       { new: true }
//     );

//     console.log("updated data", updatedDriveTest);
//     return updatedDriveTest;
//   } catch (error) {
//     console.log(error);
//     // Handle the error as needed
//     throw error;
//   }
// }

async function findAndUpdateById(dataid, storedata, appointmentid) {
  try {
    // Find the existing appointment by ID

    const updateObject = {
      firstName: storedata.firstName,
      lastName: storedata.lastName,
      licenseNumber: storedata.licenseNumber,
      age: storedata.age,
      dob: storedata.dob,
      testtype: "G2",
      car_details: {
        make: storedata.make,
        model: storedata.model,
        year: storedata.year,
        plateNumber: storedata.plateNumber,
      },
    };

    // Conditionally add appointmentId if it's truthy, otherwise set it to null
    if (appointmentid) {
      updateObject.appointmentId = appointmentid;
    } else {
      updateObject.appointmentId = null; // or 0 depending on your requirements
    }

    const updatedDriveTest = await DriveTest.findByIdAndUpdate(
      dataid,
      updateObject,
      { new: true }
    );

    console.log("updated data", updatedDriveTest);
    return updatedDriveTest;
  } catch (error) {
    console.log(error);
    // Handle the error as needed
    throw error;
  }
}
