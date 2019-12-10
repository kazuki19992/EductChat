"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _electron = require("electron");

var _createWindow = require("./createWindow");

var _createWindow2 = _interopRequireDefault(_createWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 上のメニューバーの定義をするよ
function setAppMenu() {

    // テンプレの定義
    var template = [{
        label: "EductChat",
        submenu: [{
            label: "新しいウインドウ",
            accelerator: "CmdOrCtrl+N",
            click: _createWindow2.default
        }, {
            type: "separator"
        }, {
            label: "閉じる",
            accelerator: "CmdOrCtrl+W",
            role: "close"
        }]
    }, {
        label: "編集",
        submenu: [{
            label: "コピー",
            accelerator: "CmdOrCtrl+C",
            role: "copy"
        }, {
            label: "ペースト",
            accelerator: "CmdOrCtrl+V",
            role: "paste"
        }, {
            label: "カット",
            accelerator: "CmdOrCtrl+X",
            role: "cut"
        }, {
            label: "全選択",
            accelerator: "CmdOrCtrl+A",
            role: "selectall"
        }]
    }, {
        label: "オプション",
        submenu: [{
            label: "再読込",
            accelerator: "CmdOrCtrl+R",
            click: function click(item, focusedWindow) {
                return focusedWindow && focusedWindow.reload();
            }
        }, {
            label: "DevToolに切り替え",
            accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
            click: function click(item, focusedWindow) {
                return focusedWindow && focusedWindow.toggleDevTools();
            }
        }]
    }];

    // MacOSのみの処理
    if (process.platform === "darwin") {
        // メインメニューを追加する
        template.unshift({
            label: _electron.app.getName(),
            submenu: [{ role: "about" }, { type: "separator" }, { role: "services", submenu: [] }, { type: "separator" }, { role: "hide" }, { role: "hideothers" }, { role: "unhide" }, { type: "separator" }, { role: "quit" }]
        });

        // テンプレから末尾にウインドウメニューを作成
        template.push({
            label: "ウインドウ",
            role: "window",
            submenu: [{
                label: "最小化",
                role: "minimize"
            }, {
                label: "最大化",
                role: "zoom"
            }]
        });
    }

    // テンプレからメニューオブジェクトを作成
    var appMenu = _electron.Menu.buildFromTemplate(template);

    // 作成したメニューオブジェクトをアプリケーションに設定
    _electron.Menu.setApplicationMenu(appMenu);
}

exports.default = setAppMenu;