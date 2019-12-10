import { BrowserWindow } from "electron";

let win;
function createWindow() {
    win = new BrowserWindow();

    // ここで読み込むファイルのパスを指定する！！
    // win.loadURL(`file://${__dirname}/../../index.html`);
    win.loadURL(`file:///home/kazuki19992/Documents/git/EductChat/index.html`);

    win.on("close", () => {
        win = null;
    });
}

export default createWindow;