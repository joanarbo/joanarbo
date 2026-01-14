import json
import os
import sys

def check_file_exists(path):
    return os.path.exists(path) and os.path.isfile(path)

def audit_project():
    print("Starting Project Audit...\n")
    errors = []
    warnings = []

    # 1. Load data.json
    try:
        with open('data.json', 'r') as f:
            data = json.load(f)
        print("✅ data.json loaded successfully.")
    except Exception as e:
        print(f"❌ Failed to load data.json: {e}")
        return

    # 2. Check structure
    sections = ['posts', 'ideas', 'projects', 'talks']
    all_ids = set()

    for section in sections:
        if section not in data:
            warnings.append(f"Missing section: {section}")
            continue
        
        print(f"\nChecking section: {section} ({len(data[section])} items)")
        
        for idx, item in enumerate(data[section]):
            # Check ID uniqueness
            item_id = item.get('id')
            if not item_id:
                errors.append(f"[{section}][index {idx}] Missing 'id' field")
            elif item_id in all_ids:
                errors.append(f"[{section}][{item_id}] Duplicate ID found")
            else:
                all_ids.add(item_id)

            # Check Image Paths
            image_path = item.get('image')
            if image_path:
                # Remove leading slash if present for local check
                local_path = image_path.lstrip('/')
                
                # Handle external URLs vs local paths
                if image_path.startswith(('http://', 'https://')):
                    # We skip verifying external URLs for now, or just warn
                    # warnings.append(f"[{section}][{item_id}] External image URL used: {image_path}")
                    pass
                else:
                    if not check_file_exists(local_path):
                        errors.append(f"[{section}][{item_id}] Image not found: {local_path}")
            else:
                if section in ['posts', 'projects']: # Images might be optional for ideas/talks
                    warnings.append(f"[{section}][{item_id}] Missing 'image' field")

    # 3. Report
    print("\n--- Audit Report ---")
    if not errors and not warnings:
        print("🎉 All checks passed! Project integrity is solid.")
    
    if warnings:
        print(f"\n⚠️  {len(warnings)} Warnings:")
        for w in warnings:
            print(f"  - {w}")

    if errors:
        print(f"\n❌ {len(errors)} Errors:")
        for e in errors:
            print(f"  - {e}")
        sys.exit(1)
    else:
        sys.exit(0)

if __name__ == "__main__":
    audit_project()
