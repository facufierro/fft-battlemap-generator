Hooks.once('ready', () => {
  new Dialog({
    title: "Welcome",
    content: "<p>Hello Worlds</p>",
    buttons: {
      confirm: {
        label: "Confirm",
        callback: () => console.log("Dialog confirmed")
      }
    },
    default: "confirm"
  }).render(true);
});
