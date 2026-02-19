import requests
from bs4 import BeautifulSoup
url = 'https://news.ycombinator.com/'
soup = BeautifulSoup(requests.get(url).text,'html.parser')
for t in soup.select('.titleline a')[:5]:
    print(t.text)