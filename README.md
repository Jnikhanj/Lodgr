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
