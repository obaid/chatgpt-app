const { app, session, Menu, Tray, BrowserView } = require("electron");
const { menubar } = require("menubar");
const path = require("path");

app.on("ready", () => {
  // "use strict";

  const iconPath = path.join(__dirname, "iconTemplate.png");
  const tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([{ role: "quit" }]);

  const mb = menubar({
    tray,
    browserWindow: {
      width: 500,
      height: 600,
    },
  });

  mb.on("after-create-window", () => {
    console.log("create chat?");
    const win = mb.window;

    const view = new BrowserView();
    win.setBrowserView(view);
    view.setBounds({ x: 0, y: 0, width: 500, height: 600 });
    view.webContents.loadURL("https://chat.openai.com/chat");

    app.dock.hide();
  });

  mb.on("ready", () => {
    tray.on("right-click", () => {
      mb.tray.popUpContextMenu(contextMenu);
    });
  });
});

// const mb = menubar({
//   browserWindow: {
//     width: 500,
//     height: 600,
//   },
// });

// mb.on("after-create-window", () => {
//   const win = mb.window;

//   const view = new BrowserView();
//   win.setBrowserView(view);
//   view.setBounds({ x: 0, y: 0, width: 500, height: 600 });
//   view.webContents.loadURL("https://chat.openai.com/chat");

//   app.dock.hide();
// });
