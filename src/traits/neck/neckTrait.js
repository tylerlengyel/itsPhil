// Import Perlin noise library
import { Noise } from "noisejs";
import { Delaunay } from "d3-delaunay";

const SVG_NS = "http://www.w3.org/2000/svg";
const noiseInstance = new Noise(Math.random());

// Generate the Neck trait with confined path data
function generateTraitWithPathData(traitData, setCurrentQuote) {
  const { pathData, viewBox } = traitData;

  // Create the SVG element
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("width", "382");
  svg.setAttribute("height", "382");
  svg.setAttribute("viewBox", viewBox || "0 0 382 382");
  svg.setAttribute("xmlns", SVG_NS);

  // Create a Canvas to use isPointInPath for precise placement
  const canvas = document.createElement("canvas");
  canvas.width = 382;
  canvas.height = 382;
  const ctx = canvas.getContext("2d");
  const path = new Path2D(pathData);
  ctx.fill(path);

  // Generate a color palette
  const numColors = Math.floor(Math.random() * 3) + 1; // 1-3 colors
  const colorPalette = generateColorPalette(numColors);

  // Generate Voronoi diagram confined within the path
  const voronoiContent = generateVoronoiDiagram(ctx, path, colorPalette);

  // Append the generated content
  svg.innerHTML = voronoiContent;

  // Serialize the SVG and return as a string
  const serializer = new XMLSerializer();
  return serializer.serializeToString(svg);
}

// Generate Voronoi diagram within the path
function generateVoronoiDiagram(ctx, path, colorPalette) {
  const points = generateRandomPoints(50, 382, 382, ctx, path); // Generate 50 points
  const delaunay = Delaunay.from(points);
  const voronoi = delaunay.voronoi([0, 0, 382, 382]);

  let paths = "";
  for (let i = 0; i < points.length; i++) {
    const cell = voronoi.cellPolygon(i);
    if (cell) {
      const isInside = cell.every(([x, y]) => ctx.isPointInPath(path, x, y));
      if (!isInside) continue; // Skip cells partially outside the path

      const cellPath = cell.map(([x, y]) => `${x},${y}`).join(" ");
      const strokeColor = colorPalette[i % colorPalette.length];
      const fillColor = colorPalette[(i + 1) % colorPalette.length];

      paths += `
        <polygon points="${cellPath}" 
          stroke="${strokeColor}" 
          fill="${fillColor}" 
          fill-opacity="0.5" 
          stroke-width="1"
        />
      `;
    }
  }

  return paths;
}

// Generate random points within the path boundary
function generateRandomPoints(numPoints, width, height, ctx, path) {
  const points = [];
  while (points.length < numPoints) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    if (ctx.isPointInPath(path, x, y)) {
      points.push([x, y]);
    }
  }
  return points;
}

// Generate a color palette of specified size using Perlin noise
function generateColorPalette(numColors) {
  const palette = [];
  for (let i = 0; i < numColors; i++) {
    const color = generatePerlinColor();
    palette.push(color);
  }
  return palette;
}

// Generate a color using Perlin noise
function generatePerlinColor() {
  const x = Math.random() * 1000;
  const y = Math.random() * 1000;

  const r = Math.floor((noiseInstance.perlin2(x, y) + 1) * 127.5);
  const g = Math.floor((noiseInstance.perlin2(x + 1000, y + 1000) + 1) * 127.5);
  const b = Math.floor((noiseInstance.perlin2(x + 2000, y + 2000) + 1) * 127.5);

  return `rgb(${r}, ${g}, ${b})`;
}

// Export the function
export { generateTraitWithPathData };