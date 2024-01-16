import http.server
import socketserver
import os

PORT = 8000
VIDEO_PATH = 'test.mp4'
CHUNK_SIZE = 10**6  # Adjust the chunk size as needed (1000000 Bytes)->(1 MB)  
# CHUNK_IN_MB = 2
# CHUNK_SIZE = int(CHUNK_IN_MB*(1024*1024))  # Adjust the chunk size as needed (1000000 Bytes)->(1 MB)  

class CustomRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            # Embed video with correct source
            self.wfile.write(b'<video width=250 src="/video" controls></video>')

        elif self.path == '/video':
            statinfo = os.stat(VIDEO_PATH)
            file_size = statinfo.st_size
            range_header = self.headers.get('Range')

            if range_header:
                print(range_header)
                start = int(range_header.replace("bytes=","").split("-")[0])
                end = min(start + CHUNK_SIZE, file_size - 1)
                
                content_length = end - start + 1
                print(start, end, content_length, file_size)

                self.send_response(206)
                self.send_header("Content-Type", "video/mp4")
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


# start server 
Handler = CustomRequestHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Serving at port", PORT)
    httpd.serve_forever()