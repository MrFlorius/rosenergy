import sys
import os
import json
from docxtpl import DocxTemplate

TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), "templates")

def load_document(path):
    if os.path.isabs(path):
        return DocxTemplate(path)

    return DocxTemplate(os.path.join(TEMPLATE_DIR, path))

def main():
    data = json.loads(sys.argv[1])
    doc = load_document(data["template"])
    context = data["context"]
    doc.render(context)
    doc.save(sys.stdout.buffer)

if __name__ == "__main__":
    main()