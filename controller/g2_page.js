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

module.exports = async (req, res) => {
  try {
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
    // console.log("selected date", selectedDate);
    // if (selectedDate) {
    //   // Set the start and end of the day for the selected date
    //   const startOfDay = new Date(selectedDate);
    //   const endOfDay = new Date(selectedDate);
    //   endOfDay.setHours(23, 59, 59, 999);

    //   // Fetch existing appointments for the selected date
    //   const existingAppointments = await Appointment.find({
    //     date: {
    //       $gte: startOfDay,
    //       $lte: endOfDay,
    //     },
    //   });
    //   if (existingAppointments) {
    //     const bookedTimes = existingAppointments
    //       .map((appointment) => appointment.times)
    //       .flat();

    //     // Render the appointment form with available and booked times
    //     return res.render("G2_page.ejs", {
    //       availableTimes,
    //       bookedTimes,
    //       selectedDate,
    //     });
    //   } else {
    //     const appointmentData = await Appointment.create({ date, times });
    //     //     console.log("Appointment data", appointmentData);
    //   }
    //   // Extract booked times from existing appointments
    // }

    // Render the appointment form with available times and no booked times initially
    return res.render("G2_page.ejs", {
      availableTimes,
      bookedTimes: [],
      selectedDate: null,
      storedata: "",
    });
  } catch (error) {
    console.error("Error fetching existing appointments:", error);
    res.redirect("/appointment");
  }
};
