# Load balancing service

Team members: Aisen Zhylkybay, Daniil Okrug, Maxim Latypov, Ruslan Khakimov.

The project is a service that balances requests to available servers and collects metrics.

## Deployment
### Load-balancer and Metrics micro-services

These 2 micro services need to be placed on one server, where NGINX will be configured, 
which will proxy user requests to connected executable servers.

It is assumed that you already have NodeJS with npm installed.

The main command to install all dependencies, which must be entered in the project directories. \
<code>npm i</code>

Next, we need to install the PM2 utility to monitor the operation of all services.\
<code>npm install pm2 -g</code>

We use Redis in the project to store information, so it also needs to be installed.\
<code>
sudo apt-get update\
sudo apt-get install redis
</code>

Now let's launch Redis. This can be done in a separate screen.\
<code>redis-server</code>

Each project needs to be launched separately using PM2 in its main directory. 
You can choose any name for your services. \
<code>pm2 start index.js --name {BALANCER/METRICS}</code>

*To view running services.\
<code>pm2 list</code>

*To view logs\
<code>pm2 logs</code>

*To view detailed description\
<code>pm2 show {service name}</code>

**To configure NGINX, you can use use a special configuration file in the repository.

### UI
First you need to install the project dependencies\
<code>npm i</code>

Starting UI on your localhost\
<code>npm start</code>

To install on hosting, you will need to build a project\
<code>npm run build</code>
