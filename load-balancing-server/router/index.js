const Router = require("express").Router;
const axios = require("axios");
const grpcService = require("../services/grpc.service");
const router = new Router();

router.get("/getMetrics", async (req, res) => {
    const data = await grpcService.getMetrics();
    console.log(data);

    const result = []

    for (const metric of data.metrics) {
        const serverData = result.find(item => item.address === metric.address)
        const index = result.indexOf(serverData);

        if (index > -1) {
            delete metric.address
            result[index].data.push(metric)
        } else {
            delete metric.address
            result.push({
                address: metric.address,
                data: [metric]
            })
        }
    }

    res.json(result);
});

module.exports = router;