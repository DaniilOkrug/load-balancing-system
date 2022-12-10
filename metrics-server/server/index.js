const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "./metrics.proto";

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
    const metrics_proto = grpc.loadPackageDefinition(packageDefinition);

function sendMetrics(call, callback) {
  console.log(call);

  callback(null, {});
}

function main() {
  const server = new grpc.Server();
  server.addService(metrics_proto.MetricsService.service, {sendMetrics});
  server.bindAsync('0.0.0.0:5000', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();