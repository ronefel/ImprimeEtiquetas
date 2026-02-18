import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import Store from 'electron-store'

import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Defines Store schema or types if needed, for now any
const store = new Store();

// The built directory structure
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

let win
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
    win = new BrowserWindow({
        width: 1209,
        height: 870,
        icon: path.join(process.env.VITE_PUBLIC || '', 'icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs'),
        },
    })

    if (app.isPackaged) {
        win.setMenu(null);
    }

    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL)
    } else {
        win.loadFile(path.join(process.env.DIST || '', 'index.html'))
    }
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.whenReady().then(() => {
    createWindow();

    // IPC Handlers
    ipcMain.handle('save-model', async (_, name, data) => {
        try {
            const models = store.get('models', {});
            models[name] = data;
            store.set('models', models);
            return { success: true };
        } catch (error) {
            console.error('Failed to save model', error);
            return { success: false, error };
        }
    });

    ipcMain.handle('get-models', async () => {
        return store.get('models', {});
    });

    ipcMain.handle('delete-model', async (_, name) => {
        const models = store.get('models', {});
        delete models[name];
        store.set('models', models);
        return { success: true };
    });
})
