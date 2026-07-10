# Lodgr v3.0

Lodgr is a Safari/PWA tax deduction tracker and refund estimator.

## What is new in v3

- Tap any claim to edit it.
- Delete and duplicate claims.
- Rename, edit, add and delete profiles.
- Custom categories with icon, colour, default work-use percentage, receipt requirement and risk level.
- Working settings sheet.
- Appearance settings: theme, accent colour, tax year label, start screen and currency decimals.
- Dashboard settings: show/hide outcome, profiles, category summary and recent claims.
- Backup and restore with JSON.
- Export claims as CSV.
- Remove sample/demo claims.
- SVG icons are embedded locally, so the icon font issue on iOS Safari/PWA is avoided.

## Upload to GitHub Pages

Upload the contents of this folder to the root of your GitHub repository:

```text
index.html
styles.css
app.js
manifest.webmanifest
sw.js
README.md
assets/
```

Do not upload the folder itself as a subfolder.

## iPhone refresh steps after upload

1. Delete the old Lodgr Home Screen icon.
2. Open Settings → Safari → Advanced → Website Data.
3. Delete data for `jnikhanj.github.io`.
4. Open the GitHub Pages link in Safari.
5. Refresh once.
6. Add to Home Screen again.

## Note

The tax estimate is a prototype for personal planning only. It includes 2025–26 resident tax-rate logic, LITO estimate and a simplified Medicare levy option. Confirm all tax settings and deductions before lodging.
