import csv, time
import pandas as pd
import numpy as np

df = pd.DataFrame()
book_num = 0
startTime = time.time()
df_loadedbooks = pd.DataFrame()
with open("../data/meta/cookbooks.csv") as cookbooks_file:
    cookbooks = csv.DictReader(cookbooks_file)
    df_cookbooks = pd.read_csv("../data/meta/cookbooks.csv")
    for row in cookbooks:
        if book_num < 1000:
            try:
                df_tmp = pd.read_csv("../data/words/" + row["filename"])
                df_tmp["book_id"] = int(row["id"])
                df = df.append(df_tmp)
                book_num+=1
                df_loadedbooks = df_loadedbooks.append(df_cookbooks[df_cookbooks["id"] == int(row["id"])])
                print(row["title"])
            except FileNotFoundError:
                pass
        
executionTime = (time.time() - startTime)
print('Loaded %d books in %d seconds.' % (book_num, executionTime))

df_loadedbooks.fillna('', inplace=True)
df_loadedbooks.drop(['cur_status', 'filename','orig_status'], axis=1, inplace=True)
df_loadedbooks.to_csv('data/loadedbooks.csv')

# Removes words that are only present less than X times in the dataset
df_pivoted = pd.pivot_table(df, values=['count'], index=['ngram'], aggfunc=np.sum)
df_pivoted.reset_index(inplace = True)
df_pivoted = df_pivoted[df_pivoted["count"]>4]

df = df[df["ngram"].isin(df_pivoted['ngram'])]

df.to_csv('data/data.csv')