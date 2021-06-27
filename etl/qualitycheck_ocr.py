import csv, os, sys, datetime
import pandas as pd
import numpy as np
import langid

# Selects files to process
with open("data/meta/cookbooks.csv") as cookbooks_file:
    cookbooks = csv.DictReader(cookbooks_file)
    for row in cookbooks:
        try:
            df = pd.read_csv("data/text_clean/" + row["filename"])
        except FileNotFoundError:
            break
            pass
        
        if row['language'] == "French":
        	book_lang = "fr"
        elif row['language'] == "German":
        	book_lang = "de"

        series = df["text"].str.split("\n", expand=True).stack().reset_index(drop=True)
        
        # Empty lines
        series = series.str.strip()
        series.replace('', np.nan, inplace=True)

        # Lines containing only digits
        series.replace(r'^\d+$', np.nan, inplace=True, regex = True)

        series.dropna(inplace=True)

        sample_size = 200
        if len(series) < sample_size:
        	sample_size = len(series)

        print(row["title"], sample_size)

        sample = series.sample(sample_size)

        def classify(row):
        	classified = langid.classify(row)
        	if classified[0] != book_lang:
        		score = 0
        	else:
        		score = classified[1]
        	return score

        quality = sample.apply(classify)

        with open("etl/quality.log", "a+") as logfile:
        	print(row["id"], quality.mean(), str(datetime.datetime.now()), sample_size, file=logfile)