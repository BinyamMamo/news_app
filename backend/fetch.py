#!/usr/bin/env python3
"""
simple backend for fetching feeds from news api
"""
from newsapi import NewsApiClient
from pprint import pprint
from flask import Flask, render_template, jsonify
from flask_cors import CORS
import dotenv, os

dotenv.load_dotenv(override=True)
api = NewsApiClient(api_key=os.getenv("API_KEY"))
app = Flask(__name__)
CORS(app)


@app.route("/top_headlines")
def top_headlines():
    response = api.get_top_headlines(country="us")
    return jsonify(response)


def main():
    # pprint(headlines)
    app.run(port=5000, debug=True)


if __name__ == "__main__":
    main()
