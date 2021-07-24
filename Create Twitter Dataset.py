# Install tweepy
pip install tweepy

Building a dataset from twitter

import tweepy

consumerKey = 'tt3PcBcQiSSUIXtbSgqpHAwEA'
consumerSecret = 'Y0x2RpZZlZNWtD2mNy3kSvICFypvcXyEiEKJf0yyb0IqQibJ4R'
accessToken = '1399800359913021441-lOydEfLIrnOBK8cVQ2chgOdtgrCbee'
accessTokenSecret = 'bSWzcqSpSUUePWwkjmZTr9w9W6ZKCDnNMld5UrMCVJqYw'

twitter_auth = tweepy.OAuthHandler(consumerKey, consumerSecret)
api = tweepy.API(twitter_auth)

tweets = api.search('movies', count=200) # tweets relating to the term in ‘ ‘

print(tweets)


import re
import pandas as pd
from textblob import TextBlob


# Storing features from the tweets that will be useful for machine learning later 
# This is broken into features relating to the tweet (prefixed with 'tweet_') and use related one (prefixed with 'user_')

# Creating pandas dataframe and creating columns for the items I am interested in from the Tweet data.
df = pd.DataFrame(columns=('tweet_text', 'tweet_sentiment', 'tweet_subjectivity',
                           'user_followers_count', 'user_friends_count',
                           'user_account_age', 'user_verified',
                           'user_favourites_count', 'user_tweets',
                           'tweet_retweeted', 'tweet_retweet_count', 'tweet_favourite_count'))

# Remove duplicates tweets
df.sort_values('tweet_text', inplace =True)
df.drop_duplicates(subset = 'tweet_text', keep = False, inplace = True)

for tweet in tweets:
  sentimentText = TextBlob(tweet.text) # Creating a sentiment measure for the tweet text using the TextBlob library
  df = df.append({'tweet_text': re.sub(r'http\S+', '', tweet.text), # Removing any URL's in the tweet text
                  'tweet_sentiment': sentimentText.sentiment.polarity,
                  'tweet_subjectivity': sentimentText.sentiment.subjectivity,
                  'user_followers_count': tweet.user.followers_count,
                  'user_friends_count': tweet.user.friends_count,
                  'user_account_age': tweet.user.created_at,
                  'user_verified': tweet.user.verified,
                  'user_favourites_count': tweet.user.favourites_count,
                  'user_tweets': tweet.user.statuses_count,
                  'tweet_retweeted': tweet.retweeted,
                  'tweet_retweet_count': tweet.retweet_count,
                  'tweet_favourite_count': tweet.favorite_count}, ignore_index = True)
  
df.head()


# Calculate tweet text length and the count of punctuation in the tweet text

# Tweet length
df['tweet_text_length'] = df['tweet_text'].apply(lambda x: len(x) - x.count(' '))

# Count of punctuation in the tweet
import string

def count_punc(text):
  count = sum([1 for char in text if char in string.punctuation])

df['tweet_text_punc_count'] = df['tweet_text'].apply(lambda x: count_punc(x))

df.head()





