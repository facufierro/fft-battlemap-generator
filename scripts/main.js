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
        console.log("Generating Forest"); // Fixed typo
      },
      visible: true
    }],
    visible: game.user.isGM
  });
});
