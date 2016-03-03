/**
 * Created by Alex on 5/20/2015.
 */

var apps = [];
apps.push({name: "tomcat", description: "Web Container", image: "Hardware-My-Computer-3-icon", onimage: "System-Globe-icon"},
    {name: "weblogic", description: "Web Container", image: "Hardware-Laptop-1-icon", onimage: "System-Globe-icon"},
    {name: "memcache", description: "Distribute Memory Cache", image: "Hardware-Fax-icon", onimage: "System-Globe-icon"},
    {name: "rabbitmq", description: "C Base Message Queue", image: "Misc-Scanner-default-icon", onimage: "System-Globe-icon"},
    {name: "grpc", description: "Google RPC Service Based On Protobuf", image: "Network-Drive-icon", onimage: "System-Globe-icon"},
    {name: "mysql", description: "Opensource Database", image: "Network-Pipe-icon", onimage: "System-Globe-icon"});

var DIR = 'visjs/img/refresh-cl/';

function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                success(JSON.parse(xhr.responseText));
            }
            else {
                error(xhr);
            }
        }
    };
    xhr.open('GET', path, true);
    xhr.send();
}


function getScaleFreeNetwork(nodeCount) {
    var nodes = [];
    var edges = [];
    var connectionCount = [];

    // randomly create some nodes and edges
    for (var i = 0; i < nodeCount; i++) {
        var app = apps[i % 6];
        nodes.push({
            id: i,
            label: app.name,
            image: DIR + app.image + '.png',
            shape: 'image',
            app: app
        });

        connectionCount[i] = 0;

        // create edges in a scale-free-network way
        if (i == 1) {
            var from = i;
            var to = 0;
            edges.push({
                from: from,
                to: to
            });
            connectionCount[from]++;
            connectionCount[to]++;
        }
        else if (i > 1) {
            var conn = edges.length * 2;
            var rand = Math.floor(Math.random() * conn);
            var cum = 0;
            var j = 0;
            while (j < connectionCount.length && cum < rand) {
                cum += connectionCount[j];
                j++;
            }


            var from = i;
            var to = j;
            edges.push({
                from: from,
                to: to
            });
            connectionCount[from]++;
            connectionCount[to]++;
        }
    }

    return {nodes: nodes, edges: edges};
}

var randomSeed = 764; // Math.round(Math.random()*1000);
function seededRandom() {
    var x = Math.sin(randomSeed++) * 10000;
    return x - Math.floor(x);
}

function getScaleFreeNetworkSeeded(nodeCount, seed) {
    if (seed) {
        randomSeed = Number(seed);
    }
    var nodes = [];
    var edges = [];
    var connectionCount = [];
    var edgesId = 0;


    // randomly create some nodes and edges
    for (var i = 0; i < nodeCount; i++) {
        nodes.push({
            id: i,
            label: String(i)
        });

        connectionCount[i] = 0;

        // create edges in a scale-free-network way
        if (i == 1) {
            var from = i;
            var to = 0;
            edges.push({
                id: edgesId++,
                from: from,
                to: to
            });
            connectionCount[from]++;
            connectionCount[to]++;
        }
        else if (i > 1) {
            var conn = edges.length * 2;
            var rand = Math.floor(seededRandom() * conn);
            var cum = 0;
            var j = 0;
            while (j < connectionCount.length && cum < rand) {
                cum += connectionCount[j];
                j++;
            }


            var from = i;
            var to = j;
            edges.push({
                id: edgesId++,
                from: from,
                to: to
            });
            connectionCount[from]++;
            connectionCount[to]++;
        }
    }

    return {nodes: nodes, edges: edges};
}