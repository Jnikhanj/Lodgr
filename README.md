# Lodgr v2.2 hotfix

This build fixes the bottom-sheet/modal issue on iOS Safari/PWA where the Add Profile sheet could appear stuck on screen.

Changes:
- Adds `.sheet-backdrop[hidden] { display: none !important; }` so hidden sheets are genuinely hidden.
- Cache-busts files with `v=2.2.0`.
- Updates service worker cache to `lodgr-v2.2.0`.
- Prevents raw Google Material Symbol ligature text such as `close` and `person` from showing while icon fonts load.

Upload the files at the repository root, not inside another folder.

# Lodgr

A polished Safari/PWA prototype for logging Australian tax deduction expenses, attaching receipt evidence markers, switching between taxpayer profiles, and estimating refund/payable outcomes.

## Files

- `index.html` — app shell and screen layout
- `styles.css` — premium mobile app UI styling
- `app.js` — local storage, profiles, claims, CSV export and estimator
- `manifest.webmanifest` — PWA configuration
- `sw.js` — offline cache service worker
- `assets/icons/` — home screen, maskable and favicon assets

## Deploy with GitHub Pages

1. Upload all files to the repository root.
2. Go to GitHub repository Settings → Pages.
3. Select the branch and root folder.
4. Open the published URL in Safari.
5. Use Share → Add to Home Screen.

## Notes

This is a prototype estimator only. It uses 2025–26 Australian resident tax rates, LITO and a simplified 2% Medicare levy option. It does not replace ATO/myTax calculation or professional tax advice.


## v2.1 cache-fix upload note

This build uses cache-busted `styles.css?v=2.2.0` and `app.js?v=2.2.0` references and a network-first service worker. It is intended to replace the older cache-first PWA build.

Upload the contents of this folder directly into the root of the GitHub Pages repository. Do not upload the folder as a subfolder unless GitHub Pages is configured to serve from that subfolder.

If an old version still appears on iPhone, remove the old Home Screen app shortcut, clear Safari website data for `jnikhanj.github.io`, open the site again in Safari, and add it to Home Screen again.


## v2.3

Fixes iOS Safari Material Symbols ligatures rendering as text by explicitly enabling `font-feature-settings: 'liga'` and cache-busting CSS/JS/service worker files.
