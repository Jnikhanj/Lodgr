# Lodgr v2.4 icon-proof build

This build removes the dependency on Material Symbols icon fonts and uses embedded SVG icons instead.

Why: iOS Safari/PWA was rendering icon ligature names such as `home`, `receipt_long`, `calculate`, and `person` as visible text. Embedded SVG icons avoid that failure mode completely.

## Upload

Upload the contents of this ZIP directly into your GitHub Pages repository root:

```text
index.html
styles.css
app.js
manifest.webmanifest
sw.js
README.md
assets/
```

Do not upload the containing folder.

## After upload

On iPhone:

1. Delete the existing Lodgr Home Screen icon.
2. Settings → Safari → Advanced → Website Data → delete `jnikhanj.github.io`.
3. Open `https://jnikhanj.github.io/Lodgr/` in Safari.
4. Refresh once.
5. Add to Home Screen again.

## Notes

- Version: `2.4.0`
- Icons: local inline SVG, no external icon-font dependency.
- Text font: Inter with Apple/system fallback.
- Storage: localStorage demo persistence.
- Tax estimator: prototype only; not tax advice.
