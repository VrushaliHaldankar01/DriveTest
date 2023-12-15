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
    const selectedDate = req.query.date;

    if (selectedDate) {
      // Set the start and end of the day for the selected date
      const startOfDay = new Date(selectedDate);
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      // Fetch existing appointments for the selected date
      const existingAppointments = await Appointment.find({
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

      // Extract booked times from existing appointments
      const bookedTimes = existingAppointments
        .map((appointment) => appointment.times)
        .flat();

      // Render the appointment form with available and booked times
      return res.render("appointment.ejs", {
        availableTimes,
        bookedTimes,
        selectedDate,
      });
    }

    // Render the appointment form with available times and no booked times initially
    return res.render("appointment.ejs", {
      availableTimes,
      bookedTimes: [],
      selectedDate: null,
    });
  } catch (error) {
    console.error("Error fetching existing appointments:", error);
    res.redirect("/appointment");
  }
};
