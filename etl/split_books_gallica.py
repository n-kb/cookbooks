import csv, os, re, sys

def remove_html_tags(text):
    """Remove html tags from a string"""
    import re
    clean = re.compile('<.*?>')
    return re.sub(clean, '', text)

# Selects files to process
with open("data/meta/cookbooks.csv") as cookbooks_file:
	cookbooks = csv.DictReader(cookbooks_file)
	for row in cookbooks:
		if row["source"] == "Gallica" and row["status"] == "text":

			# Empty list for CSV file generation
			data = []

			with open("data/text/" + row["filename"], 'r') as f:
				pages = f.read().split("<hr>")
				page_num = 1

				for page in pages[1:]:
					# Processes pages from Gallica-generated HTML
					page = remove_html_tags(page)
					page.replace("&gt", "").replace("&lt", "")
					page_num = page_num + 1
					data.append(
						{
							"page_num": page_num,
							"text": page
						})

			with open("data/text_clean/" + row["filename"], "w") as csv_file:
				cols = data[0].keys()
				writer = csv.DictWriter(csv_file, fieldnames=cols)
				writer.writeheader()
				writer.writerows(data)