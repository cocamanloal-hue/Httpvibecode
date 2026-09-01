module.exports = async (req, res) => {
  const TARGET_GITHUB_URL = "https://raw.githubusercontent.com/cocamanloal-hue/Tt/refs/heads/main/Poop";

  // Check headers to block web browsers and direct hits
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();
  const hwid = req.headers['x-hwid'];
  const fingerprint = req.headers['x-fingerprint'];

  if (!hwid || !fingerprint || userAgent.includes("mozilla") || userAgent.includes("chrome") || userAgent.includes("safari")) {
    res.setHeader("Content-Type", "text/plain");
    return res.status(403).send("u don't have access ok");
  }

  try {
    const response = await fetch(TARGET_GITHUB_URL);
    if (!response.ok) {
      return res.status(500).send("Error fetching script source");
    }

    const rawScript = await response.text();
    let cipherOutput = "";

    // Positional multi-layer character transformation
    for (let i = 0; i < rawScript.length; i++) {
      const charCode = rawScript.charCodeAt(i);

      // Layer 1 & 2: Positional index shift + XOR transformation
      const shifted = (charCode + (i * 13) + 37) % 256;
      const xorByte = shifted ^ ((i % 17) + 89);

      // Final Layer: Hex encoding (guarantees valid UTF-8/ASCII)
      cipherOutput += xorByte.toString(16).padStart(2, '0');
    }

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    return res.status(200).send(cipherOutput);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
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
