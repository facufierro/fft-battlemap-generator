
async function saveEncounter() {

}
async function loadEncounter(encounterName) {
  const filePath = `modules/fft-battlemap-generator/presets/encounters/${encounterName}.json`;
  try {
    const response = await fetch(filePath);
    const jsonData = await response.json();
    return new Encounter(jsonData.name, jsonData.type, jsonData.party_level);
  } catch (error) {
    console.error('Failed to load encounter:', error);
    throw error; // Rethrow the error if you want calling code to handle it as well.
  }
}
async function loadEncounterList() {
  let presets = await MassEdit.getPresets({ folder: 'Encounters' });
  if (presets && presets.length > 0) {
    return presets.map(preset => preset.name);
  } else {
    return [];
  }
}

async function spawnEncounter(encounterName, x = null, y = null) {
  const scene = game.scenes.active;
  const padding = scene.padding || 0.25; // Default padding is 10%

  const canvasWidth = canvas.dimensions.width;
  const canvasHeight = canvas.dimensions.height;
  const minX = canvasWidth * padding;
  const maxX = canvasWidth * (1 - padding);
  const minY = canvasHeight * padding;
  const maxY = canvasHeight * (1 - padding);

  if (x === null) x = Math.floor(Math.random() * (maxX - minX) + minX);
  if (y === null) y = Math.floor(Math.random() * (maxY - minY) + minY);

  const spawnedTokens = await MassEdit.spawnPreset({ name: encounterName, x, y });

  let allTokensInsideCanvas = spawnedTokens.every(token => 
    token.x >= minX && token.x <= maxX && token.y >= minY && token.y <= maxY
  );

  if (!allTokensInsideCanvas) {
    ui.notifications.warn("Some tokens are outside the canvas boundaries.");
  }

  returnToTokenControl();
}

function returnToTokenControl() {
  // Activate the Token Control layer
  canvas.tokens.activate();
  ui.controls.control = ui.controls.controls.find(control => control.name === "token");
  ui.controls.control.activeTool = "select";
  ui.controls.render();
}

// set all functions to be available to other modules in window
window.saveEncounter = saveEncounter;
window.loadEncounter = loadEncounter;
window.loadEncounterList = loadEncounterList;
window.spawnEncounter = spawnEncounter;
window.returnToTokenControl = returnToTokenControl;


