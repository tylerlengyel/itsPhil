// TraitContext.js

import React, { createContext, useContext, useState } from "react";

const TraitContext = createContext();

export const useTraits = () => useContext(TraitContext);

export const TraitProvider = ({ children }) => {
  // Load initial state from localStorage or initialize an empty object
  const [traits, setTraits] = useState(() => {
    const savedTraits = localStorage.getItem("traits");
    return savedTraits ? JSON.parse(savedTraits) : {};
  });

  // Save trait and persist to localStorage
  const saveTrait = (traitName, hexData) => {
    setTraits((prevTraits) => {
      const updatedTraits = { ...prevTraits, [traitName]: hexData };
      localStorage.setItem("traits", JSON.stringify(updatedTraits)); // Save to localStorage
      return updatedTraits;
    });
  };

  // Clear all traits and localStorage
  const clearTraits = () => {
    setTraits({});
    localStorage.removeItem("traits");
  };

  return (
    <TraitContext.Provider value={{ traits, saveTrait, clearTraits }}>
      {children}
    </TraitContext.Provider>
  );
};