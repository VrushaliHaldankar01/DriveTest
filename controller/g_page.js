const Appointment = require('../models/appointment');
const DriveTest = require('../models/drivetest');
module.exports = async (req, res) => {
  try {
    const storedata = await DriveTest.findById(req.session.userId).exec();
    console.log('storeee', storedata);

    // Retrieve availableTimes from your database or other data source
    const availableTimes = [
      '9:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
    ];

    // Extract the selected date from the request query parameters
    const selectedDate = req.body.date;

    return res.render('G_page.ejs', {
      availableTimes,
      bookedTimes: [],
      selectedDate: null,
      // storedata: "",
      storedata,
    });
  } catch (error) {
    console.error('Error fetching existing appointments:', error);
    res.redirect('/appointment');
  }
};
