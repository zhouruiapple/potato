/**
 * Created by Administrator on 2016/3/2.
 */

$(function(){
    $('#dashboard').click(function(){
        document.getElementById('dashboard').className='blog-nav-item active';
        document.getElementById('main').className='blog-nav-item';
        document.getElementById('addserver').className='blog-nav-item';
        document.getElementById('upload').className='blog-nav-item';
        document.getElementById('iframe').src = "test.html"
    });
    $('#main').click(function(){
        document.getElementById('dashboard').className='blog-nav-item';
        document.getElementById('main').className='blog-nav-item active';
        document.getElementById('addserver').className='blog-nav-item';
        document.getElementById('upload').className='blog-nav-item';
        document.getElementById('iframe').src = "http://www.baidu.com"
    });
    $('#addserver').click(function(){
        document.getElementById('dashboard').className='blog-nav-item';
        document.getElementById('main').className='blog-nav-item';
        document.getElementById('addserver').className='blog-nav-item active';
        document.getElementById('upload').className='blog-nav-item';
        document.getElementById('iframe').src = "http://www.sgcc.com.cn/"
    });
    $('#upload').click(function(){
        document.getElementById('dashboard').className='blog-nav-item';
        document.getElementById('main').className='blog-nav-item';
        document.getElementById('addserver').className='blog-nav-item';
        document.getElementById('upload').className='blog-nav-item active';
        document.getElementById('iframe').src = "https://www.tlss.space/"
    });

});