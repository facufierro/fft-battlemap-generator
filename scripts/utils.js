function setRandomPositionWithinBounds(canvasDimensions, padding, x = null, y = null) {
  const canvasWidth = canvasDimensions.width;
  const canvasHeight = canvasDimensions.height;
  const minX = canvasWidth * padding;
  const maxX = canvasWidth * (1 - padding);
  const minY = canvasHeight * padding;
  const maxY = canvasHeight * (1 - padding);

  let positionIsValid = false;
  let newX, newY;

  const encounterRegions = canvas.scene.regions.filter(r => r.name === "encounter_region");

  while (!positionIsValid) {
    newX = x === null ? Math.floor(Math.random() * (maxX - minX) + minX) : x;
    newY = y === null ? Math.floor(Math.random() * (maxY - minY) + minY) : y;

    positionIsValid = encounterRegions.every(region => {
      const regionX = region.x;
      const regionY = region.y;
      const regionWidth = region.width;
      const regionHeight = region.height;

      console.log(`Checking position (${newX}, ${newY}) against region (${regionX}, ${regionY}, ${regionWidth}, ${regionHeight})`);

      return !(
        newX >= regionX && newX <= (regionX + regionWidth) &&
        newY >= regionY && newY <= (regionY + regionHeight)
      );
    });

    if (positionIsValid) {
      console.log(`Position (${newX}, ${newY}) is valid`);
    } else {
      console.log(`Position (${newX}, ${newY}) is invalid, retrying...`);
    }
  }

  return { x: newX, y: newY, minX, maxX, minY, maxY };
}


async function spawnEncounter(encounterName, x = null, y = null) {
  const scene = game.scenes.active;
  const padding = scene.padding || 0.25;

  const { x: calculatedX, y: calculatedY, minX, maxX, minY, maxY } = setRandomPositionWithinBounds(canvas.dimensions, padding, x, y);

  const spawnedTokens = await MassEdit.spawnPreset({ name: encounterName, x: calculatedX, y: calculatedY });

  let allTokensInsideCanvas = spawnedTokens.every(token =>
    token.x >= minX && token.x <= maxX && token.y >= minY && token.y <= maxY
  );

  if (!allTokensInsideCanvas) {
    ui.notifications.warn("Some tokens are outside the canvas boundaries.");
  }
  returnToTokenControl();
}

async function getBounds(numPlaceables) {
  const placeables = [...canvas.tokens.placeables, ...canvas.tiles.placeables, ...canvas.drawings.placeables]
    .sort((a, b) => b.document._id.localeCompare(a.document._id)).slice(0, numPlaceables);

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

  placeables.forEach(p => {
    let { x, y, width, height } = p.document;
    if (p.constructor.name === 'Token') {
      width *= canvas.grid.size;
      height *= canvas.grid.size;
    }
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x + width);
    maxY = Math.max(maxY, y + height);
  });

  return {
    position: { x: Math.floor(minX / 100) * 100, y: Math.floor(minY / 100) * 100 },
    size: { width: Math.ceil(maxX / 100) * 100 - Math.floor(minX / 100) * 100, height: Math.ceil(maxY / 100) * 100 - Math.floor(minY / 100) * 100 }
  };
}
function returnToTokenControl() {
  // Activate the Token Control layer
  canvas.tokens.activate();
  ui.controls.control = ui.controls.controls.find(control => control.name === "token");
  ui.controls.control.activeTool = "select";
  ui.controls.render();
}

// set all functions to be available to other modules in window
window.loadEncounterList = loadEncounterList;
window.spawnEncounter = spawnEncounter;
window.returnToTokenControl = returnToTokenControl;
