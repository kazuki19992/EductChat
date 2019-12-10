// index.js
// 2019/12/10 22:28
// Kazuki Kushida

import { app } from "electron";
import createWindow from "./createWindow";

// Windowの作成
app.on("ready", () => {
    createWindow();
});

// すべてのWindowが閉じられた時
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        // Mac_OSの場合、Windowが閉じられた場合、appも終了する
        app.quit();
    }
});

app.on("activate", (_e, hasVisibleWindows) => {
    if (!hasVisibleWindows) {
        createWindow();
    }
})