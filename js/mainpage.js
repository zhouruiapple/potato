/**
 * Created by Administrator on 2016/3/3.
 */

$(function(){
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    $('#deployment').click(function(){
        var win = new BrowserWindow({ width: 1000, height: 600, autoHideMenuBar: true});
        win.openDevTools();
        win.loadURL('file://' + __dirname + '/deployment.html');
    });
});