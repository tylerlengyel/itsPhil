import Brotli from "brotli-wasm";

async function testBrotli() {
  try {
    const brotli = await Brotli();
    console.log("Brotli module initialized successfully:", brotli);
  } catch (error) {
    console.error("Failed to initialize Brotli module:", error);
  }
}

testBrotli();