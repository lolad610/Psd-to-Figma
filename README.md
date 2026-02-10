# Psd to Figma Importer Free

Free Figma plugin to import `.psd` files quickly with two modes:

1. **Flattened import** (best visual fidelity and fastest): imports the whole PSD as one image inside a frame.
2. **Layer image import**: imports visible PSD layers as individual image slices with preserved positions.

> Credit in plugin UI: **theking_1139** (Discord / X / Roblox).

## Files

- `manifest.json` — Figma plugin manifest
- `code.js` — plugin main thread logic (creates nodes in Figma)
- `ui.html` — plugin UI + PSD parsing using `ag-psd`

## Setup

1. Open Figma Desktop → **Plugins** → **Development** → **Import plugin from manifest...**
2. Pick `manifest.json` from this folder.
3. Run **Psd to Figma Importer Free** from Development plugins.

## Notes on 1:1 fidelity

- Complex Photoshop effects can be difficult to map to native Figma effects exactly.
- To keep imports fast and reliable, this plugin rasterizes PSD content into PNG layers/composite images.
- For most accurate visual 1:1 result, use **Flattened import**.
