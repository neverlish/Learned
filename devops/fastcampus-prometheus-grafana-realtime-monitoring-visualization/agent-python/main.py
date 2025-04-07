import http.server
import time

from prometheus_client import Histogram, start_http_server

histogram = Histogram(
    "response_time_histogram",
    "Response time of a request",
    buckets=[0.0003, 0.00035, 0.0004, 0.0005],
)


class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        start = time.time()
        self.send_response(200)
        self.wfile.write(b"Histogram Test")
        histogram.observe(time.time() - start)


if __name__ == "__main__":
    start_http_server(8081)
    server = http.server.HTTPServer(("localhost", 8080), Handler)
    print("Exporter running on 8081")
    print("Server running on 8080")
    server.serve_forever()
