import React, { useState, useEffect } from "react";
import "/src/App.css";
import { fetchFact } from "./FetchFact";

const WaitingScreen = () => {
  const [fact, setFact] = useState("");

  useEffect(() => {
    const loadFact = async () => {
      const randomFact = await fetchFact();
      setFact(randomFact);
    };

    loadFact();

    const intervalId = setInterval(() => {
      loadFact();
    }, 10000);
  }, []);

  return (
    <div className="waiting">
      <p>Wir suchen einen Gegner...</p>
      <p className="fakten-text">
        <b>Fakt:</b> {fact}
      </p>
    </div>
  );
};

export default WaitingScreen;
