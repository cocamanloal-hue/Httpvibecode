module.exports = async (req, res) => {
  // 1. Executor Detection: Browsers don't send these headers
  const hwid = req.headers['fingerprint'] || req.headers['syn-fingerprint'] || req.headers['krnl-hwid'] || req.headers['exploit-guid'];
  
  if (!hwid) {
    return res.status(403).send("u don't have access");
  }

  const TARGET_GITHUB_URL = "https://raw.githubusercontent.com/cocamanloal-hue/Tt/refs/heads/main/Poop";

  try {
    const response = await fetch(TARGET_GITHUB_URL);
    const rawScript = await response.text();

    // Layer 1: Convert raw script to Base64
    const base64Script = Buffer.from(rawScript).toString('base64');
    
    // Layer 2: Substitution Map (Your gibberish cipher)
    // We dynamically generate the gibberish based on the character code so you don't need a massive dictionary.
    // E.g., 'A' becomes '65_JKASIWK_455!'
    let cipherText = "";
    for (let i = 0; i < base64Script.length; i++) {
      const char = base64Script[i];
      const charCode = char.charCodeAt(0);
      
      // Creates a unique gibberish string for every letter
      const gibberish = `${charCode}_JKASIWK_${charCode * 7}!`;
      cipherText += gibberish;
    }

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(cipherText);
    
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};
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
