// middleware.js
module.exports = (req, res, next) => {
  console.log("Request body in middleware:", req.body);

  const {
    firstName,
    lastName,
    licenseNumber,
    age,
    dob,
    "car_details.make": make,
    "car_details.model": model,
    "car_details.year": year,
    "car_details.plateNumber": plateNumber,
  } = req.body;

  console.log("firstName:", firstName);
  console.log("lastName:", lastName);
  console.log("license:", licenseNumber);
  console.log("age:", age);
  console.log("dob:", dob);
  console.log("make:", make);
  console.log("model:", model);
  console.log("year:", year);
  console.log("plate:", plateNumber);
  // Add similar log statements for other fields...

  if (
    !firstName ||
    !lastName ||
    !licenseNumber ||
    !age ||
    !dob ||
    !make ||
    !model ||
    !year ||
    !plateNumber
  ) {
    console.log("Validation failed. Redirecting to /G2");
    return res.redirect("/G2");
  }

  console.log("Validation passed. Proceeding to controller.");
  next();
};
