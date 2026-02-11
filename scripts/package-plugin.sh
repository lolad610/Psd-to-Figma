#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$ROOT_DIR/dist"
PKG_DIR="$DIST_DIR/psd-to-figma-importer-free"
ZIP_PATH="$DIST_DIR/psd-to-figma-importer-free.zip"

rm -rf "$PKG_DIR"
mkdir -p "$PKG_DIR"
mkdir -p "$DIST_DIR"

cp "$ROOT_DIR/manifest.json" "$PKG_DIR/"
cp "$ROOT_DIR/code.js" "$PKG_DIR/"
cp "$ROOT_DIR/ui.html" "$PKG_DIR/"
cp "$ROOT_DIR/README.md" "$PKG_DIR/"

(
  cd "$DIST_DIR"
  rm -f "$ZIP_PATH"
  zip -r "$(basename "$ZIP_PATH")" "$(basename "$PKG_DIR")" >/dev/null
)

echo "Package created: $ZIP_PATH"
