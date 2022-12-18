import sys
import socket
import psutil
import time
import grpc
import metrics_pb2 as pb2
import metrics_pb2_grpc as pb2_grpc

hostname = socket.gethostname()
ip = socket.gethostbyname(hostname)
with open('LoadBalancerAddress.txt', 'r') as file:
    address = file.read()
channel = grpc.insecure_channel(address)
stub = pb2_grpc.MetricsServiceStub(channel)


def get_info():
    return psutil.cpu_percent(interval=1, percpu=False), psutil.virtual_memory().percent


try:
    print(ip)
    while True:
        try:
            cpu, ram = get_info()
            time_current = int(time.time())
            message = pb2.MetricsMessage(cpu=cpu, ram=ram, timestamp=time_current, address=ip)
            stub.sendMetrics(message)
        except Exception:
            continue
except KeyboardInterrupt:
    print("shutting down")
    sys.exit()
