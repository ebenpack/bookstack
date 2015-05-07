import requests
import json


def parse_book(book):
    books = []
    # from pudb import set_trace; set_trace()
    for b in book["items"]:
        newb = {'title': '', 'authors': [], 'publisher': '',
        'pages': 0, 'img': '', 'categories': [], 'isbn': ''}
        for info in b["volumeInfo"]:
            if info in ['title', 'authors', 'publisher', 'pageCount']:
                newb[info] = b["volumeInfo"][info]
        if "imageLinks" in b["volumeInfo"]:
            newb["img"] = b["volumeInfo"]["imageLinks"]["smallThumbnail"]
        if "pageCount" in  newb:
            newb["pages"] = newb["pageCount"]
            del newb["pageCount"]
        if "industryIdentifiers" in b["volumeInfo"]:
            for isbn in b["volumeInfo"]["industryIdentifiers"]:
                if isbn["type"] == "ISBN_10":
                    newb["isbn"] = isbn["identifier"]
                if isbn["type"] == "ISBN_13":
                    newb["isbn"] = isbn["identifier"]
                    break
        books.append(newb)
    return books


def fetch_google_book(isbn):
    url = "https://www.googleapis.com/books/v1/volumes?q="
    key = "redacted"
    r = requests.get(url + "isnb:" + isbn + key)
    parsed = parse_book(r.json())
    return parsed
