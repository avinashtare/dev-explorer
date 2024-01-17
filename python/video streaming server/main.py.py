import http.server
import os


PORT = 3000
class CustomRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        VIDEO_PATH = './test.mp4'
        CHUNK_IN_MB = 5
        CHUNK_SIZE = int(CHUNK_IN_MB*(1024*1024))
        statinfo = os.stat(VIDEO_PATH)
        file_size = statinfo.st_size
        
        self.send_response(206)
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        self.send_header("Content-Type", "video/mp4")

        try:
            # if user comes direct from /video then header will not exist then show error 
            range_header = self.headers.get('Range','bytes=0- ')
            start = int(range_header.replace("bytes=","").split("-")[0])
            end = min(start + CHUNK_SIZE, file_size - 1)
            
            content_length = end - start + 1
            print(start, end, content_length, file_size)

            self.send_header("Content-Range", f"bytes {start}-{end}/{file_size}")
            self.send_header("Accept-Ranges", "bytes")
            self.send_header("Content-Length", content_length)
            self.end_headers()

            with open(VIDEO_PATH, "rb") as file:
                file.seek(start)
                while content_length > 0:
                    chunk_size = min(CHUNK_SIZE, content_length)
                    chunk = file.read(chunk_size)
                    if not chunk:
                        break
                    self.wfile.write(chunk)
                    content_length -= len(chunk)
        except ConnectionError:
            # print("user not connected")
            pass
        

server = http.server.HTTPServer(("0.0.0.0", PORT),CustomRequestHandler)
print("Serving at port", PORT)
server.serve_forever()