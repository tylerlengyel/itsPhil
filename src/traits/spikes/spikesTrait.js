// spikesTrait.js

export const generateTraitWithPathData = (pathData) => {
  try {
    const SVG_NS = "http://www.w3.org/2000/svg";

    // Create the SVG element
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("width", "382");
    svg.setAttribute("height", "382");
    svg.setAttribute("viewBox", pathData.viewBox || "0 0 382 382");
    svg.setAttribute("xmlns", SVG_NS);

    // Create defs for patterns
    const defs = document.createElementNS(SVG_NS, "defs");
    svg.appendChild(defs);

    // Generate a rustic pattern with cracks
    const pattern = generateRusticPattern();
    const patternId = "pattern-" + Math.random().toString(36).substr(2, 9);
    pattern.setAttribute("id", patternId);
    defs.appendChild(pattern);

    // Create the Spikes path and apply the pattern
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", pathData.pathData);
    path.setAttribute("fill", `url(#${patternId})`);
    path.setAttribute("stroke", "#000000");
    path.setAttribute("stroke-width", "0.5");
    svg.appendChild(path);

    return svg.outerHTML; // Return serialized SVG
  } catch (error) {
    console.error("Error generating Spikes trait:", error);
    throw new Error("Failed to generate SVG for Spikes.");
  }
};

// Generate a rustic pattern with cracks
function generateRusticPattern() {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const patternSize = 60;
  const pattern = document.createElementNS(SVG_NS, "pattern");
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute("width", patternSize);
  pattern.setAttribute("height", patternSize);

  // Add a base rectangle with a solid color
  const rect = document.createElementNS(SVG_NS, "rect");
  rect.setAttribute("width", patternSize);
  rect.setAttribute("height", patternSize);
  rect.setAttribute("fill", getRandomRGBColor());
  pattern.appendChild(rect);

  // Add cracks with random lines
  const crackColor = getRandomRGBColor();
  for (let i = 0; i < 20; i++) {
    const path = document.createElementNS(SVG_NS, "path");

    // Generate a random crack path
    const xStart = Math.random() * patternSize;
    const yStart = Math.random() * patternSize;
    const xEnd = xStart + (Math.random() * 30 - 15);
    const yEnd = yStart + (Math.random() * 30 - 15);

    path.setAttribute("d", `M${xStart},${yStart} L${xEnd},${yEnd}`);
    path.setAttribute("stroke", crackColor);
    path.setAttribute("stroke-width", Math.random() * 1.5 + 0.5);
    pattern.appendChild(path);
  }

  return pattern;
}

// Generate a random RGB color
function getRandomRGBColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}