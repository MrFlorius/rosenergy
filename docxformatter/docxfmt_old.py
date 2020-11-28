import sys
import os
import json
from docxtpl import DocxTemplate

TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), "templates")

def read(chunk_size=16):
  data = b''
  while True:
    chunk = os.read(sys.stdin.fileno(), chunk_size)

    if len(chunk) < chunk_size:
      return data + chunk

    data += chunk

def load_document(path):
    if os.path.isabs(path):
        return DocxTemplate(path)

    return DocxTemplate(os.path.join(TEMPLATE_DIR, path))


def main():
    with open("log.txt", 'w') as log:
        while True:
            try:
                response = read().decode('utf-8')
                log.write(response + "\n")
                data = json.loads(response)
                log.write(data + "\n")

                doc = load_document(data["template"])
                context = data["context"]
                doc.render(context)
                doc.save(sys.stdout.buffer)
            except:
                print("err")
                # exit(-1)

if __name__ == "__main__":
    main()