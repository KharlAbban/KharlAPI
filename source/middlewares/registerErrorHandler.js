function handleRegisterErrors(err) {
    // Create errors obj to return
    let errorsFound = {
      username: "",
      password: "",
      email: "",
    };
  
    // Handle duplicate email error
    if (err.code === 11000) {
      errorsFound.email = "Email already registered to a user!";
      return errorsFound;
    }
  
    //See if error var includes user validation failed
    //Object.values(object) takes an object and returns an array w/ values of the different keys inside
    //cycle thru array to retrieve the values needed
    //Destructure error to get properties
    if (err._message.includes("User validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        // Set values of items in errorsfound object
        errorsFound[properties.path] = properties.message;
      });
    }
    // Return errorsFound
    return errorsFound;
  }
  

  
  module.exports = {
      handleRegisterErrors
  }