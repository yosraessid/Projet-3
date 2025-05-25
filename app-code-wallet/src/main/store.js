// store.js
// This file manages the persistent storage for the Electron app using electron-store.

const Store = require('electron-store'); // Import electron-store for persistent storage
const path = require('path'); // Import path module
const os = require('os'); // Import os module

// Define the schema for the data (fragments, tags, darkMode)
const schema = {
  fragments: {
    type: 'array',
    default: []
  },
  tags: {
    type: 'array',
    default: []
  },
  darkMode: {
    type: 'boolean',
    default: false
  }
};

// Create the store with custom options for persistence
const store = new Store({
  name: 'code-wallet-data', // Name of the data file
  schema, // Use the schema defined above
  clearInvalidConfig: true, // Remove invalid config automatically
  migrations: {
    '1.0.0': store => {
      // Migration to ensure data compatibility
      const fragments = store.get('fragments', []);
      const tags = store.get('tags', []);
      store.set('fragments', fragments);
      store.set('tags', tags);
    }
  },
  // Set a custom storage path in the user's home directory
  cwd: path.join(os.homedir(), '.code-wallet'),
  // Enable automatic saving
  watch: true
});

// Function to save data by key
const saveData = (key, data) => {
  try {
    store.set(key, data);
    return true;
  } catch (error) {
    console.error(`Error saving data for ${key}:`, error);
    return false;
  }
};

// Function to load data by key
const loadData = (key) => {
  try {
    return store.get(key);
  } catch (error) {
    console.error(`Error loading data for ${key}:`, error);
    return null;
  }
};

// Function to delete data by key
const deleteData = (key) => {
  try {
    store.delete(key);
    return true;
  } catch (error) {
    console.error(`Error deleting data for ${key}:`, error);
    return false;
  }
};

// Export the store and utility functions
module.exports = {
  store,
  saveData,
  loadData,
  deleteData
};
