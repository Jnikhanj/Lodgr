# Lodgr v4.1 Refined Minimal

This build continues the compact, list-first direction and removes the remaining heavy UI elements.

## What changed from v4

- Removed the Home/Profile top settings gear.
- Replaced the heavy Home action grid with a slimmer inline action strip.
- Made the Home summary strip shorter and more compact.
- Removed the Safari/iOS default button background that caused the grey/shadow effect behind Claims rows.
- Flattened Claims list rows and tightened row spacing.
- Reduced tab bar height slightly.
- Standardised icon stroke weight and made category icon backgrounds more subtle.
- Profile screen is now a cleaner settings-style list without redundant chrome.

## Upload to GitHub Pages

Upload the contents of this folder directly into your repository root:

```text
index.html
styles.css
app.js
manifest.webmanifest
sw.js
assets/
```

Do not upload the folder itself as a subfolder.

## Cache note

After upload, delete the old Lodgr Home Screen icon and clear Safari website data for `jnikhanj.github.io` if the old UI remains cached.

## Notes

- Uses localStorage for profiles, categories, claims and settings.
- Uses embedded inline SVG icons, so there is no Google icon font issue on iOS Safari.
- Includes Add/Edit/Delete/Duplicate claim workflows.
- Includes editable profiles, custom categories, appearance/dashboard settings, JSON backup/import and CSV export.
- Tax estimate is a simplified prototype only.
