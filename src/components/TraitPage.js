import React, { useState, useEffect } from "react";
import { useTraits } from "../contexts/TraitContext";
import { compressAndHex } from "../utils/compressAndHex";

// Traits that require JSON path data
const traitsWithPathData = ["spikes", "philBody", "teeth", "topJaw", "eyes", "top", "neck"];

const TraitPage = ({ traitName, nextPath }) => {
  const [svg, setSvg] = useState(null); // Store the generated SVG
  const [currentQuote, setCurrentQuote] = useState(""); // Store the current quote for the neck trait
  const { saveTrait } = useTraits(); // React Context to save the generated trait

  useEffect(() => {
    // Reset the SVG and current quote whenever the trait changes
    setSvg(null);
    setCurrentQuote("");
  }, [traitName]);

  const handleGenerate = async () => {
    try {
      const requiresPathData = traitsWithPathData.includes(traitName);
      let pathData = null;

      // Force the `Neck` trait to load `Top.json` path data
      const jsonFileName = traitName === "neck" ? "Top" : traitName.charAt(0).toUpperCase() + traitName.slice(1);

      if (requiresPathData) {
        const response = await fetch(`/traits_json/${jsonFileName}.json`);
        if (!response.ok) {
          throw new Error("Unable to fetch path data.");
        }
        const data = await response.json();
        pathData = data;
      }

      // Dynamically import the trait module
      const traitModule = await import(`../traits/${traitName}/${traitName}Trait`);
      const generateFunctionName = requiresPathData
        ? "generateTraitWithPathData"
        : `generate${traitName.charAt(0).toUpperCase() + traitName.slice(1)}Trait`;

      // Call the appropriate function from the module
      const generateFunction = traitModule[generateFunctionName];
      if (!generateFunction) {
        throw new Error(`Function ${generateFunctionName} not found in ${traitName}Trait module`);
      }

      const generatedSvg = requiresPathData
        ? generateFunction(pathData, setCurrentQuote) // Pass setCurrentQuote to update the quote
        : generateFunction();
      if (!generatedSvg) {
        throw new Error(`Failed to generate SVG for ${traitName}.`);
      }
      setSvg(generatedSvg); // Set the generated SVG in state
    } catch (error) {
      console.error(`Error generating ${traitName}:`, error);
    }
  };

  const handleSave = async () => {
    if (!svg) {
      console.error("No SVG generated to save!");
      return;
    }

    // Compress and convert the SVG to hexadecimal
    try {
      const hexData = await compressAndHex(svg);

      if (!hexData) {
        throw new Error("Failed to compress SVG to hexadecimal.");
      }

      // Save the compressed hexadecimal to the React Context
      saveTrait(traitName, hexData);
      console.log(`${traitName} saved successfully.`);
    } catch (error) {
      console.error("Error compressing and saving the SVG:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>{traitName.charAt(0).toUpperCase() + traitName.slice(1)}</h2>
      <button onClick={handleGenerate} style={{ margin: "10px", padding: "10px" }}>
        Generate
      </button>
      {currentQuote && (
        <p style={{ marginTop: "10px", fontStyle: "italic", color: "#007bff" }}>
          Quote: "{currentQuote}"
        </p>
      )}
      <div
        id={`${traitName}-trait-image`}
        style={{
          width: "382px",
          height: "382px",
          margin: "auto",
          border: "1px solid #ccc",
        }}
      >
        {svg && <div dangerouslySetInnerHTML={{ __html: svg }}></div>}
      </div>
      <button onClick={handleSave} style={{ margin: "10px", padding: "10px" }}>
        Save
      </button>
      {nextPath && (
        <a
          href={nextPath}
          style={{
            display: "inline-block",
            margin: "20px",
            padding: "10px",
            backgroundColor: "forestgreen",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          Next
        </a>
      )}
    </div>
  );
};

export default TraitPage;