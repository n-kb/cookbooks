import re, sys, csv
import pandas as pd
from nltk.util import ngrams as nltkngrams

# Some books could not be paginated and have just 1 page
csv.field_size_limit(sys.maxsize)

common_words = [
	# Single letters, probably OCR errors
	"e", "p", "m", "n", "s", "f", "é", "è", "’", "’œ", 
	"î", "û", "â", "ô", "ê", "œ", "", "u"
	#Prepositions
	# "de", "d", "à", "en", "si", "pour", "par", ("sur", "le"), "quand",
	# "aus", "bei", "mit", "nach", "seit", "von", "zu", "ab", "an",
	# "auf", "aus", "bis", "durch", "in"
	# # Conjunctions
	# "qu", "et", "avec", "sur", "dans", "ou", "mais", "or", "car", "donc", ("avec", "une"), ("dans", "les"), ("avec", "un"), ("dans", "le"), ("dans", "la"),  ("et", "les"),
	# # Personnal pronouns
	# "elles", "ils", "il", "elle", "on", "se",
	# # Demonstrative pronouns
	# "cette", "c", "ce", "ces",
	# # Indefinite pronouns
	# "des", "une", "un", "du", ("de", "la"), "aux","au",
	# # Relative pronouns
	# "qui", "dont", "où", "que", ("que", "les"),
	# # Articles
	# "l", "les", "la", "le", ("à", "la"),
	# # Possessive pronouns
	# "sa", "son", "leur",
	# # To be, to have
	# "est", "sont", "a", "être", ("il", "est")
	]

# Selects files to process
with open("data/meta/cookbooks.csv") as cookbooks_file:
	cookbooks = csv.DictReader(cookbooks_file)
	for row in cookbooks:
		if row["cur_status"] != "words":

			# Opens cookbook
			print(row["filename"])
			content = ""
			try:
				with open("data/text_clean/" + row["filename"], 'r') as f:
					cookbook = csv.DictReader(f)
					for page in cookbook:
						content += " " + page["text"]

				# Lowercase and removes punctuation
				s = content.lower()
				s = re.sub(r'[\.,;:!%*–—\-»\(\)■\|⸗/]', ' ', s)
				s = s.replace("\n", " ")

				# Makes ngram
				tokens = [token for token in s.split(" ") if token != ""]
				output = list(nltkngrams(tokens, 2))
				
				# Adds single words and removes apostrophes
				s = re.sub(r'[\']', ' ', s)
				single_words = [token for token in s.split(" ") if token != ""]
				output += single_words

				ngrams = pd.Series(output)

				# Filters out common words
				ngrams = ngrams[~ngrams.isin(common_words)]

				# Computes frequency in a df
				df = pd.DataFrame(ngrams.value_counts(), columns=['ngrams'])
				df.rename(columns = {'ngrams':'count'}, inplace = True)
				df.index.name = 'ngram'
				df['total_words'] = len(single_words)
				df['frequency'] = df['count'] / df['total_words']

				# Saves to file
				df.to_csv("data/ngrams/" + row["filename"])
			
			except FileNotFoundError:
				pass