const mongoose = require("mongoose");
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

    // Extract the selected date and time from the form submission
    const selectedDate = req.body.date;
    console.log("selected date", selectedDate);
    let selectedTimes = req.body.times || [];

    // Ensure selectedTimes is an array
    if (!Array.isArray(selectedTimes)) {
      selectedTimes = [selectedTimes];
    }

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

      if (existingAppointments) {
        const bookedTimes = existingAppointments
          .map((appointment) => appointment.times)
          .flat();

        // Check if the selected times are not booked
        const unbookedTimes = selectedTimes.filter(
          (time) => !bookedTimes.includes(time)
        );

        // Store each unbooked time individually
        for (const time of unbookedTimes) {
          const appointmentData = await Appointment.create({
            date: selectedDate,
            times: [time],
          });

          console.log("Appointment data stored:", appointmentData);
        }

        // Render the appointment form with available and booked times
        return res.render("appointment.ejs", {
          availableTimes,
          bookedTimes,
          selectedDate,
        });
      }
    }

    // Render the appointment form with available times and no booked times initially
    res.render("appointment.ejs", {
      availableTimes,
      bookedTimes: [],
      selectedDate: null,
    });
  } catch (error) {
    console.error("Error handling form submission:", error);
    res.redirect("/appointment");
  }
};
