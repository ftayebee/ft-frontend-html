#!/usr/bin/env bash
# ============================================================================
# build-pages.sh  —  DEV-ONLY page generator.
# Concatenates the shared chrome (_head.html + _foot.html) with each page's
# body-*.html into a standalone HTML file at the project root.
# The generated .html files are what buyers receive; this script + the
# assets/partials/ folder are development-only and excluded from the package.
#
# Run from project root:  bash assets/partials/build-pages.sh
# ============================================================================
set -euo pipefail
cd "$(dirname "$0")/../.."   # project root
P="assets/partials"

# page-key | output-file | nav-key | "Title" | "Description"
pages=(
"about|about.html|about|About — Rowan Vale, Creative Developer & UI/UX Designer|Meet Rowan Vale — a creative developer and UI/UX designer with 5+ years building accessible, high-performance digital products."
"services|services.html|services|Services — Web Development, UI/UX Design & More · Rowan Vale|Full-stack web development, UI/UX design, e-commerce and performance services by Rowan Vale, with a clear four-stage process."
"service-single|service-single.html|services|Full-Stack Web Development · Rowan Vale|End-to-end web application development — secure APIs, accessible interfaces and scalable architecture, delivered in reviewable increments."
"portfolio|portfolio.html|portfolio|Portfolio — Selected Work · Rowan Vale|Selected projects across SaaS, e-commerce, healthcare and brand by creative developer Rowan Vale. Filter and explore full case studies."
"project-single|project-single.html|portfolio|Nimbus Analytics — Case Study · Rowan Vale|How a cluttered analytics suite became a focused, fast dashboard — research, strategy, design and development case study."
"contact|contact.html|contact|Contact — Start a Project · Rowan Vale|Get in touch with Rowan Vale to start your web or design project. Replies within one business day."
"style-guide|style-guide.html||Style Guide — Design System · Rowan Vale|The Rowan Vale template design system: colors, typography, buttons, forms, cards, badges and components."
"404|404.html||404 — Page Not Found · Rowan Vale|The page you were looking for could not be found."
)

for row in "${pages[@]}"; do
  IFS='|' read -r key out nav title desc <<< "$row"
  body="$P/body-$key.html"
  [ -f "$body" ] || { echo "SKIP $out (missing $body)"; continue; }

  # Escape & (sed replacement metachar) so titles like "Design & Dev" survive.
  title_esc=${title//&/\\&}
  desc_esc=${desc//&/\\&}

  # Head with tokens replaced
  sed -e "s|@@TITLE@@|$title_esc|g" -e "s|@@DESC@@|$desc_esc|g" -e "s|@@SLUG@@|$out|g" "$P/_head.html" > "$out"

  # Inject aria-current on the active nav links (desktop + mobile)
  if [ -n "$nav" ]; then
    sed -i "s|data-nav=\"$nav\" href|data-nav=\"$nav\" aria-current=\"page\" href|g" "$out"
  fi

  cat "$body" >> "$out"
  cat "$P/_foot.html" >> "$out"
  echo "BUILT $out"
done
