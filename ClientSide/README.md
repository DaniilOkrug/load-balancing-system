# ClientServer and Test API example 
## Deployment
After installing and running loadbalancer install ClientServer, for convenience written `StartScript.sh` before running give the script the right to run

<code>
sudo chmod +x StartScript.sh
</code>

***ALSO*** make sure that you enter the ip address of your loadbalancer correctly in   `ClientServer/src/LoadBalancerAddress.txt`

It creates a docker image like ExampleService which is an API service that has:
1. `get` query that returns `{message:Hello}` 
2. `post /sum` query that takes two numbers `a` and `b` and returns their sum
3. `post /division` query that takes two numbers `a` and `b` and returns their division
4. `post /fibonacci`  query that takes the number `n` and returns the nth Fibonacci number
And runs it on port 80. The script then runs `ClientServer/src/ClientService.py`

For convenience you can run `ClientService.py` as `.system` if you have `systemctl` or `systemd` installed:
1. Install all the packages in the `ClientServer/requirements.txt` folder (for `python version 3.10`) 
   <code>
   pip install -r requirements.txt
   </code>
2. Create `.service` file by command <code>sudo nano /lib/systemd/system/ClientService.service</code> and write to this file:

	<code>
	[Unit]

	Description=ClientService.py as service

	[Service]
	
	WorkingDirectory=/home/`usrname`/Desktop/Load-Balancing-Service/ClientSide/ClientServer/src/

	ExecStart=python /home/`username`/Desktop/Load-Balancing-Service/ClientSide/ClientServer/src/ClientService.py

	Environment="PYTHONPATH=$PYTHONPATH:/home/`username`/.local/lib/python3.10/site-packages"	

	[Install]

	WantedBy=multi-user.target
	</code>

3. Then restart your `systemctl` or `systemd`

	`sudo systemctl daemon-reload`

4. Enable and start this `.service`

	`sudo systemctl enable ClientService.service`
	
	`sudo systemctl start ClientService.service`

5. Check their status

	`sudo systemctl status ClientService.service`

*Also you can use `screen` for running script*