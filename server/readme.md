# API to query ngrams from cookbooks data

## Methods

### /list

Returns a list of available cookbooks

### /search?book_ids=[book ids]&q=[query]

Returns a list of books with title, pub_year and frequency for the sum of the terms queried

## Run server
```
python app.py
```