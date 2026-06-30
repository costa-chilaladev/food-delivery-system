export function isPasswordAuth(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  const passwordVerified = passwordRegex.test(password);

  if (passwordVerified) return { result: true };

  const minLength = /^.{8,}$/;
  const hasLowercase = /[a-z]/;
  const hasUppercase = /[A-Z]/;
  const hasNumber = /\d/;
  const hasSymbol = /[^A-Za-z0-9]/;

  return {
    result: false,
    data: {
      minLength: { label: "at last 8 letters", value: minLength.test(password) },
      lowercase: {
        label: "at last one lowercase letter",
        value: hasLowercase.test(password),
      },
      uppercase: {
        label: "at last one uppercase letter",
        value: hasUppercase.test(password),
      },
      number: { label: "at last one number", value: hasNumber.test(password) },
      symbol: {
        label: "at last one special character",
        value: hasSymbol.test(password),
      },
    }
  };
}
