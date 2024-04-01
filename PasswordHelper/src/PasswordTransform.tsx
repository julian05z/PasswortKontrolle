const transformPassword = (password: string): string => {
  // Hier wird das Passwort umgewandellt.
  const transformedPassword = password
    .replace(/s/g, "5")
    .replace(/a/g, "q")
    .replace(/i/g, "¦");
  return transformedPassword;
};

export default transformPassword;
