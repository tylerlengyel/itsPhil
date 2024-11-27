// src/traits/bg/bgTrait.js

const SVG_NS = "http://www.w3.org/2000/svg";

// Quotes array embedded directly in the script
const quotes = [
  "If code is law, who enforces it?",
  "Can you trust a trustless system?",
  "Is a private key still private if you forget it?",
  "Do decentralized networks centralize over time?",
  "If Bitcoin is unhackable, why secure it?",
  "Does owning crypto make you a miner or a speculator?",
  "If the blockchain is immutable, can it forget?",
  "Can an AI understand the value of scarcity?",
  "Is anonymity possible in a transparent ledger?",
  "If crypto crashes, does it make a sound?",
];

// A variety of colors to choose from
const darkAndNeonColors = [
  "#00ff00", "#ff00ff", "#00ffff", "#ff4500", "#ff6347",
  "#008000", "#1e90ff", "#ffd700", "#9400d3", "#f0e68c",
  "#dc143c", "#4b0082", "#7fff00", "#00fa9a", "#daa520",
];

// Generate the Background trait with falling crypto quotes
export function generateBgTrait() {
  // Create the SVG element
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("width", "382");
  svg.setAttribute("height", "382");
  svg.setAttribute("viewBox", "0 0 382 382");
  svg.setAttribute("xmlns", SVG_NS);

  // Create a group for Matrix-style text
  const codeGroup = document.createElementNS(SVG_NS, "g");
  svg.appendChild(codeGroup);

  // Get a random quote to use
  const quote = getRandomQuote();

  // Function to add falling Matrix-style characters
  const addMatrixCharacters = () => {
    codeGroup.innerHTML = ""; // Clear previous characters
    const color = getRandomColor();

    // Add each character of the quote at random positions
    for (let i = 0; i < quote.length; i++) {
      const x = Math.random() * 382; // Random horizontal position
      const y = Math.random() * 382 - 382; // Start above canvas

      const text = document.createElementNS(SVG_NS, "text");
      text.setAttribute("x", x);
      text.setAttribute("y", y);
      text.setAttribute("fill", color); // Single color for this generation
      text.setAttribute("font-family", "monospace");
      text.setAttribute("font-size", "14px");
      text.textContent = quote[i];
      codeGroup.appendChild(text);

      // Add animation to simulate falling
      const animate = document.createElementNS(SVG_NS, "animateTransform");
      animate.setAttribute("attributeName", "transform");
      animate.setAttribute("type", "translate");
      animate.setAttribute("from", `0 -${Math.random() * 382}`);
      animate.setAttribute("to", `0 ${382}`);
      animate.setAttribute("dur", `${Math.random() * 3 + 2}s`); // Random duration between 2-5s
      animate.setAttribute("repeatCount", "indefinite");
      text.appendChild(animate);
    }
  };

  addMatrixCharacters();

  // Serialize the SVG and return as a string
  const serializer = new XMLSerializer();
  return serializer.serializeToString(svg);
}

// Function to get a random quote
function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Function to get a random color
function getRandomColor() {
  return darkAndNeonColors[Math.floor(Math.random() * darkAndNeonColors.length)];
}