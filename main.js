const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 300,
        height: 400,
        frame: false,  // Sin marco de ventana
        transparent: true,  // Fondo transparente
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        alwaysOnTop: true,  // Siempre visible
        skipTaskbar: true   // No aparece en la barra de tareas
    });

    // Cargar el archivo HTML
    win.loadFile('index.html');

    // Manejar el click derecho para el menú contextual
    win.webContents.on('context-menu', (event, params) => {
        const { Menu } = require('electron');
        const menu = Menu.buildFromTemplate([
            {
                label: 'Siempre visible',
                type: 'checkbox',
                checked: win.isAlwaysOnTop(),
                click: () => {
                    const newValue = !win.isAlwaysOnTop();
                    win.setAlwaysOnTop(newValue);
                }
            },
            { type: 'separator' },
            {
                label: 'Cerrar',
                click: () => {
                    win.close();
                }
            }
        ]);
        menu.popup();
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
}); 