// Initialize the SVG namespace
const SVG_NS = "http://www.w3.org/2000/svg";

// Define the neon and dark colors directly in the script
const neonColors = [
    "#39FF14", "#FF073A", "#FF61F6", "#00FFFF", "#FFFF00", "#FF4500", "#FF1493",
    "#FF00FF", "#7FFF00", "#00FF7F", "#FFD700", "#FF6347", "#FF69B4", "#00FF00",
    "#32CD32", "#ADFF2F", "#00BFFF", "#FF00FF", "#F0E68C", "#FF7F50", "#FFA500",
    "#FF8C00", "#FFD700", "#1E90FF", "#00CED1", "#FF69B4", "#EE82EE", "#FFFFE0",
    "#7CFC00", "#66FF66", "#FF6347", "#FF4500", "#DC143C", "#FFB6C1", "#00FA9A",
    "#00FF7F", "#FFFF33", "#FFA07A", "#FF00FF", "#F08080", "#FF1493", "#FF69B4",
    "#00FFFF", "#FF6347", "#FF4500", "#FF6EB4", "#FF1493", "#FA8072", "#FF4500",
    "#FF00FF", "#FF8C00", "#FF6347", "#FFD700", "#32CD32", "#00FF7F", "#00FF00",
    "#00FA9A", "#7FFF00", "#ADFF2F", "#00CED1", "#00BFFF", "#00FFFF", "#1E90FF",
    "#6495ED", "#4169E1", "#7B68EE", "#9370DB", "#8A2BE2", "#4B0082", "#9400D3",
    "#9932CC", "#BA55D3", "#DDA0DD", "#EE82EE", "#DA70D6", "#FF00FF", "#FF1493",
    "#FF69B4", "#FFB6C1", "#FFA07A", "#FF6347", "#FF4500", "#FF7F50", "#FFD700",
    "#FFFF00", "#ADFF2F", "#7FFF00", "#00FF00", "#00FA9A", "#00FF7F", "#00FFFF",
    "#00BFFF", "#1E90FF", "#4169E1", "#7B68EE", "#8A2BE2", "#FF61F6"
];

const darkColors = [
    "#2F4F4F", "#3C3C3C", "#4B0082", "#5B5B5B", "#696969", "#2E2E2E", "#0C0C0C",
    "#1A1A1A", "#333333", "#2B2B2B", "#191970", "#000080", "#00008B", "#1C1C1C",
    "#2F2F2F", "#483D8B", "#2C2C2C", "#4A4A4A", "#3B3B3B", "#2A2A2A", "#1E1E1E",
    "#212121", "#323232", "#2D2D2D", "#282828", "#292929", "#343434", "#2C3E50",
    "#2B2B40", "#101010", "#0D0D0D", "#0F0F0F", "#111111", "#131313", "#151515",
    "#171717", "#191919", "#1B1B1B", "#1D1D1D", "#1F1F1F", "#252525", "#272727",
    "#3B3B3D", "#282A36", "#3D3D3D", "#3F3F3F", "#414141", "#434343", "#454545",
    "#474747", "#494949", "#4B4B4B", "#4D4D4D", "#4F4F4F", "#515151", "#535353",
    "#555555", "#575757", "#595959", "#5A5A5A", "#5C5C5C", "#5E5E5E", "#606060",
    "#626262", "#646464", "#666666", "#6B6B6B", "#6D6D6D", "#6F6F6F", "#707070",
    "#717171", "#737373", "#757575", "#787878", "#7A7A7A", "#7C7C7C", "#7E7E7E",
    "#808080", "#828282", "#848484", "#868686", "#888888", "#8A8A8A", "#8C8C8C",
    "#8F8F8F", "#919191", "#939393", "#959595", "#979797", "#999999", "#9B9B9B",
    "#9E9E9E", "#A0A0A0", "#A3A3A3", "#A5A5A5", "#A7A7A7", "#A9A9A9", "#ABABAB",
    "#ADADAD", "#AFAFAF", "#B1B1B1"
];

// Generate the Teeth trait with a solid dark color and sparkle effect
function generateTraitWithPathData(traitData) {
    try {
        const { pathData, viewBox } = traitData;

        // Create the SVG element
        const svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttribute('width', '382');
        svg.setAttribute('height', '382');
        svg.setAttribute('viewBox', viewBox || '0 0 382 382');
        svg.setAttribute('xmlns', SVG_NS);

        // Create the solid color background with sparkles
        const defs = document.createElementNS(SVG_NS, 'defs');
        const grillPattern = generateSolidColorPattern(darkColors, neonColors);
        const patternId = `pattern-${crypto.randomUUID()}`;
        grillPattern.setAttribute('id', patternId);
        defs.appendChild(grillPattern);
        svg.appendChild(defs);

        // Create the path element for the teeth trait
        const path = document.createElementNS(SVG_NS, 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', `url(#${patternId})`);
        path.setAttribute('stroke', 'none');
        svg.appendChild(path);

        // Serialize the SVG into a string
        const serializer = new XMLSerializer();
        return serializer.serializeToString(svg); // Return a resolved string
    } catch (error) {
        console.error('Error generating the teeth trait:', error);
        throw new Error('Failed to generate teeth trait.');
    }
}

// Generate a solid dark color pattern with sparkles
function generateSolidColorPattern(darkColors, neonColors) {
    const patternSize = 100;
    const pattern = document.createElementNS(SVG_NS, 'pattern');
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('width', patternSize);
    pattern.setAttribute('height', patternSize);

    const baseColor = darkColors[Math.floor(Math.random() * darkColors.length)];
    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('width', patternSize);
    rect.setAttribute('height', patternSize);
    rect.setAttribute('fill', baseColor);
    pattern.appendChild(rect);

    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElementNS(SVG_NS, 'circle');
        sparkle.setAttribute('cx', Math.random() * patternSize);
        sparkle.setAttribute('cy', Math.random() * patternSize);
        sparkle.setAttribute('r', Math.random() * 3 + 1);
        sparkle.setAttribute('fill', neonColors[Math.floor(Math.random() * neonColors.length)]);
        sparkle.setAttribute('opacity', '0.8');
        pattern.appendChild(sparkle);
    }

    return pattern;
}

// Export the function
export { generateTraitWithPathData };