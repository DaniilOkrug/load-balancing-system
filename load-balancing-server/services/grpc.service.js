const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
var parseArgs = require('minimist');

const PROTO_PATH = "../metrics.proto";

class GrpcSerice {
    #metrics_proto;
    constructor() {
        const packageDefinition = protoLoader.loadSync(
            PROTO_PATH,
            {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });
        const metrics_proto = grpc.loadPackageDefinition(packageDefinition);
        this.#metrics_proto = metrics_proto;
    }

    getMetrics() {
        return new Promise((resolve) => {
            var argv = parseArgs(process.argv.slice(2), {
                string: 'target'
            });

            var target;
            if (argv.target) {
                target = argv.target;
            } else {
                target = 'localhost:5000';
            }

            var client = new this.#metrics_proto.MetricsService(target,
                grpc.credentials.createInsecure());
            var user;
            if (argv._.length > 0) {
                user = argv._[0];
            } else {
                user = 'world';
            }

            client.getMetrics({}, function (err, response) {
                if (err) {
                    console.log(err);
                }

                resolve(response)
            });
        })
    }
}

module.exports = new GrpcSerice()