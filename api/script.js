// ============================================================
// PatternShift Cipher v1 — Vercel Serverless Endpoint
// ============================================================

const SECRET   = "Xk9$mPq2L7vRzN4wT8bC";      // 🔁 MUST match client EXACTLY
const ALPHABET = "QWEasdzxRTYuiophjkASDFG741LMNBV852lcXCvbnm963POIuyt-_qwer";
const GITHUB_RAW = "https://raw.githubusercontent.com/YOURNAME/YOURREPO/main/script.lua";

// --- Custom Base64 encoder (shuffled alphabet) --------------
function b64enc(bytes) {
  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const b1 = bytes[i] || 0, b2 = bytes[i+1] || 0, b3 = bytes[i+2] || 0;
    const n = (b1 << 16) | (b2 << 8) | b3;
    out += ALPHABET[(n >> 18) & 0x3F];
    out += ALPHABET[(n >> 12) & 0x3F];
    out += ALPHABET[(n >> 6)  & 0x3F];
    out += ALPHABET[ n        & 0x3F];
  }
  return out;
}

// --- PatternShift encrypt -----------------------------------
function encrypt(plain) {
  const seed = Math.floor(Math.random() * 0xFFFFFF); // changes EVERY request
  const enc  = [];
  let sum = 0;

  for (let i = 0; i < plain.length; i++) {
    const p = plain.charCodeAt(i);
    sum = (sum + p) % 0xFFFFFF;

    // Rolling key: depends on SECRET + SEED + POSITION
    const keyByte = (SECRET.charCodeAt(i % SECRET.length) + seed + i * 7) & 0xFF;

    // XOR + position shift
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
