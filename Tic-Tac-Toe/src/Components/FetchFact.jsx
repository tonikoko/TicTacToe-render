export const fetchFact = async () => {
  try {
    const response = await fetch(
      "https://uselessfacts.jsph.pl/random.json?language=de"
    );
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error fetching fact:", error);
    return "Fakten konnten nicht geladen werden.";
  }
};
