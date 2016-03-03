/**
 * Created by Administrator on 2016/3/2.
 */

$(function(){

    const ipcRenderer = require('electron').ipcRenderer;
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    $('#dashboard').click(function(){
        /*document.getElementById('dashboard').className='blog-nav-item active';
        document.getElementById('main').className='blog-nav-item';
        document.getElementById('addserver').className='blog-nav-item';
        document.getElementById('upload').className='blog-nav-item';*/
        //切换
        if( (document.getElementById('dashboard').className).indexOf('active') == -1){//在当前页面，点击导航栏按钮无事件，不在则切换
            ipcRenderer.send('SwitchToDashboardPage', 'SwitchToDashboardPage');
            ipcRenderer.on('SwitchToDashboardPage-reply', function(event, arg) {
                console.log("navbar.js: SwitchToDashboardPage-reply");//对应render进程已回收，不能打到console
                alert("dashboard");
            });
        }
    });
    $('#main').click(function(){
        //切换
        if( (document.getElementById('main').className).indexOf('active') == -1) {//在当前页面，点击导航栏按钮无事件，不在则切换
            ipcRenderer.send('SwitchToMainPage', 'SwitchToMainPage');
            ipcRenderer.on('SwitchToMainPage-reply', function (event, arg) {
                console.log("navbar.js: SwitchToMainPage-reply");//对应render进程已回收，不能打到console
                alert("main");
            });
        }
    });
    $('#addserver').click(function(){
        //弹框

        var win = new BrowserWindow({ width: 400, height: 450 });
        win.loadURL('file://' + __dirname + '/addserver.html');
    });
    $('#upload').click(function(){
        var win = new BrowserWindow({ width: 300, height: 800 });
        win.loadURL('https://www.baidu.com');
        //弹框
    });

});