require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const router = require("./router/index");

app.use("/api", router);

const servers = ["http://localhost:3000", "http://localhost:3001"];

let current = 0;

const proxyReqHandler = async (req, res) => {
  const { method, url, headers, body } = req;

  const server = servers[current];

  current === servers.length - 1 ? (current = 0) : current++;

  try {
    const response = await axios({
      url: `${server}${url}`,
      method: method,
      headers: headers,
      data: body,
    });
    res.send(response.data);
  } catch (err) {
    res.status(500).send("Server error!");
  }
};

app.use((req, res) => {
    proxyReqHandler(req, res);
});

app.listen(process.env.PORT, (err) => {
  err
    ? console.error(`Failed to listen on PORT ${process.env.PORT}`)
    : console.log(
        "Load Balancer Server " + `listening on PORT ${process.env.PORT}`
      );
});
