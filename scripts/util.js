async function debugEncounter(encounterName) {
  const filePath = `modules/fft-battlemap-generator/presets/encounters/${encounterName}.json`;

  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filePath}`);
    }

    const encounter = await response.json();

    ui.notifications.info(`Name: ${encounter.name}`);
    ui.notifications.info(`Type: ${encounter.type}`);
    ui.notifications.info(`Party Level: ${encounter.party_level}`);
  } catch (error) {
    ui.notifications.error(`Error: ${error.message}`);
  }
}

// Attach to window object to make it globally accessible
window.debugEncounter = debugEncounter;