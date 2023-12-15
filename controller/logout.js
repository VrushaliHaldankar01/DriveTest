module.exports = async (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("unable to log out");
      } else {
        res.render("login");
      }
    });
  } else {
    res.end();
  }
};
