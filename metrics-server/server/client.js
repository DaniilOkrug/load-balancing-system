const PROTO_PATH = "../../metrics.proto";

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

const addresses = ['127.0.0.1', '127.0.0.2', '127.0.0.3', '127.0.0.4'];
let current = 0;

function main() {
    setInterval(() => {
        try {
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

            current++;
            current = current > 3 ? 0 : current;

            client.sendMetrics({
                timestamp: Date.now(),
                cpu: getRandomArbitrary(0, 100),
                ram: getRandomArbitrary(0, 100),
                address: addresses[current]
            }, function (err, response) {
                if (err) {
                    console.log(err);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }, 50)
}

main();

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}