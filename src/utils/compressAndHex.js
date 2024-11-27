// src/utils/compressAndHex.js
import { compress, decompress } from "brotli-compress";

// Compress SVG string into a hexadecimal representation
export const compressAndHex = async (svgString) => {
  try {
    if (!svgString) throw new Error("SVG string is empty or undefined.");

    const input = new TextEncoder().encode(svgString); // Encode SVG to Uint8Array
    const compressed = await compress(input); // Compress using Brotli
    if (!compressed) throw new Error("Compression failed.");

    // Convert compressed data to hex
    const hex = Array.from(compressed)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return hex;
  } catch (error) {
    console.error("Error compressing and converting SVG to hexadecimal:", error);
    return null;
  }
};

// Decompress hexadecimal representation back into an SVG string
export const decompressHexToSVG = async (hexString) => {
  try {
    if (!hexString) throw new Error("Hexadecimal string is empty or undefined.");

    const compressed = new Uint8Array(
      hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
    ); // Convert hex to Uint8Array

    const decompressed = await decompress(compressed); // Decompress using Brotli
    if (!decompressed) throw new Error("Decompression failed.");

    const svgString = new TextDecoder().decode(decompressed); // Decode Uint8Array to string
    return svgString;
  } catch (error) {
    console.error("Error decompressing hexadecimal to SVG:", error);
    return null;
  }
};