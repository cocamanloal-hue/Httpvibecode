module.exports = async (req, res) => {
  const TARGET_GITHUB_URL = "https://raw.githubusercontent.com/cocamanloal-hue/Tt/refs/heads/main/Poop";

  try {
    const response = await fetch(TARGET_GITHUB_URL);
    if (!response.ok) {
      return res.status(500).send("Error loading source script");
    }

    const rawScript = await response.text();
    const encodedBytes = [];
    const seed = 42;

    for (let i = 0; i < rawScript.length; i++) {
      const charCode = rawScript.charCodeAt(i);

      // Layer 1: Index-dependent character shift
      const layer1 = (charCode + (i * 7) + seed) % 256;

      // Layer 2: Positional XOR mask pattern
      const layer2 = layer1 ^ ((i % 13) + 101);

      encodedBytes.push(layer2);
    }

    // Layer 3: Base64 encoding
    const buffer = Buffer.from(encodedBytes);
    const finalCiphertext = buffer.toString("base64");

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    return res.status(200).send(finalCiphertext);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
