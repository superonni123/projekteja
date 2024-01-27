import time
import os
import ipaddress
import wifi
import socketpool
import microcontroller


import board
import busio
import digitalio
import adafruit_ina260
from adafruit_httpserver import Server, Request, Response, REQUEST_HANDLED_RESPONSE_SENT



print("Connecting to WiFi")

#set pico ip, netmask and gateway
ipv4 =  ipaddress.IPv4Address("192.168.1.42")
netmask =  ipaddress.IPv4Address("255.255.255.0")
gateway =  ipaddress.IPv4Address("192.168.1.1")
wifi.radio.set_ipv4_address(ipv4=ipv4,netmask=netmask,gateway=gateway)

#  connect to your SSID
wifi.radio.connect(os.getenv('CIRCUITPY_WIFI_SSID'), os.getenv('CIRCUITPY_WIFI_PASSWORD'))

print("Connected to WiFi")

pool = socketpool.SocketPool(wifi.radio)
server = Server(pool, "/static", debug=True)


def webpage():
    html = f"""
        <!DOCTYPE html>
        <meta charset="utf-8">
        <html>
            <head>
                <title>Solr chkr</title>
            </head>
            <body>
                <h1>Solr chkr</h1>
                <p>Voltage: {voltage}</p>
                <p>Current: {current}</p>
                <p>Power: {power}</p>
            </body>
        </html>
        """
    return html

@server.route("/")
def base(request: Request):  # pylint: disable=unused-argument
    #  serve the HTML f string
    #  with content type text/html
    return Response(request, f"{webpage()}", content_type='text/html')


print("starting server..")
# startup the server
server.start(str(wifi.radio.ipv4_address))
print("Listening on http://%s:80" % wifi.radio.ipv4_address)



led = digitalio.DigitalInOut(board.LED)
led.direction = digitalio.Direction.OUTPUT


i2c = busio.I2C(scl=board.GP17, sda=board.GP16)
ina260 = adafruit_ina260.INA260(i2c)


led.value = True
time.sleep(1)
led.value = False
time.sleep(1)
led.value = True


while True:
    try:
        voltage = ina260.voltage
        current = ina260.current
        power = ina260.power
        print("Voltage:", voltage)
        print("Current:", current)
        print("Power:", power)
        
        pool_result = server.poll()
    
        if pool_result == REQUEST_HANDLED_RESPONSE_SENT:
        
            pass
    
        time.sleep(10) 

    except OSError as error:
            print(error)
            continue
