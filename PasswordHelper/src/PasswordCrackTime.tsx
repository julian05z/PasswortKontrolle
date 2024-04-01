import React from "react";

const PasswordCrackTime: React.FC<{ password: string }> = ({ password }) => {
  const calculateCrackTime = (password: string): string => {
    // Annahme: Ein Angreifer kann 10 Milliarden Passwörter pro Sekunde ausprobieren
    const guessesPerSecond = 10_000_000_000;

    const passwordLength = password.length;

    const characterSetSize = 94;

    // Berechnung der Anzahl der Zeichen in jedem Zeichensatz
    const lowerCaseLetters = /[a-z]/.test(password) ? 26 : 0;
    const upperCaseLetters = /[A-Z]/.test(password) ? 26 : 0;
    const numbers = /\d/.test(password) ? 10 : 0;
    const specialCharacters = /[^a-zA-Z0-9]/.test(password) ? 32 : 0;

    const usedCharacterSetSize =
      lowerCaseLetters + upperCaseLetters + numbers + specialCharacters;

    const possibilities =
      BigInt(usedCharacterSetSize) ** BigInt(passwordLength);

    const timeInSeconds = possibilities / BigInt(guessesPerSecond);

    const timeInYears = Number(timeInSeconds) / (60 * 60 * 24 * 365);

    return timeInYears >= 1
      ? `${timeInYears.toFixed(2)} Jahre`
      : `weniger als ein Jahr`;
  };

  return (
    <p>
      Geschätzte Zeit zum Knacken des Passworts: {calculateCrackTime(password)}
    </p>
  );
};

export default PasswordCrackTime;
