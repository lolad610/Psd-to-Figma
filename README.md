# Psd to Figma Importer Free

Free Figma plugin to import `.psd` files quickly with two modes:

1. **Flattened import** (best visual fidelity and fastest): imports the whole PSD as one image inside a frame.
2. **Layer image import**: imports visible PSD layers as individual image slices with preserved positions.

> Credit in plugin UI: **theking_1139** (Discord / X / Roblox).

## Will it work smoothly?

Yes — for most PSD files it will be smooth and fast because it rasterizes content to PNG (composite/layers) instead of trying to convert every Photoshop effect into native editable Figma effects.

- **Best 1:1 visual match:** use **Flattened import**.
- **Need layer positioning preserved:** use **Layer image import**.
- For very complex/unsupported Photoshop effects, the plugin automatically falls back to image slices to keep import stable.

## Files

- `manifest.json` — Figma plugin manifest
- `code.js` — plugin main thread logic (creates nodes in Figma)
- `ui.html` — plugin UI + PSD parsing using `ag-psd`
- `scripts/package-plugin.sh` — creates a downloadable `.zip` package

## Setup in Figma

1. Open Figma Desktop → **Plugins** → **Development** → **Import plugin from manifest...**
2. Pick `manifest.json` from this folder.
3. Run **Psd to Figma Importer Free** from Development plugins.

## Downloadable ZIP build

Run:

```bash
./scripts/package-plugin.sh
```

Then use:

- `dist/psd-to-figma-importer-free.zip`

You can share/upload that zip, or extract it and import the included `manifest.json` in Figma.

## Important note

The PSD parser (`ag-psd`) is loaded from CDN in the plugin UI, so the first load requires internet access.
