# The Clan Hearth — GitHub-Ready Project

This repository is a structured, modular version of your uploaded single-file app. It preserves **all features and data** from your original HTML while splitting code into maintainable files and folders.

## What you get
- **index.html** — the live site (modular, ES modules).
- **index-single-file.html** — your original, untouched single-file version for backup.
- **js/app.js** — application logic (navigation, rendering, tartan builder, recipes, etc.).
- **js/data/** — extracted data arrays (e.g., `clanData.js`). More files will appear here if arrays were present in your source.
- **assets/images/** — a placeholder emblem (`clan_hearth.svg`) and a `readme.txt` for your images.
- **.nojekyll** — enables GitHub Pages to serve files in `js/` and `assets/` without Jekyll processing.

## Local preview
Just open `index.html` in your browser. Because we use ES modules, if you run into cross-origin restrictions, use a tiny local server:
```bash
# Python 3
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages
1. Create a new GitHub repo (or empty the existing one).
2. Upload everything in this folder to the repo root.
3. In **Settings → Pages**, set:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `/ (root)`
4. Save and wait a moment, then visit the Pages URL it shows.

## Images
Replace `assets/images/clan_hearth.svg` with your own emblem (e.g., `clan_hearth.jpg`) and update image references in the HTML/JS if needed.

## Notes
- The modular `index.html` includes `<script type="module" src="./js/app.js"></script>` at the end of the body.
- If you ever need a quick one-file drop-in, use `index-single-file.html`.
- TailwindCSS is loaded via CDN exactly as in your original file.
