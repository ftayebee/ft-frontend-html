#!/usr/bin/env bash
# ============================================================================
# make-package.sh  —  Build the clean ThemeForest delivery package.
# Run from project root:  bash assets/partials/make-package.sh
# Produces ./FT-Portfolio-Package/ ready to zip. Re-runnable (rebuilds clean).
# ============================================================================
set -euo pipefail
cd "$(dirname "$0")/../.."        # project root

OUT="FT-Portfolio-Package"
MAIN="$OUT/Main-Files"
rm -rf "$OUT"
mkdir -p "$MAIN/assets" "$OUT/Documentation" "$OUT/Licensing"

# --- HTML pages ------------------------------------------------------------
cp index.html about.html services.html service-single.html portfolio.html \
   project-single.html contact.html style-guide.html 404.html "$MAIN/"

# --- Assets (copy, then strip dev-only sub-folders) ------------------------
cp -r assets/css assets/js assets/icons assets/images "$MAIN/assets/"
# Remove development-only bits that may live under copied folders:
rm -rf "$MAIN/assets/_originals"      # full-res image backups (dev only)
rm -rf "$MAIN/assets/partials"        # build partials/scripts (dev only)

# --- Documentation ---------------------------------------------------------
cp -r documentation/* "$OUT/Documentation/"

# --- Licensing + changelog -------------------------------------------------
cp Licensing/asset-credits.txt "$OUT/Licensing/"
cp changelog.txt "$OUT/"
[ -f README.txt ] && cp README.txt "$OUT/"

echo "Package built at: $OUT/"
echo "Excluded (dev-only): assets/_originals, assets/partials, assets/plugins,"
echo "  assets/files, .claude, .git, old main.css/media.css."
echo
echo "Package size:"; du -sh "$OUT" 2>/dev/null || true
echo "Now zip it:  (in a terminal)  zip -r FT-Portfolio-Package.zip FT-Portfolio-Package"
