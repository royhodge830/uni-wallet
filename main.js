'use strict'

const electron = require('electron')
const app = electron.app
const globalShortcut = electron.globalShortcut
const os = require('os')
const path = require('path')
const config = require(path.join(__dirname, 'package.json'))
const BrowserWindow = electron.BrowserWindow
const globalConfig = require(path.join(__dirname, 'config.json'))
const settings = require('electron-settings');

var fs = require('fs');



settings.set('connectionSettings', {
  host_address: '127.0.0.1',
  rpc_port: '15590',
  rpc_user: 'multichainrpc',
  rpc_pass: 'xxxx'
});


settings.get('connectionSettings.rpc_pass');
console.log('connectionSettings.rpc_pass');
settings.set('connectionSettings.rpc_pass', "passme123");
console.log('connectionSettings.rpc_pass');
settings.get('model.rpc_pass');


app.setName(config.productName)

var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");
let multichain = require("multichain-node")({
    port: globalConfig.connection.port,
    host: globalConfig.connection.host,
    user: globalConfig.connection.user,
    pass: globalConfig.connection.pass,
});


multichain.getInfo((err, info) => {
    if(err){
        throw err;
    }
    JSON.stringify(info);
    console.log(info);
    global.x = (info);
});



var mainWindow = null
app.on('ready', function () {
  mainWindow = new BrowserWindow({
    title: config.productName,
    darkTheme:true,
    allowRunningInsecureContent:true,
    show:false,
    width: 1677,
    height: 1047,
    frame:true,
    transparent : false,
    webPreferences: {
      nodeIntegration: true,
      defaultEncoding: 'UTF-8'
    }
  })
  // Creating the window
    const windowOptions = {
      title: 'Main Window',
      width: 1000,
      height: 800,
    };
  mainWindow.loadURL(`file://${__dirname}/app/index.html`)
  mainWindow.webContents.on('did-finish-load', function() {
        mainWindow.show();
    });

let top = new BrowserWindow({
  title: "Connection Settings",
  width: 1404,
  height: 299,
})
let child = new BrowserWindow({
      parent: top,
      title: "Connection Settings",
      width: 1404,
      height: 299,
      modal: true,
      show: false
    })
top.loadURL(`file://${__dirname}/app/form.html`)
child.once('ready-to-show', () => {
  childWindow.webContents.openDevTools(),
  child.show()
})
var introJS = require('intro.js').introJs
var model = {
    host_addy: '127.0.0.1',
    rpc_port: '15590',
    rpc_user: 'multichainrpc',
    rpc_pass: 'xxxx'
};
console.log(SHA256('model.rpc_pass'));

  // Enable keyboard shortcuts for Developer Tools on various platforms.
  let platform = os.platform()
  if (platform === 'darwin') {
    globalShortcut.register('Command+Option+I', () => {
      mainWindow.webContents.openDevTools()
    })
  } else if (platform === 'linux' || platform === 'win32') {
    globalShortcut.register('Control+Shift+I', () => {
      mainWindow.webContents.openDevTools()
    })
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.setMenu(null)
    mainWindow.show()
  })

  mainWindow.onbeforeunload = (e) => {
    // Prevent Command-R from unloading the window contents.
    e.returnValue = false
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
})

app.on('window-all-closed', () => { app.quit() })
