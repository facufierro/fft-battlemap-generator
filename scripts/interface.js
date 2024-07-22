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

window.addRandomBattlemapControl = addRandomBattlemapControl;
