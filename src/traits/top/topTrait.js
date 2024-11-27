const SVG_NS = "http://www.w3.org/2000/svg";

export const generateTraitWithPathData = (pathData) => {
  const { pathData: d, viewBox } = pathData;

  // Create the SVG element
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("width", "382");
  svg.setAttribute("height", "382");
  svg.setAttribute("viewBox", viewBox || "0 0 382 382");
  svg.setAttribute("xmlns", SVG_NS);

  // Create defs and append to svg
  const defs = document.createElementNS(SVG_NS, "defs");
  svg.appendChild(defs);

  // Randomly select between graffiti and paint splatter styles
  const styleFunctions = [generateGraffitiStyle, generatePaintSplatterStyle];
  const randomStyleFunction = styleFunctions[Math.floor(Math.random() * styleFunctions.length)];
  const fillElement = randomStyleFunction();

  let fillId = "";
  if (fillElement instanceof SVGElement) {
    fillId = fillElement.tagName + "-" + Math.random().toString(36).substr(2, 9);
    fillElement.setAttribute("id", fillId);
    defs.appendChild(fillElement);
  }

  // Create the Top path and apply the fill
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", d);
  path.setAttribute("fill", fillId ? `url(#${fillId})` : "none");
  path.setAttribute("stroke", "#000000");
  path.setAttribute("stroke-width", "1");

  svg.appendChild(path);

  // Return the SVG as a string
  return svg.outerHTML;
};

// Generate graffiti style pattern
export const generateGraffitiStyle = () => {
  const pattern = document.createElementNS(SVG_NS, "pattern");
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute("width", "382");
  pattern.setAttribute("height", "382");

  const wallColor = getRandomColor();
  const rect = document.createElementNS(SVG_NS, "rect");
  rect.setAttribute("width", "382");
  rect.setAttribute("height", "382");
  rect.setAttribute("fill", wallColor);
  pattern.appendChild(rect);

  const graffiti = createGraffitiElement();
  pattern.appendChild(graffiti);

  return pattern;
};

// Generate paint splatter style pattern
export const generatePaintSplatterStyle = () => {
  const pattern = document.createElementNS(SVG_NS, "pattern");
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute("width", "382");
  pattern.setAttribute("height", "382");

  const canvasColor = getRandomColor();
  const rect = document.createElementNS(SVG_NS, "rect");
  rect.setAttribute("width", "382");
  rect.setAttribute("height", "382");
  rect.setAttribute("fill", canvasColor);
  pattern.appendChild(rect);

  return pattern;
};

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.random() * 50 + 50;
  const lightness = Math.random() * 60 + 20;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const createGraffitiElement = () => {
  const group = document.createElementNS(SVG_NS, "g");

  const x = Math.random() * 300 + 20;
  const y = Math.random() * 300 + 20;

  const text = document.createElementNS(SVG_NS, "text");
  text.setAttribute("x", x);
  text.setAttribute("y", y);
  text.setAttribute("fill", getRandomColor());
  text.setAttribute("font-size", "40");
  text.setAttribute("font-family", "sans-serif");
  text.setAttribute("font-weight", "bold");

  const graffitiWord = "graffiti"; // Replace with a dynamic word generator if needed
  text.textContent = graffitiWord;

  group.appendChild(text);

  return group;
};