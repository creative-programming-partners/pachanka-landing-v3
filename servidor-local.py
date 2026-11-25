"""Servidor para ver la web en este computador (lo abre ver-en-local.cmd).

En la web en vivo, Cloudflare achica las fotos al vuelo: una dirección como
  cdn-cgi/image/width=720,quality=80,format=auto/assets/img/dia-mesa.jpg
le pide la foto dia-mesa.jpg a 720 px de ancho. En este computador no hay
Cloudflare, así que este servidor entrega la foto original en su lugar.
"""
import http.server
import re
import sys

CLOUDFLARE = re.compile(r'^/cdn-cgi/image/[^/]+/')


class Servidor(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        return super().translate_path(CLOUDFLARE.sub('/', path))


if __name__ == '__main__':
    puerto = int(sys.argv[1]) if len(sys.argv) > 1 else 8182
    http.server.ThreadingHTTPServer(('127.0.0.1', puerto), Servidor).serve_forever()
