async function loadEncounterList() {
  let presets = await MassEdit.getPresets({ folder: 'Encounters' });
  return presets && presets.length > 0 ? presets.map(preset => preset.name) : [];
}

async function showEncountersDialog() {
  const encounterNames = await loadEncounterList();
  
  if (encounterNames.length === 0) {
    ui.notifications.warn("No encounter presets found in the Encounters folder.");
    return;
  }

  const options = encounterNames.map(name => `<option value="${name}">${name}</option>`).join("");
  const template = await renderTemplate('modules/fft-battlemap-generator/templates/dialog.html', {});

  new Dialog({
    title: "Select an Encounter",
    content: template,
    buttons: {
      load: {
        label: "Load",
        callback: (html) => {
          const selectedFile = html.find('[name="preset-select"]').val();
          console.log(`Selected encounter: ${selectedFile}`);
          spawnEncounter(selectedFile);
        }
      }
    },
    render: (html) => html.find('#preset-select').html(options)
  }).render(true);
}

window.showEncountersDialog = showEncountersDialog;
