figma.showUI(__html__, {
  width: 460,
  height: 640,
  title: 'Psd to Figma Importer Free'
});

function toUint8Array(data) {
  if (data instanceof Uint8Array) return data;
  if (Array.isArray(data)) return Uint8Array.from(data);
  return new Uint8Array(data);
}

function createImageNodeFromPng(pngBytes, frameName, width, height, x = 0, y = 0) {
  const image = figma.createImage(toUint8Array(pngBytes));
  const rect = figma.createRectangle();
  rect.name = frameName;
  rect.resize(width, height);
  rect.fills = [
    {
      type: 'IMAGE',
      scaleMode: 'FILL',
      imageHash: image.hash
    }
  ];
  rect.x = x;
  rect.y = y;
  return rect;
}

function placeFlattenImport(payload) {
  const page = figma.currentPage;
  const frame = figma.createFrame();
  frame.name = payload.name || 'PSD Import';
  frame.resize(payload.width, payload.height);
  frame.clipsContent = false;

  const imageNode = createImageNodeFromPng(
    payload.compositePng,
    `${frame.name} / Flattened`,
    payload.width,
    payload.height
  );
  frame.appendChild(imageNode);

  page.appendChild(frame);
  figma.currentPage.selection = [frame];
  figma.viewport.scrollAndZoomIntoView([frame]);
}

function placeLayerImport(payload) {
  const page = figma.currentPage;
  const frame = figma.createFrame();
  frame.name = payload.name || 'PSD Layer Import';
  frame.resize(payload.width, payload.height);
  frame.clipsContent = false;

  const layers = payload.layers || [];
  layers.forEach((layer) => {
    const safeWidth = Math.max(1, Math.round(layer.width || 1));
    const safeHeight = Math.max(1, Math.round(layer.height || 1));
    const node = createImageNodeFromPng(
      layer.pngBytes,
      layer.name || 'Layer',
      safeWidth,
      safeHeight,
      Math.round(layer.x || 0),
      Math.round(layer.y || 0)
    );
    frame.appendChild(node);
  });

  if (!layers.length && payload.compositePng) {
    const fallback = createImageNodeFromPng(
      payload.compositePng,
      `${frame.name} / Fallback Composite`,
      payload.width,
      payload.height
    );
    frame.appendChild(fallback);
  }

  page.appendChild(frame);
  figma.currentPage.selection = [frame];
  figma.viewport.scrollAndZoomIntoView([frame]);
}

figma.ui.onmessage = async (msg) => {
  if (!msg || !msg.type) return;

  if (msg.type === 'IMPORT_PSD') {
    try {
      const payload = msg.payload;
      if (!payload || !payload.width || !payload.height || !payload.compositePng) {
        throw new Error('Invalid import payload.');
      }

      if (payload.mode === 'flatten') {
        placeFlattenImport(payload);
      } else {
        placeLayerImport(payload);
      }

      figma.notify(`Imported ${payload.name || 'PSD'} successfully ✅`);
      figma.ui.postMessage({
        type: 'IMPORT_DONE',
        payload: { message: 'PSD imported into Figma.' }
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Import failed.';
      figma.notify(`Import failed: ${message}`, { error: true });
      figma.ui.postMessage({
        type: 'IMPORT_ERROR',
        payload: { message }
      });
    }
  }

  if (msg.type === 'CLOSE_PLUGIN') {
    figma.closePlugin('Psd to Figma Importer closed.');
  }
};
