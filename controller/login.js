module.exports = (req, res) => {
  res.render("login.ejs", {
    // errors: req.session.validationErrors,
    errors: req.flash("validationErrors"),
    flash: req.flash(), // Pass the entire flash object
  });
};
