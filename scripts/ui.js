async function showEncountersDialog() {
  const picker = await FilePicker.browse("data", "modules/fft-battlemap-generator/presets/encounters");
  const files = picker.files.filter(file => file.endsWith(".json"));
  if (files.length === 0) {
    ui.notifications.warn("No encounter files found in the encounters folder.");
    return;
  }

  const options = files.map(file => {
    const fileName = file.split("/").pop().replace('.json', '');
    return `<option value="${fileName}">${fileName}</option>`;
  }).join("");

  // Load the template and insert the options dynamically
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
          debugEncounter(selectedFile);
        }
      }
    },
    render: (html) => {
      // Insert the options into the select element
      html.find('#preset-select').html(options);
    }
  }).render(true);
}

// Attach to window object to make it globally accessible
window.showEncountersDialog = showEncountersDialog;
