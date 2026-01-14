import requests
from bs4 import BeautifulSoup
import json
import os
import re

# Mapping of post IDs to their external URLs
POST_URLS = {
    "perihelion": "https://www.youtube.com/watch?v=7tTCZOHUWFA",
    "invisible-system": "https://buildsystems.substack.com/p/the-day-our-perfect-prototype-started-lying-to-us-61971324637e",
    "lying-prototype": "https://buildsystems.substack.com/p/the-day-our-perfect-prototype-started-lying-to-us-61971324637e",
    "writing-workflow": "https://medium.com/@joanarbo/how-i-write-and-publish-a-valuable-post-every-week-in-just-30-minutes-thanks-to-ai-notion-1e15de49805c",
    "breaking-rules": "https://medium.com/@joanarbo/tu-design-system-no-falla-por-malos-componentes-falla-porque-nadie-diseñó-quién-decide-cuándo-17d4720f4389",
    "ai-thinking": "https://medium.com/@joanarbo/la-ia-no-me-quita-el-trabajo-me-reta-a-pensar-distinto-606626602517",
    "roi-design-system": "https://medium.com/@joanarbo/por-qué-tu-design-system-manager-no-ve-el-roi-32293ffb351c", # Best guess/search result
    "two-scales": "https://medium.com/@joanarbo/el-día-que-una-alumna-me-enseñó-a-ver-las-dos-escalas-del-diseño-powers-of-ten-applied-to-design-systems-f2b7f75f70b6", # Search result match
    "interface-dependency": "https://medium.com/@joanarbo/tu-producto-depende-de-la-interfaz-los-agentes-la-ignoran-8048c6a9025c" # Estimating
}

DATA_FILE = "data.json"
ASSETS_DIR = "assets/images/posts"

def get_og_image(url):
    try:
        if "youtube.com" in url or "youtu.be" in url:
            video_id = re.search(r'(?:v=|\/)([0-9A-Za-z_-]{11}).*', url)
            if video_id:
                return f"https://img.youtube.com/vi/{video_id.group(1)}/maxresdefault.jpg"
            return None
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code != 200:
            print(f"Failed to fetch {url}: {response.status_code}")
            return None
            
        soup = BeautifulSoup(response.content, 'html.parser')
        og_image = soup.find("meta", property="og:image")
        if og_image:
            return og_image["content"]
        
        # Fallback for Medium which sometimes puts it in other tags
        twitter_image = soup.find("meta", name="twitter:image")
        if twitter_image:
            return twitter_image["content"]
            
        return None
    except Exception as e:
        print(f"Error extracting image from {url}: {e}")
        return None

def download_image(image_url, filename):
    try:
        if not image_url: return False
        
        filepath = os.path.join(ASSETS_DIR, filename)
        if os.path.exists(filepath):
            print(f"Image already exists: {filepath}")
            return True
            
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
        response = requests.get(image_url, headers=headers, stream=True, timeout=10)
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
            print(f"Downloaded: {filepath}")
            return True
        return False
    except Exception as e:
        print(f"Error downloading {image_url}: {e}")
        return False

def main():
    with open(DATA_FILE, 'r') as f:
        data = json.load(f)
    
    updated = False
    
    for post in data.get('posts', []):
        post_id = post.get('id')
        if post_id in POST_URLS:
            url = POST_URLS[post_id]
            print(f"Processing {post_id}...")
            
            image_url = get_og_image(url)
            if image_url:
                ext = 'jpg'
                if '.png' in image_url: ext = 'png'
                if '.webp' in image_url: ext = 'webp'
                if '.gif' in image_url: ext = 'gif'
                
                filename = f"{post_id}.{ext}"
                if download_image(image_url, filename):
                    post['image'] = f"{ASSETS_DIR}/{filename}"
                    updated = True
            else:
                print(f"No image found for {post_id}")
        else:
            print(f"No URL found for {post_id}")

    if updated:
        with open(DATA_FILE, 'w') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print("Updated data.json with new images.")

if __name__ == "__main__":
    main()
