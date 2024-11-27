// src/traits/color/colorTrait.js

// Import the Perlin noise library
import { Noise } from "noisejs";

// Initialize the SVG namespace
const SVG_NS = "http://www.w3.org/2000/svg";

// Create a Noise instance
const noiseInstance = new Noise(Math.random());

// Generate the Color trait (returns SVG as a string)
export function generateColorTrait() {
  // Generate the color using a complex algorithm
  const color = generateComplexColor();

  // Create the SVG as a string
  const svg = `
    <svg xmlns="${SVG_NS}" width="382" height="382" viewBox="0 0 382 382">
      <rect x="0" y="0" width="382" height="382" fill="${color}" />
    </svg>
  `;

  return svg; // Return the SVG as a string
}

// Complex color generation algorithm using Perlin noise
function generateComplexColor() {
  // Generate RGB values based on Perlin noise
  const x = Math.random() * 10000;
  const y = Math.random() * 10000;

  const r = Math.floor((noiseInstance.perlin2(x, y) + 1) * 127.5);
  const g = Math.floor((noiseInstance.perlin2(x + 1000, y + 1000) + 1) * 127.5);
  const b = Math.floor((noiseInstance.perlin2(x + 2000, y + 2000) + 1) * 127.5);

  return `rgb(${r}, ${g}, ${b})`;
}