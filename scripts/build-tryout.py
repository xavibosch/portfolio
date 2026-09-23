#!/usr/bin/env python3
"""Build portfolio-tryout/ from public/proto/goal.html.

The asset list is SCANNED from the HTML, never hand-written: a hand-written
list is how three assets added in another session shipped broken.
"""
import os, re, shutil, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC  = os.path.join(HERE, "..", "public", "proto")
OUT  = os.path.abspath(os.path.join(HERE, "..", "..", "portfolio-tryout"))

html = open(os.path.join(SRC, "goal.html"), encoding="utf-8").read()
projs = open(os.path.join(SRC, "projects.js"), encoding="utf-8").read()
IMGS  = os.path.join(HERE, "..", "public", "images")

# scanned from BOTH files: the case-study shots are named in projects.js, and
# a build that only scanned the HTML shipped them still pointing at .png
refs = sorted(set(re.findall(r'assets/[A-Za-z0-9_./-]+', html)))
pics = sorted(set(re.findall(r'/images/[A-Za-z0-9_.-]+', html + projs)))

def web(rel):
    """asset path as it will be served (png/jpg become webp; the rest ride along)"""
    stem, ext = os.path.splitext(rel)
    return stem + ".webp" if ext.lower() in (".png", ".jpg", ".jpeg") else rel

converted = kept = 0
for rel in refs:
    src = os.path.join(SRC, rel)
    if not os.path.exists(src):
        sys.exit(f"missing source asset: {rel}")
    dst = os.path.join(OUT, web(rel))
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    if web(rel) != rel:
        subprocess.run(["cwebp", "-q", "86", src, "-o", dst],
                       check=True, capture_output=True)
        converted += 1
    else:                                    # webp and svg copy straight over
        shutil.copy2(src, dst); kept += 1

for rel in pics:
    name = rel.lstrip("/").split("/", 1)[1]
    src  = os.path.join(IMGS, name)
    if not os.path.exists(src):
        sys.exit(f"missing source image: {rel}")
    dst = os.path.join(OUT, "images", os.path.basename(web(name)))
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    if web(name) != name:
        subprocess.run(["cwebp", "-q", "86", src, "-o", dst],
                       check=True, capture_output=True)
        converted += 1
    else:
        shutil.copy2(src, dst); kept += 1

def rewrite(text):
    for rel in refs: text = text.replace(rel, web(rel))
    for rel in pics: text = text.replace(rel, "/images/" + os.path.basename(web(rel)))
    return text

open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(rewrite(html))
open(os.path.join(OUT, "projects.js"), "w", encoding="utf-8").write(rewrite(projs))

for extra in ("lib/lenis.css", "lib/lenis.min.js", "gsap/gsap.min.js"):
    s = os.path.join(SRC, extra)
    if os.path.exists(s):
        d = os.path.join(OUT, extra)
        os.makedirs(os.path.dirname(d), exist_ok=True)
        shutil.copy2(s, d)

# nothing ships until every reference in the built page resolves on disk
built = open(os.path.join(OUT, "index.html"), encoding="utf-8").read()
shipped = open(os.path.join(OUT, "projects.js"), encoding="utf-8").read()
cited = set(re.findall(r'(?:src|href)="([^"${}][^"]*)"', built)) \
      | set(re.findall(r'"(/images/[^"]+)"', shipped))
broken = [r for r in cited
          if not r.startswith(("http", "mailto:", "#"))
          and not os.path.exists(os.path.join(OUT, r.lstrip("/")))]
if broken:
    sys.exit("broken references: " + ", ".join(sorted(broken)))
print(f"{converted} converted, {kept} copied, {len(refs)} assets + {len(pics)} images, no broken refs")
