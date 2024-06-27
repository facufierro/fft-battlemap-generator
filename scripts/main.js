async function showPresetDialog() {
  const picker = await FilePicker.browse("data", "modules/fft-battlemap-generator/presets");
  const files = picker.files.filter(file => file.endsWith(".json"));
  if (files.length === 0) {
    ui.notifications.warn("No preset files found in the presets folder.");
    return;
  }

  const options = files.map(file => `<option value="${file}">${file.split("/").pop()}</option>`).join("");

  new Dialog({
    title: "Select a Battlemap Preset",
    content: `
      <form>
        <div class="form-group">
          <label for="preset-select">Choose a preset:</label>
          <select id="preset-select" name="preset-select">
            ${options}
          </select>
        </div>
      </form>
    `,
    buttons: {
      load: {
        label: "Load",
        callback: (html) => {
          const selectedFile = html.find('[name="preset-select"]').val();
          console.log(`Selected preset: ${selectedFile}`);
          // Load the selected preset (replace with your logic)
          // battlemap.loadPreset(selectedFile);
        }
      }
    }
  }).render(true);
}


// Add a new control section to the left sidebar
Hooks.on('getSceneControlButtons', (controls) => {
  controls.push({
    name: "fft-random-battlemap-control",
    title: "Random Battlemaps",
    icon: "fas fa-globe",
    layer: "controls", // Set to null to avoid errors
    tools: [{
      name: "fft-generate-forest-button",
      title: "Generate Forest",
      icon: "fas fa-tree", // Better icon for a forest
      button: true,
      onClick: () => {
        showPresetDialog();
      },
      visible: true
    }],
    visible: game.user.isGM
  });
});
