# DEV-ONLY threaded static file server (avoids single-thread stalls under
# the browser's parallel keep-alive connections). Run via launch.json.
#   python assets/partials/devserver.py
import sys, os
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5599
# Serve from the project root regardless of CWD.
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))

class Handler(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    def log_message(self, *a):  # quiet
        pass

ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
