import { app, Menu } from "electron";
import createWindow from "./createWindow";

// 上のメニューバーの定義をするよ
function setAppMenu() {

    // テンプレの定義
    const template = [
        {
            label: "EductChat",
            submenu: [
                {
                    label: "新しいウインドウ",
                    accelerator: "CmdOrCtrl+N",
                    click: createWindow
                },

                {
                    type: "separator"
                },

                {
                    label: "閉じる",
                    accelerator: "CmdOrCtrl+W",
                    role: "close"
                }
            ]
        },

        {
            label: "編集",
            submenu: [
                {
                    label: "コピー",
                    accelerator: "CmdOrCtrl+C",
                    role: "copy"
                },

                {
                    label: "ペースト",
                    accelerator: "CmdOrCtrl+V",
                    role: "paste"
                },
                
                {
                    label: "カット",
                    accelerator: "CmdOrCtrl+X",
                    role: "cut"
                },

                {
                    label: "全選択",
                    accelerator: "CmdOrCtrl+A",
                    role: "selectall"
                }
            ]
        },

        {
            label: "オプション",
            submenu: [
                {
                    label: "再読込",
                    accelerator: "CmdOrCtrl+R",
                    click: (item, focusedWindow) => focusedWindow && focusedWindow.reload()
                },

                {
                    label: "DevToolに切り替え",
                    accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
                    click: (item, focusedWindow) => focusedWindow && focusedWindow.toggleDevTools()
                }
            ]
        }
    ];

    // MacOSのみの処理
    if(process.platform === "darwin"){
        // メインメニューを追加する
        template.unshift({
            label: app.getName(),
            submenu: [
                {role: "about"},
                {type: "separator"},
                {role: "services", submenu: [] },
                {type: "separator"},
                {role: "hide"},
                {role: "hideothers"},
                {role: "unhide"},
                {type: "separator"},
                {role: "quit"}
            ]
        });

        // テンプレから末尾にウインドウメニューを作成
        template.push({
            label: "ウインドウ",
            role: "window",
            submenu: [
                {
                    label: "最小化",
                    role: "minimize"
                },
                {
                    label: "最大化",
                    role: "zoom"
                }
            ]
        });
    }

    // テンプレからメニューオブジェクトを作成
    const appMenu = Menu.buildFromTemplate(template);

    // 作成したメニューオブジェクトをアプリケーションに設定
    Menu.setApplicationMenu(appMenu);
}

export default setAppMenu;