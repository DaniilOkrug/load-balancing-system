# Load balancing service

Team members: Aisen Zhylkybay, Daniil Okrug, Maxim Latypov, Ruslan Khakimov.

The project is a service that balances requests to available servers and collects metrics.

*Additional **README** files you can find in project folders*

## Project folder structure

* balancer/ - load-balancer service which includes balancer and mettrics micro-service
* ClienSide/ - the executing server where the requests are sent
* metrics-ui/ - React application for showing servers metrics
* tester/ - NodeJS tester for making requests to the balancer