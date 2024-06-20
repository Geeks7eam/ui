#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

// Helper function to determine the correct module to load
async function loadModule() {
  const cjsPath = path.resolve(__dirname, '../dist/index.cjs');
  const esmPath = path.resolve(__dirname, '../dist/index.mjs');

  if (fs.existsSync(cjsPath)) {
    return require(cjsPath);
  } else if (fs.existsSync(esmPath)) {
    const { pathToFileURL } = require('url');
    return import(pathToFileURL(esmPath).href);
  } else {
    throw new Error('No valid module found in the dist directory.');
  }
}

(async () => {
  try {
    await loadModule();
  } catch (error) {
    console.error('Error loading the main module:', error);
    process.exit(1);
  }
})();
