export const generateRandomPassword = (): string => {
  const specialCharacters = '!@#$%^&*(),.?":{}|<>';

  const getRandomChar = (charset: string): string => {
    const randomIndex = Math.floor(Math.random() * charset.length);
    return charset.charAt(randomIndex);
  };

  const randomPassword = (): string => {
    const randomNumber = getRandomChar('0123456789');
    const randomSpecialChar = getRandomChar(specialCharacters);
    const randomLetter = getRandomChar(
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    );

    // Concatenate the random characters
    return `${randomNumber}${randomSpecialChar}${randomLetter}`;
  };

  let password = '';
  // Generate the remaining characters randomly
  for (let i = 0; i < 5; i++) {
    password += randomPassword();
  }

  return password.substring(0, 8);
};
