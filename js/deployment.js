/**
 * Created by Administrator on 2016/3/3.
 */

$(function(){
    var nodes = null;
    var edges = null;
    var network = null;
    var amountOfNodes = 100;
    var error_nodes = [];
    var error_links = [];

    function focusNodeById(nodeId) {
        var options = {
            scale: 1.0,
            offset: {x:0,y:0},
            animation: {
                duration: 1000,
                easingFunction: 'easeInOutQuad'
            }
        };
        network.focus(nodeId, options);
    }

    function generate_error_nodes() {
        var nodeId = Math.floor(Math.random() * amountOfNodes);
        error_nodes.push(nodeId);
        var sns = [];
        sns.push(nodeId);
        network.selectNodes(sns, true);
        network.editNode();
    }

    function generate_error_links() {

    }

    function monitor_errors() {
        var error_node_id = error_nodes.pop();
        if(undefined != error_node_id) {
            focusNodeById(error_node_id);
        }
    }

    var error_nodes_interval = setInterval(generate_error_nodes, 5000);
    var error_links_interval = setInterval(generate_error_links, 5000);
    var monitor_errors_interval = setInterval(monitor_errors, 1000);

    function onOffAssistMonitor() {
        if(undefined == monitor_errors_interval) {
            monitor_errors_interval = setInterval(monitor_errors, 1000);
            $('#errorlocation').text('ON');
        }
        else {
            clearInterval(monitor_errors_interval);
            monitor_errors_interval = undefined;
            $('#errorlocation').text('OFF');
        }
    }

    function destroy() {
        if (network !== null) {
            network.destroy();
            network = null;
        }
    }

    function draw() {
        destroy();
        statusUpdateSpan = document.getElementById('statusUpdate');
        doButton = document.getElementById('btnDo');
        focusButton = document.getElementById('btnFocus');
        showButton = document.getElementById('btnShow');

        // randomly create some nodes and edges
        var data = getScaleFreeNetwork(amountOfNodes);
        nodes = data.nodes;
        edges = data.edges;

        // create a network
        var container = document.getElementById('mynetwork');
        var options = {
            physics: {
                stabilization: {
                    iterations: 1200
                }
            },
            manipulation: {
                addNode: function (data, callback) {
                },
                editNode: function (data, callback) {
                    // filling in the popup DOM elements
                    data.image = './visjs/img/refresh-cl/System-Globe-icon.png'
                    callback(data);
                },
                addEdge: function (data, callback) {
                },
                enabled: false,
            }
        };
        network = new vis.Network(container, data, options);

        network.on("click", function (params) {
            $('#tooltip').css('visibility', 'visible');
            $('#tooltip').text(JSON.stringify(params, null, 4));
        });
    }


    if(undefined == monitor_errors_interval) {
        $('#errorlocation').text('OFF');
    }
    else {
        $('#errorlocation').text('ON');
    }
    draw();
});