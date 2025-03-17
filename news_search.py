import datetime
import pandas as pd
import requests
from bs4 import BeautifulSoup
from flask import Flask, request, render_template, redirect, url_for
import pypugjs.ext.jinja  # pypugjs 사용

app = Flask(__name__)
app.jinja_env.add_extension('pypugjs.ext.jinja.PyPugJSExtension')

news_cache = []  # 뉴스 데이터를 저장하는 캐시

def search_google_news(query):
    """ 구글 뉴스 검색 """
    url = f"https://news.google.com/search?q={query}&hl=ko&gl=KR&ceid=KR:ko"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print("❌ 구글 뉴스 검색 실패")
        return []
    
    soup = BeautifulSoup(response.text, 'html.parser')
    results = soup.select("article h3 a")
    
    news_list = []
    for result in results:
        title = result.get_text()
        url = "https://news.google.com" + result.get("href", "#")[1:]  # 상대 URL 변환
        source = "Google News"
        date = datetime.datetime.now().strftime('%Y-%m-%d')
        date_obj = datetime.datetime.strptime(date, '%Y-%m-%d')
        news_list.append({'title': title, 'url': url, 'date': date_obj, 'source': source})
    
    return news_list

def search_cnn_news(query):
    """ CNN 뉴스 검색 """
    url = f"https://edition.cnn.com/search?q={query}"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print("❌ CNN 뉴스 검색 실패")
        return []
    
    soup = BeautifulSoup(response.text, 'html.parser')
    results = soup.select(".cnn-search__result-headline a")
    
    news_list = []
    for result in results:
        title = result.get_text()
        url = "https://edition.cnn.com" + result.get("href", "#")
        source = "CNN"
        date = datetime.datetime.now().strftime('%Y-%m-%d')
        date_obj = datetime.datetime.strptime(date, '%Y-%m-%d')
        news_list.append({'title': title, 'url': url, 'date': date_obj, 'source': source})
    
    return news_list

def search_naver_news(query):
    """ 네이버 뉴스 검색 """
    url = f"https://search.naver.com/search.naver?where=news&query={query}"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print("❌ 네이버 뉴스 검색 실패")
        return []
    
    soup = BeautifulSoup(response.text, 'html.parser')
    results = soup.select(".news_tit")
    
    news_list = []
    for result in results:
        title = result.get_text()
        url = result.get("href", "#")
        source = "네이버 뉴스"
        date = datetime.datetime.now().strftime('%Y-%m-%d')
        date_obj = datetime.datetime.strptime(date, '%Y-%m-%d')
        news_list.append({'title': title, 'url': url, 'date': date_obj, 'source': source})
    
    return news_list

def search_news(query):
    """ 다양한 뉴스 소스에서 검색 """
    global news_cache
    google_news = search_google_news(query)
    cnn_news = search_cnn_news(query)
    naver_news = search_naver_news(query)
    
    all_news = google_news + cnn_news + naver_news
    sorted_news = sorted(all_news, key=lambda x: x['date'], reverse=True)
    news_cache = sorted_news  # 캐시에 저장
    return sorted_news

@app.route('/', methods=['GET', 'POST'])
def index():
    global news_cache
    query = ""
    
    if request.method == 'POST':
        query = request.form['query']
        news_cache = search_news(query)
    
    return render_template('index.pug', news_results=news_cache)

@app.route('/newsWatch/<int:news_id>')
def news_watch(news_id):
    global news_cache
    if 0 <= news_id < len(news_cache):
        selected_news = news_cache[news_id]
        return render_template('newsWatch.pug', news=selected_news)
    else:
        return "뉴스를 찾을 수 없습니다.", 404

if __name__ == '__main__':
    app.run(debug=True)