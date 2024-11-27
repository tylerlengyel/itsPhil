export const generateTraitWithPathData = (pathData) => {
  try {
    const SVG_NS = "http://www.w3.org/2000/svg";

    // Create the SVG element
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("width", "382");
    svg.setAttribute("height", "382");
    svg.setAttribute("viewBox", pathData.viewBox || "0 0 382 382");
    svg.setAttribute("xmlns", SVG_NS);

    // Create defs for patterns or gradients
    const defs = document.createElementNS(SVG_NS, "defs");
    svg.appendChild(defs);

    // Randomly select a texture generator
    const textureFunctions = [
      generateBrightMetalTexture,
      generateEnhancedRusticTexture,
      generateShinyMetalTexture,
      generateScratchedMetalTexture,
    ];
    const randomTextureFunction =
      textureFunctions[Math.floor(Math.random() * textureFunctions.length)];
    const fillElement = randomTextureFunction();

    let fillId = "";
    if (fillElement instanceof SVGElement) {
      // Assign a unique ID to the texture
      fillId =
        fillElement.tagName + "-" + Math.random().toString(36).substr(2, 9);
      fillElement.setAttribute("id", fillId);
      defs.appendChild(fillElement);
    }

    // Create the TopJaw path and apply the texture
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", pathData.pathData);
    if (fillId) {
      path.setAttribute("fill", `url(#${fillId})`);
    } else {
      path.setAttribute("fill", fillElement);
    }
    path.setAttribute("stroke", "#000000");
    path.setAttribute("stroke-width", "1");
    svg.appendChild(path);

    return svg.outerHTML; // Return serialized SVG as a string
  } catch (error) {
    console.error("Error generating TopJaw trait:", error);
    throw new Error("Failed to generate SVG for TopJaw.");
  }
};

// Texture Generators

function generateBrightMetalTexture() {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const gradient = document.createElementNS(SVG_NS, "linearGradient");
  gradient.setAttribute("x1", "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "100%");
  gradient.setAttribute("y2", "0%");

  const colors = generateBrightMetalColors();
  colors.forEach((color, index) => {
    const stop = document.createElementNS(SVG_NS, "stop");
    stop.setAttribute("offset", `${(index / (colors.length - 1)) * 100}%`);
    stop.setAttribute("stop-color", color);
    gradient.appendChild(stop);
  });

  return gradient;
}

function generateEnhancedRusticTexture() {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const pattern = document.createElementNS(SVG_NS, "pattern");
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute("width", "30");
  pattern.setAttribute("height", "30");

  const baseColor = getRandomMetalBaseColor();
  const rect = document.createElementNS(SVG_NS, "rect");
  rect.setAttribute("width", "30");
  rect.setAttribute("height", "30");
  rect.setAttribute("fill", baseColor);
  pattern.appendChild(rect);

  const rustPatches = Math.floor(Math.random() * 5) + 3; // 3-7 patches
  for (let i = 0; i < rustPatches; i++) {
    const patch = document.createElementNS(SVG_NS, "circle");
    patch.setAttribute("cx", Math.random() * 30);
    patch.setAttribute("cy", Math.random() * 30);
    patch.setAttribute("r", Math.random() * 10 + 5);
    patch.setAttribute("fill", getRandomRustColor());
    patch.setAttribute("opacity", Math.random() * 0.5 + 0.5);
    pattern.appendChild(patch);
  }

  return pattern;
}

function generateShinyMetalTexture() {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const gradient = document.createElementNS(SVG_NS, "linearGradient");
  gradient.setAttribute("x1", "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "100%");
  gradient.setAttribute("y2", "0%");

  const colors = generateRandomMetalColors();
  colors.forEach((color, index) => {
    const stop = document.createElementNS(SVG_NS, "stop");
    stop.setAttribute("offset", `${(index / (colors.length - 1)) * 100}%`);
    stop.setAttribute("stop-color", color);
    gradient.appendChild(stop);
  });

  return gradient;
}

function generateScratchedMetalTexture() {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const pattern = document.createElementNS(SVG_NS, "pattern");
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute("width", "30");
  pattern.setAttribute("height", "30");

  const baseColor = getRandomMetalBaseColor();
  const rect = document.createElementNS(SVG_NS, "rect");
  rect.setAttribute("width", "30");
  rect.setAttribute("height", "30");
  rect.setAttribute("fill", baseColor);
  pattern.appendChild(rect);

  const scratches = Math.floor(Math.random() * 10) + 5;
  for (let i = 0; i < scratches; i++) {
    const line = document.createElementNS(SVG_NS, "line");
    line.setAttribute("x1", Math.random() * 30);
    line.setAttribute("y1", Math.random() * 30);
    line.setAttribute("x2", Math.random() * 30);
    line.setAttribute("y2", Math.random() * 30);
    line.setAttribute("stroke", darkenColor(baseColor, 50));
    line.setAttribute("stroke-width", Math.random() * 2 + 0.5);
    line.setAttribute("opacity", 0.5);
    pattern.appendChild(line);
  }

  return pattern;
}

// Utility Functions

function generateBrightMetalColors() {
  return ["#FFD700", "#FFC200", "#E6AC00"]; // Gold-like colors
}

function getRandomMetalBaseColor() {
  return "#D9D9D9"; // Light metallic gray
}

function getRandomRustColor() {
  return "#8B4513"; // Rusty brown
}

function generateRandomMetalColors() {
  return ["#D4D4D4", "#E0E0E0", "#B0B0B0"]; // Silver-like colors
}

function darkenColor(color, percent) {
  const rgb = parseInt(color.slice(1), 16); // Remove "#" and parse
  const r = Math.max(0, ((rgb >> 16) & 0xff) - percent);
  const g = Math.max(0, ((rgb >> 8) & 0xff) - percent);
  const b = Math.max(0, (rgb & 0xff) - percent);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}