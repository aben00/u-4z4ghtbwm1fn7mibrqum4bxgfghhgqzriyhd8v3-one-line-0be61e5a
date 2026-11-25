// One Line, One Laugh — entry program (make.fun, program/v1, node22).
//
// The joke is assembled from two halves — a mundane setup and a legal
// twist — then checked against the 1–140 character gate and written to
// /output/entry.txt. Nothing here is random, time-based, or networked, so
// every run produces the exact same bytes. The gate mirrors the
// competition's: 1–140 characters, one line, no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 140;

type JokePart = { readonly text: string; readonly role: "setup" | "turn" };

const parts: readonly JokePart[] = [
  { role: "setup", text: "My screen time report just filed" },
  { role: "turn", text: "a restraining order against me." },
];

function assemble(pieces: readonly JokePart[]): string {
  return pieces.map((piece) => piece.text).join(" ");
}

function gate(line: string): string {
  const chars = [...line].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} chars; gate requires 1-${MAX_CHARS}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  return line;
}

function main(): void {
  const line = gate(assemble(parts));
  const dir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), line, "utf8");
}

main();
