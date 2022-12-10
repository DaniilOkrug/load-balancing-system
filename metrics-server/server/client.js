const PROTO_PATH = "./metrics.proto";

var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var metrics_proto = grpc.loadPackageDefinition(packageDefinition);

function main() {
    var argv = parseArgs(process.argv.slice(2), {
        string: 'target'
    });

    var target;
    if (argv.target) {
        target = argv.target;
    } else {
        target = 'localhost:5000';
    }

    var client = new metrics_proto.MetricsService(target,
        grpc.credentials.createInsecure());
    var user;
    if (argv._.length > 0) {
        user = argv._[0];
    } else {
        user = 'world';
    }
    client.sendMetrics({
        timestamp: 1283761827,
        cpu: 1.1,
        ram: 2.2
    }, function (err, response) {
        console.log('Greeting:', response.message);
    });
}

main();