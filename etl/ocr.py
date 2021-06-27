import csv, fitz, os, sys
try:
    from PIL import Image
except ImportError:
    import Image
import pytesseract

# Fraktur data from https://ub-backup.bib.uni-mannheim.de/~stweil/ocrd-train/data/Fraktur_5000000/
# Filename: Fraktur_50000000.334_450937

# Selects files to process
with open("data/meta/cookbooks.csv") as cookbooks_file:
    cookbooks = csv.DictReader(cookbooks_file)
    for row in cookbooks:
        if int(row["id"]) >= 246 and row['orig_status'] == "pdf" and row['cur_status'] == "":
            print(row["id"])

            lang = 'Fraktur_50000000.334_450937'
            if row["language"] == "French":
                lang = 'fra'
            elif row["script"] == "latin":
                lang = 'deu'

            # Empty list for CSV file generation
            data = []

            doc = fitz.open("data/pdfs/" + row["filename"])
            for page in doc:
                
                # Converts PDF to image
                img_filename = "tmp/page-%i.png" % page.number
                pix = page.get_pixmap()
                image_size = pix.height * pix.width

                # Only increase image size if it's too small for OCR
                if image_size < 1000 * 1000:
                    pix = page.get_pixmap(matrix=fitz.Matrix(6,6))
                pix.save(img_filename)

                # OCR
                text = pytesseract.image_to_string(Image.open(img_filename), lang=lang)
                text = text.replace("ſ", "s")

                # Delete temp image file
                os.remove(img_filename)

                data.append(
                    {
                        "page_num": page.number,
                        "text": text
                    })

            with open("data/text_clean/" + row["filename"], "w") as csv_file:
                cols = data[0].keys()
                writer = csv.DictWriter(csv_file, fieldnames=cols)
                writer.writeheader()
                writer.writerows(data)