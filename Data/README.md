# Introduction to Data

Our Data is sourced from:
  - **Neilsen Bookscan** and their top 100 book data as provided to [1][*The Guardian*](https://www.theguardian.com/news/datablog/2011/jan/01       
     /top-100-books-of-all-time)
  - [**Goodreads**](https://www.goodreads.com) utilizing technology from the tool used in [2]*"The Goodreads 
     "Classics": A Computational Study of Readesr, Amazon,  
      and Crowdsourced Amateur Criticism"*

## Our Different Data

### top100_goodreads_cleaned.csv

Contains the following data for each of the top 100 books that also has information in Goodreads:
- 

### top100_genres.csv

Contains the following data for each of the top 100 books that also has information in Goodreads:
- 

### top100_ratings.csv

Contains the following data for each of the top 100 books that also has information in Goodreads:
- 

### top100_goodreads_shelves.csv

Contains the following data for each of the top 100 books that also has information in Goodreads:
- 

### top100_goodreads_ids.txt

Contains the Goodreads IDs for each of the top 100 books that can be found on Goodreads separated by a new line.

### top100_goodreads_uncleaned.csv

Contains the same data as top100_goodreads_cleaned, as well as columns of the less parsable versions of the genres,
  shelves, and ratings. This version is not indexed by the Goodreads_ID and includes an unecessary and extra 'index'
  column.

### cleaned_reviews_csvs

Contains the following data for each review of the top 100 books that also has information in Goodreads:
- 

### original_reviews_jsons

The original review data scraped from goodreads, formatted in json files 


## References 

 [1]Top-selling 100 books of all time. (n.d.). Retrieved from  
     The Guardian:      
     https://www.theguardian.com/news/datablog/2011/jan/01       
     /top-100-books-of-all-time 

 [2] Walsh, M., & Antoniak, M. (2021). The Goodreads 
     "Classics": A Computational Study of Readesr, Amazon,  
     and Crowdsourced Amateur Criticism. Journal of Cultural  
     Analytics, 243-287, doi: 10.22148/001c.22221
