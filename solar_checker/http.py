import os


import socketpool

import wifi


from adafruit_httpserver import Server, Request, Response


ssid = os.getenv("CIRCUITPY_WIFI_SSID")

password = os.getenv("CIRCUITPY_WIFI_PASSWORD")


print("Connecting to", ssid)

wifi.radio.connect(ssid, password)

print("Connected to", ssid)


pool = socketpool.SocketPool(wifi.radio)

server = Server(pool, "/static", debug=True)



@server.route("/")

def base(request: Request):

    """

    Serve a default static plain text message.

    """

    return Response(request, "Hello from the CircuitPython HTTP Server!")



server.serve_forever(str(wifi.radio.ipv4_address))
