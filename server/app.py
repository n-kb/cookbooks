from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from search import search_query, get_books
import time

app = Flask(__name__)
CORS(app)

@app.route("/list", methods = ["GET"])
def list_books():
    return jsonify(get_books().to_dict(orient='records'))

@app.route("/search", methods = ["GET"])
def fetch_query():
    if 'ids' in request.args and request.args['ids'] != "":
        ids = request.args['ids'].split(",")
        for index, value in enumerate(ids):
            ids[index] = int(value)
    else:
        ids = None
    if 'q' in request.args:
        q = request.args['q'].split(",")
        
        # Trims query
        for index, value in enumerate(q):
            q[index] = value.strip()

        # Converts bigrams into tuple
        for index, value in enumerate(q):
            if len(value.split(" ")) == 2:
                q[index] = str(tuple(value.split(" ")))
            elif len(value.split(" ")) > 2:
                q[index] = str(tuple(value.split(" ")[0:1]))
    else:
        return "Error: No query provided. Please specify at least search term."

    results = search_query(ids, q)
    response = jsonify({
        "query": q,
        "in_books": ids,
        "aggregate_results": results[0],
        "results": results[1],
        "lowess": results[2]})
    return response



if __name__ == "__main__":
    app.run()