from flask import Flask, request
import logging
import os
import json
import socket


app = Flask(__name__)

@app.route("/api/endpoint", methods=["POST"])
def endpoint():
    req_json = request.get_json()
    app.logger.info("Request data:")
    app.logger.info(req_json)
    return json.dumps({"requestDataEcho": req_json}) 

if __name__ == "__main__":
    app.logger.setLevel(logging.DEBUG)
    app.run(host='0.0.0.0', port=3000)

