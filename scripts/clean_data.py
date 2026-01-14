import json
import re
import html

def clean_content(text):
    if not isinstance(text, str):
        return text
    
    # 1. Decode HTML entities (e.g., &#243; -> ó)
    text = html.unescape(text)
    
    # 2. Replace <li> with Markdown bullet
    text = text.replace("<li>", "\n* ")
    text = text.replace("</li>", "")
    
    # 3. Handle <ul> tags
    text = text.replace("<ul>", "\n")
    text = text.replace("</ul>", "\n")
    
    # 4. Ensure headers have newlines before them for marked.js
    # Matches ### Header preceded by anything that isn't a newline
    text = re.sub(r'([^\n])(#{1,6}\s)', r'\1\n\n\2', text)
    
    # 5. Fix blockquote spacing
    text = text.replace("<blockquote>", "\n\n> ")
    text = text.replace("</blockquote>", "\n\n")
    
    # 6. Clean up multiple newlines
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    return text.strip()

def process_file(file_path):
    print(f"Processing {file_path}...")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Clean posts
        if 'posts' in data:
            for post in data['posts']:
                if 'content' in post:
                    post['content'] = clean_content(post['content'])
        
        # Clean ideas
        if 'ideas' in data:
            for idea in data['ideas']:
                if 'content' in idea:
                    idea['content'] = clean_content(idea['content'])
                    
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            
        print(f"Successfully cleaned {file_path}")
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def main():
    process_file("data.json")
    process_file("data_es.json")

if __name__ == "__main__":
    main()
