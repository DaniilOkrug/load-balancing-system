#!/bin/bash

cd ExampleService/ 
sudo docker build -t myimage .
docker run -d -p 80:20500 myimage
cd ../
cd ClientServer/
pip install -r requirements.txt
cd src/
python3 ClientService.py
