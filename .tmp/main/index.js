"use strict";

var _electron = require("electron");

var _createWindow = require("./createWindow");

var _createWindow2 = _interopRequireDefault(_createWindow);

var _setAppMenu = require("./setAppMenu");

var _setAppMenu2 = _interopRequireDefault(_setAppMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Windowの作成
_electron.app.on("ready", function () {
    (0, _setAppMenu2.default)();
    (0, _createWindow2.default)();
});

// すべてのWindowが閉じられた時
// index.js
// 2019/12/10 22:28
// Kazuki Kushida

_electron.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        // Mac_OSの場合、Windowが閉じられた場合、appも終了する
        _electron.app.quit();
    }
});

_electron.app.on("activate", function (_e, hasVisibleWindows) {
    if (!hasVisibleWindows) {
        (0, _createWindow2.default)();
    }
});