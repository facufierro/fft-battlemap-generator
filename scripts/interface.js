function addRandomBattlemapControl() {
  Hooks.on('getSceneControlButtons', (controls) => {
    controls.push({
      name: "fft-random-battlemap-control",
      title: "Random Battlemaps",
      icon: "fas fa-globe",
      layer: "controls",
      tools: [
        {
          name: "fft-generate-encounters-button",
          title: "Generate Encounters",
          icon: "fas fa-globe",
          button: true,
          onClick: () => {
            console.log("Generate Encounters button clicked");
            showEncountersDialog();
          },
          visible: true
        },
        {
          name: "fft-generate-forest-button",
          title: "Generate Forest",
          icon: "fas fa-tree",
          button: true,
          onClick: () => {
            console.log("Generate Forest button clicked");
          },
          visible: true
        }
      ],
      visible: game.user.isGM
    });
    console.log("Controls after adding:", controls);
  });
}

async function showEncountersDialog() {
  const encounterNames = await getEncounterList();

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
window.addRandomBattlemapControl = addRandomBattlemapControl;
