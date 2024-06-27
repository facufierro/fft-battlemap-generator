
async function loadEncounterFromJson(encounterName) {
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

async function spawnEncounter(encounterName, x = null, y = null) {
  const encounter = await loadEncounterFromJson(encounterName);
  if (!encounter) {
    ui.notifications.error(`Encounter ${encounterName} not found.`);
    return;
  }

  // Set random values for x and y if not specified
  if (x === null) x = Math.floor(Math.random() * canvas.dimensions.width);
  if (y === null) y = Math.floor(Math.random() * canvas.dimensions.height);

  // Log the encounter details and coordinates
  console.log(`Encounter: ${encounterName}, Type: ${encounter.type}, Party Level: ${encounter.party_level}`);
  console.log(`Spawn Coordinates: x=${x}, y=${y}`);

  // Add logic to spawn the encounter at the specified coordinates
  await MassEdit.spawnPreset({ name: encounterName, x, y });
}

// Attach to window object to make it globally accessible
window.spawnEncounter = spawnEncounter;
