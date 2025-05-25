// index.js (preload)
// This file exposes secure APIs from the main process to the renderer process in Electron.

const { contextBridge, ipcRenderer } = require('electron'); // Import Electron APIs
const { store, saveData, loadData, deleteData } = require('../main/store'); // Import storage functions

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld('electron', {
  store: {
    get: (key) => {
      try {
        return loadData(key); // Try to load data by key
      } catch (error) {
        console.error('Read error:', error); // Log error
        // Try to restore from backup if available
        const backup = loadData(`backup_${key}`);
        if (backup) {
          saveData(key, backup);
          return backup;
        }
        return null;
      }
    },
    set: (key, value) => {
      try {
        return saveData(key, value); // Try to save data
      } catch (error) {
        console.error('Save error:', error); // Log error
        // Save to backup if main save fails
        return saveData(`backup_${key}`, value);
      }
    },
    delete: (key) => {
      try {
        return deleteData(key); // Try to delete data
      } catch (error) {
        console.error('Delete error:', error); // Log error
        return false;
      }
    }
  }
});
