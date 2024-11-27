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

    // Add more pattern functions for variety
    const patternFunctions = [
      generateScalePattern,
      generateFurPattern,
      generateAbstractPattern,
      generateStripedPattern,
    ];
    const randomPatternFunction =
      patternFunctions[Math.floor(Math.random() * patternFunctions.length)];
    console.log("Selected Pattern Function:", randomPatternFunction.name);
    const fillElement = randomPatternFunction();

    let fillId = "";
    if (fillElement instanceof SVGElement) {
      fillId =
        fillElement.tagName + "-" + Math.random().toString(36).substr(2, 9);
      fillElement.setAttribute("id", fillId);
      defs.appendChild(fillElement);
    }

    // Create the PhilBody path and apply the fill
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", pathData.pathData);
    if (fillId) {
      path.setAttribute("fill", `url(#${fillId})`);
    } else {
      path.setAttribute("fill", "#cccccc"); // Fallback solid color
    }
    path.setAttribute("stroke", "#000000");
    path.setAttribute("stroke-width", "1");
    svg.appendChild(path);

    // Return serialized SVG string
    return svg.outerHTML;
  } catch (error) {
    console.error("Error generating PhilBody trait:", error);
    throw new Error("Failed to generate SVG for PhilBody.");
  }
};

// Enhanced Pattern Functions
function generateScalePattern() {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const pattern = document.createElementNS(SVG_NS, "pattern");
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute("width", "30");
  pattern.setAttribute("height", "30");

  const rect = document.createElementNS(SVG_NS, "rect");
  rect.setAttribute("width", "30");
  rect.setAttribute("height", "30");
  rect.setAttribute("fill", getRandomColor());
  pattern.appendChild(rect);

  const circle = document.createElementNS(SVG_NS, "circle");
  circle.setAttribute("cx", "15");
  circle.setAttribute("cy", "15");
  circle.setAttribute("r", Math.random() * 10 + 5); // Randomize radius
  circle.setAttribute("fill", getRandomColor());
  pattern.appendChild(circle);

  return pattern;
}

function generateFurPattern() {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const pattern = document.createElementNS(SVG_NS, "pattern");
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute("width", "10");
  pattern.setAttribute("height", "10");

  const rect = document.createElementNS(SVG_NS, "rect");
  rect.setAttribute("width", "10");
  rect.setAttribute("height", "10");
  rect.setAttribute("fill", getRandomColor());
  pattern.appendChild(rect);

  return pattern;
}

function generateAbstractPattern() {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const pattern = document.createElementNS(SVG_NS, "pattern");
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute("width", "50");
  pattern.setAttribute("height", "50");

  const rect = document.createElementNS(SVG_NS, "rect");
  rect.setAttribute("width", "50");
  rect.setAttribute("height", "50");
  rect.setAttribute("fill", getRandomColor());
  pattern.appendChild(rect);

  for (let i = 0; i < 10; i++) {
    const circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttribute("cx", Math.random() * 50);
    circle.setAttribute("cy", Math.random() * 50);
    circle.setAttribute("r", Math.random() * 10);
    circle.setAttribute("fill", getRandomColor());
    circle.setAttribute("opacity", Math.random());
    pattern.appendChild(circle);
  }

  return pattern;
}

function generateStripedPattern() {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const pattern = document.createElementNS(SVG_NS, "pattern");
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute("width", "20");
  pattern.setAttribute("height", "20");

  for (let i = 0; i < 10; i++) {
    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("width", "20");
    rect.setAttribute("height", "2");
    rect.setAttribute("y", i * 2);
    rect.setAttribute("fill", getRandomColor());
    pattern.appendChild(rect);
  }

  return pattern;
}

// Helper Function for Random Colors
function getRandomColor() {
  const colors = ["#FF6347", "#32CD32", "#4682B4", "#FFD700", "#FF4500"];
  return colors[Math.floor(Math.random() * colors.length)];
}