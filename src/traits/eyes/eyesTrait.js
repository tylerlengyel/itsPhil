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

    // Randomly select a fill style
    const fillFunctions = [
      generateSolidColorFill,
      generateAbstractPattern,
      generateGradientFill,
      generateRadialGradientFill,
      generatePolkaDotPattern,
      generateConcentricCirclesPattern,
    ];
    const randomFillFunction =
      fillFunctions[Math.floor(Math.random() * fillFunctions.length)];
    const fillElement = randomFillFunction();

    let fillId = "";
    if (fillElement instanceof SVGElement) {
      // Assign a unique ID to the texture
      fillId =
        fillElement.tagName + "-" + Math.random().toString(36).substr(2, 9);
      fillElement.setAttribute("id", fillId);
      defs.appendChild(fillElement);
    }

    // Create the Eyes path and apply the texture
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", pathData.pathData);
    if (fillId) {
      path.setAttribute("fill", `url(#${fillId})`);
    } else {
      path.setAttribute("fill", fillElement); // For solid colors
    }
    path.setAttribute("stroke", "#000000");
    path.setAttribute("stroke-width", "1");
    svg.appendChild(path);

    return svg.outerHTML; // Return the serialized SVG as a string
  } catch (error) {
    console.error("Error generating Eyes trait:", error);
    throw new Error("Failed to generate SVG for Eyes.");
  }
};

// Fill Style Generators

function generateSolidColorFill() {
  return getRandomHexColor();
}

function generateAbstractPattern() {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const pattern = document.createElementNS(SVG_NS, "pattern");
  const size = Math.floor(Math.random() * 50) + 50;
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute("width", size);
  pattern.setAttribute("height", size);

  // Add base rectangle
  const rect = document.createElementNS(SVG_NS, "rect");
  rect.setAttribute("width", size);
  rect.setAttribute("height", size);
  rect.setAttribute("fill", getRandomHexColor());
  pattern.appendChild(rect);

  // Add random shapes
  const shapeCount = Math.floor(Math.random() * 20) + 10;
  for (let i = 0; i < shapeCount; i++) {
    const shapeType = Math.random() < 0.5 ? "circle" : "rect";
    const shape = document.createElementNS(SVG_NS, shapeType);

    if (shapeType === "circle") {
      shape.setAttribute("cx", Math.random() * size);
      shape.setAttribute("cy", Math.random() * size);
      shape.setAttribute("r", Math.random() * (size / 4));
    } else {
      shape.setAttribute("x", Math.random() * size);
      shape.setAttribute("y", Math.random() * size);
      shape.setAttribute("width", Math.random() * (size / 2));
      shape.setAttribute("height", Math.random() * (size / 2));
    }

    shape.setAttribute("fill", getRandomHexColor());
    pattern.appendChild(shape);
  }

  return pattern;
}

function generateGradientFill() {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const gradient = document.createElementNS(SVG_NS, "linearGradient");
  gradient.setAttribute("x1", "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "100%");
  gradient.setAttribute("y2", "0%");

  const stop1 = document.createElementNS(SVG_NS, "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", getRandomHexColor());
  gradient.appendChild(stop1);

  const stop2 = document.createElementNS(SVG_NS, "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", getRandomHexColor());
  gradient.appendChild(stop2);

  return gradient;
}

function generateRadialGradientFill() {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const gradient = document.createElementNS(SVG_NS, "radialGradient");
  gradient.setAttribute("cx", "50%");
  gradient.setAttribute("cy", "50%");
  gradient.setAttribute("r", "50%");

  const stop1 = document.createElementNS(SVG_NS, "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", getRandomHexColor());
  gradient.appendChild(stop1);

  const stop2 = document.createElementNS(SVG_NS, "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", getRandomHexColor());
  gradient.appendChild(stop2);

  return gradient;
}

function generatePolkaDotPattern() {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const pattern = document.createElementNS(SVG_NS, "pattern");
  const size = Math.floor(Math.random() * 20) + 20;
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute("width", size);
  pattern.setAttribute("height", size);

  const rect = document.createElementNS(SVG_NS, "rect");
  rect.setAttribute("width", size);
  rect.setAttribute("height", size);
  rect.setAttribute("fill", getRandomHexColor());
  pattern.appendChild(rect);

  const circle = document.createElementNS(SVG_NS, "circle");
  circle.setAttribute("cx", size / 2);
  circle.setAttribute("cy", size / 2);
  circle.setAttribute("r", Math.random() * 5 + 5);
  circle.setAttribute("fill", getRandomHexColor());
  pattern.appendChild(circle);

  return pattern;
}

function generateConcentricCirclesPattern() {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const pattern = document.createElementNS(SVG_NS, "pattern");
  const size = Math.floor(Math.random() * 50) + 50;
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute("width", size);
  pattern.setAttribute("height", size);

  for (let i = 0; i < 5; i++) {
    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("cx", size / 2);
    circle.setAttribute("cy", size / 2);
    circle.setAttribute("r", (size / 2) - i * (size / 10));
    circle.setAttribute("fill", getRandomHexColor());
    pattern.appendChild(circle);
  }

  return pattern;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;
}