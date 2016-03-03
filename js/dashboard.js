
$(function () {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    /**********************************container1 *************************************************/
    var chart1 = new Highcharts.Chart({
        chart: {
            renderTo: 'container1',
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                viewDistance: 25,
                depth: 40
            }
        },

        title: {
            text: null
        },
        credits:{
            enabled: false
        },
        xAxis: {
            categories: ['安装',  '升级', '配置']
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Number'
            }
        },

        tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
        },

        plotOptions: {
            column: {
                stacking: 'normal',
                depth: 40
            }
        },

        series: [{
            name: '成功',
            data: [50, 3, 4],
            stack: 'male'
        }, {
            name: '失败',
            data: [3, 4, 4],
            stack: 'male'
        },
        ]
    });

    /**********************************container2 *************************************************/
    var chart2 = new Highcharts.Chart({
        chart: {
            renderTo: 'container2',
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: null
        },
        credits:{
            enabled: false
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'SeverStatus',
            data: [
                ['运行', 99],
                {
                    name: '关机',
                    y: 4,
                    sliced: true,
                    selected: true
                },
                ['重启', 2],
                ['挂起', 1],
                ['停止', 3],
                ['其他', 0]
            ]
        }]
    });
    /**********************************container3*************************************************/
    var chart3 = new Highcharts.Chart({
        chart: {
            renderTo: 'container3',
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: null
        },
        credits:{
          enabled: false
        },
        exports:{
            enabled: true
        },
        pane: {
            startAngle: -130,
            endAngle: 130,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 100,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 1,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: '使用率%'
            },
            plotBands: [{
                from: 0,
                to: 50,
                color: '#55BF3B' // green
            }, {
                from: 50,
                to: 80,
                color: '#DDDF0D' // yellow
            }, {
                from: 80,
                to: 100,
                color: '#DF5353' // red
            }]
        },

        series: [{
            name: 'Speed',
            data: [3],
            tooltip: {
                valueSuffix: '%'
            }
        }]

    },
    // Add some life
    function (chart) {
        if (!chart.renderer.forExport) {
            setInterval(function () {
                var point = chart.series[0].points[0],
                    newVal,
                    inc = Math.round((Math.random() - 0.5) * 20);
                newVal = point.y + inc;
                if (newVal < 0 || newVal > 100) {
                    newVal = point.y - inc;
                }

                point.update(newVal);

            }, 3000);
        }
    });

    /********************************container4********************************************/
    var chart4 = new Highcharts.Chart({
        chart: {
            renderTo: 'container4',
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = Math.random();
                        series.addPoint([x, y], true, true);
                    }, 2000);
                }
            }
        },
        title: {
            text: null
        },
        credits:{
            enabled: false
        },
        exports:{
            enabled: true
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: '使用率(%)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            tickPositions: [0, 0.2, 0.4,0.6, 0.8,1] //固定Y轴坐标

        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Random data',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 2000,
                        y: 0
                    });
                }
                return data;
            }())
        }]
    });

    /********************************container5**************************************/


    /********************************IPC*********************************************/
    var a = "hello dsxing";
    const ipcRenderer = require('electron').ipcRenderer;
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

    ipcRenderer.on('asynchronous-reply', function(event, arg) {
        console.log(arg); // prints "pong"
    });
    ipcRenderer.send('asynchronous-message', 'ping');

    /********************************ajax********************************************/
    /*ipcRenderer.send('rendDataToChart1Async', 'Chart1');
    ipcRenderer.on('rendDataToChart1Async-reply', function(event, arg) {
        console.log("Render Proccess: Get data from main proccess,Data="+arg);

    });*/
});

