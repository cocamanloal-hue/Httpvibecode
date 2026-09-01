export default async function handler(req, res) {
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

      // Layer 1: Index-dependent character shift (makes identical letters output differently)
      const layer1 = (charCode + (i * 7) + seed) % 256;

      // Layer 2: Positional XOR mask pattern
      const layer2 = layer1 ^ ((i % 13) + 101);

      encodedBytes.push(layer2);
    }

    // Layer 3: Convert resulting byte array to Base64
    const buffer = Buffer.from(encodedBytes);
    const finalCiphertext = buffer.toString("base64");

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    return res.status(200).send(finalCiphertext);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
}
    const xored = p ^ keyByte;
    const e     = (xored + i * 3) & 0xFF;
    enc.push(e);
  }

  // Hide the seed: XOR seed's 6 bytes with first 6 bytes of SECRET (hex)
  let seedHex = "";
  for (let i = 0; i < 6; i++) {
    const sb = (seed >> (i * 8)) & 0xFF;
    const kb = SECRET.charCodeAt(i % SECRET.length);
    seedHex += (sb ^ kb).toString(16).padStart(2, "0");
  }

  const checkHex = sum.toString(16).padStart(6, "0");
  const body     = b64enc(enc);

  // Wrap in fake Lua assignment so HTTP spy thinks it's just obfuscated code
  const fakeNames = ["Loadsting","_xQ","zZ_data","obj_ref","__p9"];
  const nm = fakeNames[Math.floor(Math.random()*fakeNames.length)];
  return `local ${nm} = "${seedHex}${checkHex}${body}";`;
}

// --- Handler ------------------------------------------------
export default async function handler(req, res) {
  // Optional: lock down with a token in headers
  const token = req.headers["x-load-key"];
  if (token !== "executor-v1-key-9281") {
    // Send decoy junk to anyone sniffing
    return res.status(200).send('local _ = "A82LSSS#POla';  // <- this is the "weird shit" you wanted ;)
  }

  try {
    const r = await fetch(GITHUB_RAW, { cache: "no-store" });
    if (!r.ok) return res.status(200).send('local _ = "A82LSSS#POla');
    const plain = await r.text();

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).send(encrypt(plain));
  } catch (e) {
    res.status(200).send('local _ = "A82LSSS#POla');
  }
      }
