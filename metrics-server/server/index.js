const redis = require('redis');
const uuid = require('node-uuid');

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "../../metrics.proto";

const ids = [];

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

(async () => {
  const redisClient = redis.createClient();
  await redisClient.connect();
  redisClient.on('error', (err) => console.log('Redis Client Error', err));

  async function sendMetrics(call, callback) {
    // console.log(call.request);
    const id = uuid.v4()
    await redisClient.set(id, JSON.stringify(call.request));
    ids.push(id)

    console.log(call.getPeer())

    callback(null, {});
  }

  async function getMetrics(call, callback) {
    const data = []
    for (const curr_id of ids) {
      data.push(JSON.parse(await redisClient.get(curr_id)))
    }

    callback(null, {metrics: data});
  }


  const server = new grpc.Server();
  server.addService(metrics_proto.MetricsService.service, { sendMetrics, getMetrics });
  server.bindAsync('0.0.0.0:5000', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
  // await main();
})();