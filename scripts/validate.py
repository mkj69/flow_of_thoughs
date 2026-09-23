import json
from pathlib import Path

path = Path(__file__).resolve().parents[1] / "docs" / "data" / "papers.json"
papers = json.loads(path.read_text())

required = {"id", "title", "year", "authors", "url", "categories", "state", "compute", "task", "status", "takeaway", "why"}
seen = set()
for i, p in enumerate(papers):
    missing = required - p.keys()
    assert not missing, f"entry {i} missing {sorted(missing)}"
    assert p["id"] not in seen, f"duplicate id: {p['id']}"
    seen.add(p["id"])
    assert p["url"].startswith("https://"), p["url"]
    assert isinstance(p["categories"], list) and p["categories"], p["id"]

print(f"validated {len(papers)} paper entries")
