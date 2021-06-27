# Cookbooks explorer

Search for word frequencies in a corpus of cookbooks published in France and Germany from 1800 to 1940.

## Corpus

The corpus currently contains 296 cookbooks sourced from Gallica, Archive.org, Katalog Plus of Freiburg University and the Wienbibliothek. The complete list is available under `data/meta/cookbooks.csv`.

For the period 1800-1914, the 135 German cookbooks represent about 7% of the 2,000 cookbooks published in Germany (Coydon, 2015).

Cookbooks published by food (e.g. Schlink, Maggi) or food appliances companies (e.g. Weck) were not included in the corpus.

The definition of a cookbook is hard to come by. Some books tend towards nutrition or esotericism, others are written in verse. Some were published by the author and probably had very limited audiences, others had print runs above 40,000.

Each dot represents a physical book. There are many limitations to this approach, as a book published in separate bindings (such as _Comment on forme une cuisinière_, published in four volumes in 1904), weights four times as much as a similar book published in one volume.

## Words and bigrams

Words included in the dataset are words that appear at least five times over the entire data set.

Running the tool locally, you can load a dataset containing words and bigrams.

## Trendline

When more than 10 cookbooks mention the search terms, a trendline is shown. It is a non-linear lowess regression. The gray area represents the 95% confidence interval, computed by [Scikit](https://has2k1.github.io/scikit-misc/stable/generated/skmisc.loess.loess_prediction.html).

## OCR

OCR from French-language books was performed by the Internet Archive or by Gallica.

The OCR performed by Archive.org on German cookbooks in Fraktur was very poor. They were re-OCRized using Stefan Weil's new fraktur models for Tesseract (Weil, 2019).

### OCR quality

OCR quality was estimated using the mean language uncertainty, following Baumann (2015). 

For each book, a random sample of 200 lines was analyzed by [langid](https://github.com/saffsd/langid.py) (Lui and Baldwin, 2011), a programm that automatically detects the language a text was written in. The OCR quality of a book is the average of the normalized probability scores of these lines (lines that are not recognized in the correct language are assigned a score of 0).

## References

Baumann, Ryan. [Automatic evaluation of OCR quality](https://ryanfb.github.io/etc/2015/03/16/automatic_evaluation_of_ocr_quality.html). /etc (blog), 16 Mar 2015.

Coydon, Eva. "Les auteures allemandes de livres de cuisine (1800-1914)." Le Temps des medias 1, 2015, p. 117-130.

Lui, Marco and Timothy Baldwin [Cross-domain Feature Selection for Language Identification](http://www.aclweb.org/anthology/I11-1062), In _Proceedings of the Fifth International Joint Conference on Natural Language Processing (IJCNLP 2011)_, Chiang Mai, Thailand, 2011, p. 553—561.

Weil, Stefan. [Neue Frakturmodelle für Tesseract](https://madoc.bib.uni-mannheim.de/53748/1/2019-11-18.pdf). Kitodo Anwendertreffen 2019, Hamburg, Germany, 2019. 