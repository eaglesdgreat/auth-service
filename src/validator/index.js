
exports.passwordValidator = (password) => {
  const passwordTestResult = {
    message: "",
    isValid: true,
  }

  if (password.length < 8) {
    passwordTestResult.message = "Password must be at least 8 characters";
    passwordTestResult.isValid = false;

    return passwordTestResult;
  }

  const strongPassword = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  if (!strongPassword.test(password)) {
    passwordTestResult.message =
      "Password must contain at least 1 special character, 1 cap letter, 1 lowercase letter, and 1 number";
    passwordTestResult.isValid = false;
  }

  return passwordTestResult;
}

exports.emailValidator = (email) => {
  if (!email) return "Email cannot be empty.";
  
  if (!email.includes("@")) {
    return "Please enter a valid email address";
  }

  if (/\s+/g.test(email)) {
    return "Email cannot have white spaces";
  }

  return "";
}
