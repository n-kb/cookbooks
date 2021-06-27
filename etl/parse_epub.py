import ebooklib, csv, sys
from bs4 import BeautifulSoup
import regex as re
from ebooklib import epub

disclaimer = "This book was produced in EPUB format by the Internet Archive. The book pages were scanned and converted to EPUB format automatically. This process relies on optical character recognition, and is somewhat susceptible to errors. The book may not offer the correct reading sequence, and there may be weird characters, non-words, and incorrect guesses at structure. Some page numbers and headers or footers may remain from the scanned page. The process which identifies images might have found stray marks on the page which are not actually images from the book. The hidden page numbering which may be available to your ereader corresponds to the numbered pages in the print edition, but is not an exact match;  page numbers will increment at the same rate as the corresponding print edition, but we may have started numbering before the print book's visible page numbers.  The Internet Archive is working to improve the scanning process and resulting books, but in the meantime, we hope that this book will be useful to you. The Internet Archive was founded in 1996 to build an Internet library and to promote universal access to all knowledge. The Archive's purposes include offering permanent access for researchers, historians, scholars, people with disabilities, and the general public to historical collections that exist in digital format. The Internet Archive includes texts, audio, moving images, and software as well as archived web pages, and provides specialized services for information access for the blind and other persons with disabilities.Created with abbyy2epub (v.1.7.6)"

def remove_html_tags(text):
    """Remove html tags from a string"""
    import re
    clean = re.compile('<.*?>')
    return re.sub(clean, '', text)

# Selects files to process
with open("data/meta/cookbooks.csv") as cookbooks_file:
	cookbooks = csv.DictReader(cookbooks_file)
	for row in cookbooks:
		if row["source"] == "Archive.org" and row["status"] == "text":

			# Parses epub
			book = epub.read_epub("data/text/" + row["filename"])
			print("---")
			print(book.get_metadata('DC', 'title'))
			print(row["filename"])
			text = ""

			for item in book.get_items():	
				# Item of type "document" eg HTML
				if item.get_type() == 9:

					text += item.get_body_content().decode("utf-8") 

			# Splits pages on the HTML attribute for page breaks
			# Adds new <> signs to allow for simple removal of HTML tags
			text = text.replace('epub:type="pagebreak"', ">[[PAGEBREAK]]<span")
			text = text.replace('class="newpage"', ">[[PAGEBREAK]]<span")
			text = text.replace('class="x-ebookmaker-pageno"', ">[[PAGEBREAK]]<span")
			pages = text.split("[[PAGEBREAK]]")

			# Saves each page
			data = []
			page_num = 0
			for page in pages:
				page = remove_html_tags(page)
				# Removes disclaimer from Internet Archive
				page = page.replace(disclaimer, "")
				page_num = page_num + 1
				data.append(
					{
						"page_num": page_num,
						"text": page
					})
			print(page_num)
			# Saves to CSV
			with open("data/text_clean/" + row["filename"], "w") as csv_file:
				cols = data[0].keys()
				writer = csv.DictWriter(csv_file, fieldnames=cols)
				writer.writeheader()
				writer.writerows(data)