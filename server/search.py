import pandas as pd
import numpy as np
import csv, time
from skmisc.loess import loess

df = pd.read_csv('data/data.csv')
df_loadedbooks = pd.read_csv('data/loadedbooks.csv')
df_loadedbooks.fillna('', inplace=True)

def get_books():
    return df_loadedbooks

def search_query(ids, q):
    startTime = time.time()

    # Catches all ids if none is specified
    if ids == None:
    	ids = list(df_loadedbooks["id"])
    
    df_results = df[df["ngram"].isin(q) & df["book_id"].isin(ids)]
    
    executionTime = (time.time() - startTime)

    print('Loaded query in %f seconds.' % (executionTime))

    if len(df_results) == 0:
        return False, False, False

    # Merges with cookbooks df to provide metadata
    df_results = df_results.merge(df_loadedbooks, left_on='book_id', right_on='id')
    df_results.fillna('', inplace=True)

    # Pivot the results to obtain data for scatter plot
    df_aggregate = pd.pivot_table(df_results, values=['frequency'], index=['book_id', 'pub_year', 'title', 'edition'], aggfunc=np.sum)
    df_aggregate.reset_index(inplace=True)

    # Computes Lowess fit with confidence interval
    period = np.arange(df_aggregate['pub_year'].astype(float).min()
 	                  ,df_aggregate['pub_year'].astype(float).max()
 	                  ,1 )
    
    y = df_aggregate['frequency'].to_numpy()
    x = df_aggregate['pub_year'].astype(float).to_numpy()

    try:
	    l = loess(x,y)
	    l.fit()
	    pred = l.predict(period, stderror=True)
	    conf = pred.confidence()

	    lowess = pred.values
	    ll = conf.lower
	    ul = conf.upper

	    lowess_result = []
	    for index, year in enumerate(period.tolist()):
	    	lowess_result.append({"year": year, 
	    		                  "lowess": lowess[index], 
	    		                  "ll": ll[index],
	    		                  "ul": ul[index]})

    # In case not enough data produce an error for the loess
    except ValueError:
    	lowess_result = []
    	pass

    return df_aggregate.to_dict(orient='records'), df_results.to_dict(orient='records'), lowess_result