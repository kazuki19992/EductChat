"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _electron = require("electron");

var win = void 0;
function createWindow() {
    win = new _electron.BrowserWindow();

    // ここで読み込むファイルのパスを指定する！！
    // win.loadURL(`file://${__dirname}/../../index.html`);
    win.loadURL("file:///home/kazuki19992/Documents/git/EductChat/index.html");

    win.on("close", function () {
        win = null;
    });
}

exports.default = createWindow;