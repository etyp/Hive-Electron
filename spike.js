var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {


  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadUrl('http://localhost:3000');

  // Open the devtools.
  mainWindow.openDevTools({detach: true});

  // Start file watch
  var chokidar = require('chokidar');
  chokidar.watch('/Users/etypaldos/gazeme/', {ignored: /[\/\\]\./})
  .on('add', function(path) {
    mainWindow.webContents.send('fwatch', {event: 'add', path: path});
  })
  .on('change', function(path) {
    mainWindow.webContents.send('fwatch', {event: 'change', path: path});
  })
  .on('unlink', function(path) {
    mainWindow.webContents.send('fwatch', {event: 'unlink', path: path});
  })
  .on('addDir', function(path) {
    mainWindow.webContents.send('fwatch', {event: 'addDir', path: path});
  })
  .on('unlinkDir', function(path) {
    mainWindow.webContents.send('fwatch', {event: 'unlinkDir', path: path});
  })
  .on('error', function(error) {
    mainWindow.webContents.send('fwatch', {event: 'error', error: error});
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
