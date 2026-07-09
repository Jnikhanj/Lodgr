# Lodgr

Lodgr is a local-first Safari/PWA prototype for tracking Australian tax deduction expenses, storing receipt evidence, and estimating a simple refund/payable outcome.

## Run locally

Open `index.html` directly in a browser, or use a local server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Upload all files in this folder.
3. Go to **Settings → Pages**.
4. Select **Deploy from branch**.
5. Choose the main branch and root folder.
6. Open the published URL in Safari.
7. On iPhone, use **Share → Add to Home Screen**.

## Notes

- This is a prototype estimator only.
- It currently uses 2025–26 Australian resident tax brackets.
- Medicare levy handling is simplified to a 2% toggle.
- It does not calculate HELP/HECS, Medicare levy reduction/exemption, MLS, spouse details, private health insurance rebates, or all tax offsets.
- Receipt files are stored locally in IndexedDB on the device/browser.
