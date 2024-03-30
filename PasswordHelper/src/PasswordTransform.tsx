// passwordTransformer.ts
const transformPassword = (password: string): string => {
  // Transformation des Passworts basierend auf einer vordefinierten Regel
  // Hier wird das Passwort umgewandelt, indem das Zeichen 's' durch '5' und 'a' durch 'q' ersetzt wird.
  const transformedPassword = password.replace(/s/g, "5").replace(/a/g, "q");
  return transformedPassword;
};

export default transformPassword;
