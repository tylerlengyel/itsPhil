// src/utils/compressAndHex.js
import { compress } from "brotli-compress";

export const compressAndHex = async (svgString) => {
  try {
    if (!svgString) {
      throw new Error("SVG string is empty or undefined.");
    }

    console.log("Original SVG String:", svgString);

    // Convert the SVG string into a Uint8Array
    const input = new TextEncoder().encode(svgString);
    console.log("Encoded SVG as Uint8Array:", input);

    // Compress the SVG using Brotli (await the Promise)
    const compressed = await compress(input);

    if (!compressed) {
      throw new Error("Compression failed.");
    }

    console.log("Compressed Data:", compressed);

    // Convert compressed data to hexadecimal format
    const hex = Array.from(compressed)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    console.log("Hexadecimal Output:", hex);
    return hex;
  } catch (error) {
    console.error("Error compressing and converting SVG to hexadecimal:", error);
    return null; // Return null if an error occurs
  }
};