/**
 * Created by Administrator on 2016/2/22.
 */

var app = require('app');  // 控制应用生命周期的模块。
var BrowserWindow = require('browser-window');  // 创建原生浏览器窗口的模块
var currentPage = 'dashboard';
// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function() {
    // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
    // 应用会保持活动状态
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function() {
    // 创建浏览器窗口。
    mainWindow = new BrowserWindow({width: 1000, height: 600});

    // 加载应用的 index.html
    mainWindow.loadURL('file://' + __dirname + '/dashboard.html');

    // 打开开发工具
    //mainWindow.openDevTools();

    // 当 window 被关闭，这个事件会被发出
    mainWindow.on('closed', function() {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 但这次不是。
        mainWindow = null;
    });
});

/**************************IPC****************************/
const ipcMain = require('electron').ipcMain;
ipcMain.on('asynchronous-message', function(event, arg) {
    console.log(arg);  // prints "ping"
    event.sender.send('asynchronous-reply', 'pong');
});
ipcMain.on('synchronous-message', function(event, arg) {
    console.log(arg);  // prints "ping"
    event.returnValue = 'pong';
});

//var request = require('C:/Softwares/electron-v0.36.7-win32-x64/request/request.js');
//var request = require('./node_modules/request/request.js');
var request = require('request');
ipcMain.on('rendDataToChart1Async', function(event, arg) {
    console.log("*************************\nMain Proccess: receive apply - "+arg);
    console.log("Main Proccess: request data from server ");
});

ipcMain.on('SwitchToMainPage', function(event, arg) {
    currentPage = arg;
    console.log("*************************\nMain Proccess: receive SwitchToMainPage apply - ");
    mainWindow.loadURL('file://' + __dirname + '/mainpage.html');
    event.sender.send('SwitchToMainPage-reply', 'success');
    console.log("Main Proccess: SwitchToMainPage success");

});

ipcMain.on('SwitchToDashboardPage', function(event, arg) {
    currentPage = arg;
    console.log("*************************\nMain Proccess: receive SwitchToDashboardPage apply - ");
    mainWindow.loadURL('file://' + __dirname + '/dashboard.html');
    event.sender.send('SwitchToDashboardPage-reply', 'success');
    console.log("Main Proccess: SwitchToDashboardPage success");

});
