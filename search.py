import os
import sys

history_dir = os.path.join(os.environ['APPDATA'], 'Code', 'User', 'History')
if not os.path.exists(history_dir):
    print("History dir not found")
    sys.exit()

for root, _, files in os.walk(history_dir):
    for f in files:
        if f.endswith('.json'): continue
        path = os.path.join(root, f)
        try:
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
                if "export default function Home() {" in content and "activeView === \"products\"" in content and len(content.split("\\n")) > 5000:
                    print(f"Found match: {path} - length: {len(content)}")
        except Exception:
            pass
