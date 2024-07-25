export const validatePassword = (password: string) => {
    const tempPasswordState: string[] = [];
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const length = password.length;

    if (!hasNumber) tempPasswordState.push("no number in password provided");
    if (!hasUppercase)
      tempPasswordState.push("no uppercase letter in password provided");
    if (!hasLowercase)
      tempPasswordState.push("no lowercase letter in password provided");
    if (length < 8)
      tempPasswordState.push("password is less than 8 characters");

    return tempPasswordState;
  };