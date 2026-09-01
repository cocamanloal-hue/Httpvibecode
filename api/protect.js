module.exports = async (req, res) => {
  const TARGET_GITHUB_URL = "https://raw.githubusercontent.com/cocamanloal-hue/Tt/refs/heads/main/Poop";

  // Access Control & Browser Block
  const userAgent = req.headers["user-agent"] || "";
  const hwid = req.headers["x-hwid"] || req.query.hwid;
  const fingerprint = req.headers["x-fingerprint"] || req.query.fingerprint;

  const isBrowser = userAgent.includes("Mozilla") || userAgent.includes("Chrome") || userAgent.includes("Safari");

  if (isBrowser || !hwid || !fingerprint) {
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send("u don't have access");
  }

  try {
    const response = await fetch(TARGET_GITHUB_URL);
    if (!response.ok) {
      res.setHeader("Content-Type", "text/plain");
      return res.status(200).send("u don't have access");
    }

    const rawScript = await response.text();
    const encodedBytes = [];
    const seed = 42;

    for (let i = 0; i < rawScript.length; i++) {
      const charCode = rawScript.charCodeAt(i);

      // Layer 1: Positional character shift
      const layer1 = (charCode + (i * 7) + seed) % 256;

      // Layer 2: Positional XOR mask
      const layer2 = layer1 ^ ((i % 13) + 101);

      encodedBytes.push(layer2);
    }

    // Layer 3: Convert byte array to Base64 (Prevents Luau UTF-8 errors)
    const buffer = Buffer.from(encodedBytes);
    const finalCiphertext = buffer.toString("base64");

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    return res.status(200).send(finalCiphertext);
  } catch (err) {
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send("u don't have access");
  }
};
