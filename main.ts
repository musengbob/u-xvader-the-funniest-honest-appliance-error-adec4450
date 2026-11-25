// The Funniest Honest Appliance Error — make.fun entry.
//
// Writes one line (at most 200 characters): the funniest honest error
// message an appliance could show. A microwave, flat and put-upon, that
// has reheated the same mug four times and finally gives up.
//
// The line is written to entry.txt in the harness output directory, with
// no trailing newline, so the file holds exactly the one line.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "ERROR 41: I have reheated this same mug four times. You keep walking away. I give up. Drink it cold.";

function resolveOutputPath(): string {
  const makefunDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (makefunDir) {
    return join(makefunDir, "entry.txt");
  }
  const outputPath = process.env.OUTPUT_PATH;
  if (outputPath) {
    return outputPath;
  }
  if (process.env.MAKEFUN_BOT_DIR) {
    return "/output/entry.txt";
  }
  return join("output", "entry.txt");
}

if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outPath = resolveOutputPath();
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
