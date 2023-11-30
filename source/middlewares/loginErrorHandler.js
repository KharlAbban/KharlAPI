function handleLoginErrors(err) {
    // Create errors obj to return
    let errorsFound = {
      email: "",
      password: "",
    };
  
    // Set Error Values
    if (err.message === "No user found with this email address!") {
      errorsFound.email = "No user found with this email address!";
    }
    if (err.message === "Incorrect Password!") {
      errorsFound.email = "Incorrect Password!";
    }
    // Return errorsFound
    return errorsFound;
}
module.exports = {
    handleLoginErrors
}