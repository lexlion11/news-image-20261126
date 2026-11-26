#!/usr/bin/env node
// news-image-20261126 — "The World in One Day", Thursday 26 November 2026.
//
// The image itself is a rendered artefact (entry.png); this program copies that
// exact file to the competition output directory and then proves, from the
// bytes on disk, that what landed there is a whole, valid PNG of the required
// size. Two runs must produce identical bytes.
//
// The source is resolved relative to this module (never the working directory)
// because the grader runs the entry from outside the repository.
//
// Node standard library only — nothing is installed before this runs.

import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const MAX_BYTES = 1048576;
const REQUIRED_WIDTH = 1024;
const REQUIRED_HEIGHT = 1024;

function fail(message) {
  console.error("entry: " + message);
  process.exit(1);
}

// Parse the PNG header: 8-byte signature, then an IHDR chunk carrying the
// width, height, bit depth and colour type.
function readPngHeader(buffer, label) {
  if (buffer.length < 8 || buffer.subarray(0, 8).compare(PNG_MAGIC) !== 0) {
    fail(label + " is not a PNG (signature mismatch)");
  }
  if (buffer.length > MAX_BYTES) {
    fail(label + " is " + buffer.length + " bytes, over the " + MAX_BYTES + " byte limit");
  }
  if (buffer.length < 33 || buffer.readUInt32BE(8) !== 13 ||
      buffer.subarray(12, 16).toString("ascii") !== "IHDR") {
    fail(label + " has a malformed IHDR chunk");
  }
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  if (width !== REQUIRED_WIDTH || height !== REQUIRED_HEIGHT) {
    fail(label + " is " + width + "x" + height + ", must be exactly " +
         REQUIRED_WIDTH + "x" + REQUIRED_HEIGHT);
  }
  const bitDepth = buffer[24];
  const colourType = buffer[25];
  if (bitDepth !== 8 || ![0, 2, 3, 4, 6].includes(colourType)) {
    fail(label + " has unsupported bit depth " + bitDepth + " / colour type " + colourType);
  }
  return { width, height };
}

// The source is resolved relative to this module, never to the working
// directory: the grader runs the entry from a directory outside the repository,
// and a CWD-relative path failed an earlier submission.
const source = process.argv[2] ?? fileURLToPath(new URL("./entry.png", import.meta.url));
const outputName = process.argv[3] ?? "entry.png";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The output directory may be given with a trailing separator; normalise it so
// the path we print is the path we wrote to.
const outputDirectory = outputDir.replace(/\/+$/, "") || "/";

if (outputName !== basename(outputName) || outputName.includes("/") || outputName.includes("\\")) {
  fail("output name must be a plain file name, got \"" + outputName + "\"");
}
if (!existsSync(source) || !statSync(source).isFile()) {
  fail("source image not found or not a regular file: " + source);
}

const sourceBuffer = readFileSync(source);
readPngHeader(sourceBuffer, "source");

mkdirSync(outputDirectory, { recursive: true });
const destination = join(outputDirectory, outputName);
copyFileSync(source, destination);

// Verify the copy that is actually on disk rather than trusting the copy call.
const destinationBuffer = readFileSync(destination);
if (destinationBuffer.length !== sourceBuffer.length) {
  fail("size mismatch after copy: source " + sourceBuffer.length +
       ", destination " + destinationBuffer.length);
}
const sourceHash = createHash("sha256").update(sourceBuffer).digest("hex");
const destinationHash = createHash("sha256").update(destinationBuffer).digest("hex");
if (sourceHash !== destinationHash) {
  fail("SHA-256 mismatch: source " + sourceHash + " != destination " + destinationHash);
}
const { width, height } = readPngHeader(destinationBuffer, "destination");

console.log("entry: copied " + source + " -> " + destination + " (" + destinationBuffer.length +
            " bytes, " + width + "x" + height + " px, sha256 " + destinationHash + ") verified OK");
