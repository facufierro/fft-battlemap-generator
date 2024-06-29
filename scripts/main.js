// main.js
Hooks.on('getSceneControlButtons', (controls) => {
  controls.push({
    name: "fft-random-battlemap-control",
    title: "Random Battlemaps",
    icon: "fas fa-globe",
    layer: "controls", // Set to null to avoid errors
    tools: [{
      name: "fft-generate-forest-button",
      title: "Generate Encounters",
      icon: "fas fa-globe", // Better icon for a forest
      button: true,
      onClick: () => {
        showEncountersDialog();
      },
      visible: true
    }],
    visible: game.user.isGM
  });
});
