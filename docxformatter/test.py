import sys
import os


def read(chunk_size=16):
  data = b''
  while True:
    chunk = os.read(sys.stdin.fileno(), chunk_size)

    if len(chunk) < chunk_size:
      return data + chunk

    data += chunk

# name = read().decode('utf-8')
print(__file__, sys.version, __name__)
# print(name + ", hello from python")