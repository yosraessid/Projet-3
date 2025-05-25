// main.js
// This is the main process file for the Electron app. It creates the main window and handles app lifecycle events.

const { app, BrowserWindow } = require('electron'); // Import Electron app and window
const path = require('path'); // Import path module

let mainWindow; // Reference to the main window
const isDev = !app.isPackaged; // Check if running in development mode

// When Electron is ready, create the main window
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800, // Window width
    height: 600, // Window height
    webPreferences: {
      preload: path.resolve(__dirname, 'src/preload/index.js'), // Preload script for secure APIs
    },
  });

  // In development, load the Vite dev server. In production, load the built HTML file.
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173'); // Load Vite dev server
  } else {
    mainWindow.loadFile('src/renderer/index.html'); // Load built HTML file
  }
  mainWindow.webContents.openDevTools(); // Open dev tools for debugging

  mainWindow.on('closed', () => {
    mainWindow = null; // Dereference the window
  });
});

// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// On macOS, recreate a window when the dock icon is clicked and there are no other windows open
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.resolve(__dirname, 'src/preload/index.js'),
      },
    });
    if (isDev) {
      mainWindow.loadURL('http://localhost:5173');
    } else {
      mainWindow.loadFile('src/renderer/index.html');
    }
  }
});