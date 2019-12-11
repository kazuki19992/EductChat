// index.js
// 2019/12/10 22:28
// Kazuki Kushida

import { app } from "electron";
import setAppMenu from "./setAppMenu";
import createWindow from "./createWindow";

// ウィンドウが開かれた時
app.on("ready", () => {
  setAppMenu();
  createWindow();
});

// Macでウインドウが閉じられた時
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", (_e, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    createWindow();
  }
});