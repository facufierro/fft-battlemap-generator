export async function getEncounterList() {
    let presets = await MassEdit.getPresets({ folder: 'Encounters' });
    return presets && presets.length > 0 ? presets.map(preset => preset.name) : [];
}

export async function spawnEncounter(encounterName, x = null, y = null) {
    await MassEdit.spawnPreset({ name: encounterName, x: 2900, y: 2000 });
}
