import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import leakedPasswords, { checkLeaks } from "./passwordUtils";
import PasswordCrackTime from "./PasswordCrackTime";
import transformPassword from "./PasswordTransform";

import "./index.css";

function generateRandomString(length: number): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }
  return randomString;
}

const App: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [leaked, setLeaked] = useState<boolean>(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const checkPasswordStrength = (password: string) => {
    // Funktion zur Überprüfung der Passwortstärke hier implementieren
    // Dies ist ein einfaches Beispiel, das nur die Länge überprüft
    if (password.length >= 8) {
      setPasswordStrength("sicher");
    } else {
      setPasswordStrength("unsicher");
    }
  };

  const generatePassword = () => {
    // Funktion zur automatischen Passwortgenerierung hier implementieren
    // Dies ist ein einfaches Beispiel, das ein zufälliges Passwort generiert
    const transformedPassword = transformPassword(password);
    setPassword(transformedPassword);
    setPasswordStrength("sicher");
  };

  const handleCheckLeaks = () => {
    const isLeaked = checkLeaks(password);
    setLeaked(isLeaked);
  };

  const toggleTips = () => {
    setShowTips(!showTips);
    if (showTips) {
      setSuggestions([]);
    } else {
      const tips = [
        "Tipp 1: Verwenden Sie eine Kombination aus Buchstaben, Zahlen und Sonderzeichen.",
        "Tipp 2: Verwenden Sie kein leicht zu erratendes Passwort.",
      ];
      setSuggestions(tips);
    }
  };

  return (
    <div className="container">
      <h1>Passwort Checker</h1>
      <input
        type="string"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Geben Sie Ihr Passwort ein"
      />
      <p>Passwortstärke: {passwordStrength}</p>
      {suggestions.length > 0 && (
        <div>
          <h3>Passwort Tipps:</h3>
          <ul>
            {suggestions.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={generatePassword}>Passwort umwandeln</button>
      <button onClick={toggleTips}>
        {showTips ? "Tipps verstecken" : "Passwort Tipps anzeigen"},
      </button>
      <button onClick={handleCheckLeaks}>Passwort auf Leaks überprüfen</button>
      {leaked ? (
        <p style={{ color: "red" }}>Das eingegebene Passwort wurde geleakt!</p>
      ) : (
        <p style={{ color: "green" }}>
          Das eingegebene Passwort wurde nicht geleakt!
        </p>
      )}
      {password && <PasswordCrackTime password={password} />}
    </div>
  );
};

export default App;

// Beispielaufruf
const generatedPassword = generateRandomString(12);
console.log(generatedPassword);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
