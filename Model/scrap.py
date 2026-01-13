import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import json

BASE_URL = ""
START_URL = BASE_URL
OUTPUT_FILE = "full_website_data.json"

IMAGE_EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"]


def is_image(url):
    url = url.lower()
    return any(url.endswith(ext) for ext in IMAGE_EXT)


def is_html_page(url):
    return not is_image(url)


def scrape_page(url):
    print(f"Scraping: {url}")

    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            return None
    except:
        return None

    soup = BeautifulSoup(response.text, "html.parser")

    text = soup.get_text(" ", strip=True)
    headings = {
        f"h{i}": [h.get_text(strip=True) for h in soup.find_all(f"h{i}")]
        for i in range(1, 7)
    }

    paragraphs = [p.get_text(strip=True) for p in soup.find_all("p")]


    list_items = [li.get_text(strip=True) for li in soup.find_all("li")]

    
    images = [
        urljoin(BASE_URL, img["src"])
        for img in soup.find_all("img", src=True)
    ]

    links = []
    for tag in soup.find_all("a", href=True):
        full = urljoin(BASE_URL, tag["href"])
        # save HTML pages only
        if full.startswith(BASE_URL) and is_html_page(full):
            links.append(full)

    return {
        "url": url,
        "text": text,
        "headings": headings,
        "paragraphs": paragraphs,
        "list_items": list_items,
        "images": list(set(images)),   
        "links": list(set(links))       
    }


def crawl(start_url):
    visited = set()
    queue = [start_url]
    result = []

    while queue:
        url = queue.pop(0)

        if url in visited:
            continue

        visited.add(url)

        if is_image(url):
            continue  

        data = scrape_page(url)
        if not data:
            continue

        result.append(data)

        for link in data["links"]:
            if link not in visited:
                queue.append(link)

    return result


def save_json(data, file):
    with open(file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print("Saved:", file)


if __name__ == "__main__":
    data = crawl(START_URL)
    save_json(data, OUTPUT_FILE)
    print("Total pages scrapped:", len(data))


