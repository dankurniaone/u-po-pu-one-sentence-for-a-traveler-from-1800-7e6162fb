// One Sentence for a Traveler from 1800
// Writes a single sentence explaining the modern internet to a person
// from 1800, built only from things they already know: a road, a post
// office, a library. No word in it was coined after their time.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const SENTENCE =
  "Imagine every library and post office in the world joined by one road, so a letter you send is answered before the ink dries and any book you ask for opens at once.";

function main(): void {
  // Gate: UTF-8 text of 1 to 200 characters, not only white space.
  // The scorer counts characters, so check both the character length
  // and the byte length (they must agree here: the sentence is pure
  // ASCII, so a multi-byte surprise would mean the text was corrupted).
  if (SENTENCE.length < 1 || SENTENCE.length > 200) {
    throw new Error(`sentence must be 1-200 characters, got ${SENTENCE.length}`);
  }
  if (Buffer.byteLength(SENTENCE, "utf8") !== SENTENCE.length) {
    throw new Error("sentence must be plain ASCII so chars and bytes agree");
  }
  if (SENTENCE.trim().length === 0) {
    throw new Error("sentence must not be only white space");
  }
  if (SENTENCE.includes("\n") || SENTENCE.includes("\r")) {
    throw new Error("sentence must be a single line");
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", SENTENCE, "utf8");

  // Verify the round trip: read it back and confirm it matches exactly.
  const back = readFileSync("/output/entry.txt", "utf8");
  if (back !== SENTENCE) {
    throw new Error("round-trip check failed: entry.txt does not match");
  }
  console.log(`wrote /output/entry.txt (${SENTENCE.length} chars)`);
}

main();
