import csv, os, re, sys

# Selects files to process
with open("data/meta/cookbooks.csv") as cookbooks_file:
	cookbooks = csv.DictReader(cookbooks_file)
	for row in cookbooks:
		if row["source"] == "Staatsbibliothek zu Berlin" and row["orig_status"] == "text":

			# Empty list for CSV file generation
			data = []

			with open("data/text/" + row["filename"], 'r') as f:
				# Heuristic: Pages are often indicated as eg "— 22 —"
				# But not always
				pages = f.read().split(r"— \d+ —")
				page_num = 1

				for page in pages:
					page_num = page_num + 1
					data.append(
						{
							"page_num": page_num,
							"text": page.strip()
						})

			with open("data/text_clean/" + row["filename"], "w") as csv_file:
				cols = data[0].keys()
				writer = csv.DictWriter(csv_file, fieldnames=cols)
				writer.writeheader()
				writer.writerows(data)