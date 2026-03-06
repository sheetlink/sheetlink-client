#!/bin/bash

# List of comparison and alternative pages that need fixing
PAGES=(
  "src/pages/sheetlink-vs-mint.tsx"
  "src/pages/sheetlink-vs-quickbooks.tsx"
  "src/pages/sheetlink-vs-tiller.tsx"
  "src/pages/sheetlink-vs-ynab.tsx"
  "src/pages/mint-alternative.tsx"
  "src/pages/tiller-alternative.tsx"
  "src/pages/ynab-alternative.tsx"
  "src/pages/quicken-alternative.tsx"
  "src/pages/pocketguard-alternative.tsx"
  "src/pages/personal-capital-alternative.tsx"
)

for page in "${PAGES[@]}"; do
  if [ -f "$page" ]; then
    # Check if it has the pattern that needs fixing
    if grep -q '<Breadcrumbs category=' "$page"; then
      # Use sed to add missing </div> before first </section> after "See Comparison" or similar CTA text
      sed -i '' 's/\(See Comparison\|Compare Plans\|See Pricing\|Learn More\)\(.*\n.*<\/div>\n.*<\/div>\)\n\(.*<\/section>\)/\1\2\n            <\/div>\n\3/' "$page"
      echo "✓ Fixed $page"
    fi
  fi
done

echo "Done!"
