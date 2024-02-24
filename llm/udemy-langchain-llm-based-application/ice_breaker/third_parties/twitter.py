import json
import logging
from datetime import datetime, timezone
from dateutil.parser import parse as parse_datetime

logger = logging.getLogger("twitter")


APIFY_TWITTER_JSON = "./third_parties/tweets.json"

def scrape_user_tweets(username, num_tweets=5):
    """Scrapes a Twitter users's original tweets (i.e., not retweets or
    replies) and returns them as a list of dictionaries.Each dictionary has
    three fields: "time_posted" (relative to now), "text", and "url".
    """

    tweet_list = []
    with open(APIFY_TWITTER_JSON, "r") as json_file:
        for tweet in json.load(json_file):
            if "RT @" not in tweet["full_text"] and not tweet[
                "full_text"
            ].startswith("@"):
                tweet_dict = {}
                tweet_dict["text"] = tweet["full_text"]
                tweet_dict[
                    "url"
                ] = f"https://twitter.com/{username}/status/{tweet['id']}"
                tweet_dict["time_posted"] = str(
                    datetime.now(timezone.utc)
                    - parse_datetime(tweet["created_at"])
                )
            tweet_list.append(tweet_dict)
    return tweet_list
