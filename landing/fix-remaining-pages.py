#!/usr/bin/env python3
import re
import os

# List of comparison and alternative pages that need fixing
PAGES = [
    "src/pages/sheetlink-vs-mint.tsx",
    "src/pages/sheetlink-vs-quickbooks.tsx",
    "src/pages/sheetlink-vs-tiller.tsx",
    "src/pages/sheetlink-vs-ynab.tsx",
    "src/pages/mint-alternative.tsx",
    "src/pages/tiller-alternative.tsx",
    "src/pages/ynab-alternative.tsx",
    "src/pages/quicken-alternative.tsx",
    "src/pages/pocketguard-alternative.tsx",
    "src/pages/personal-capital-alternative.tsx",
]

def fix_page(filepath):
    if not os.path.exists(filepath):
        return False

    with open(filepath, 'r') as f:
        content = f.read()

    # Check if it has Breadcrumbs (these pages might have the issue)
    if '<Breadcrumbs' not in content:
        return False

    # Look for the pattern where we have:
    # </a>
    # </div>  (closes the buttons flex container)
    # </div>  (should close text-center div)
    # </section> (missing the mx-auto max-w-4xl closing div)

    # Find all potential hero sections
    original = content

    # Pattern: after the CTA buttons and closing divs, before </section>
    # We need to add a </div> to close the mx-auto max-w-4xl container

    # Match the hero section structure more carefully
    # Looking for: <section...> <div className="mx-auto max-w-4xl"> ... </div> </div> </section>
    # where we're missing one </div>

    lines = content.split('\n')
    new_lines = []
    i = 0
    while i < len(lines):
        new_lines.append(lines[i])
        # Look for the pattern: two closing </div>, then </section> on next line
        # And check if previous context suggests we're in a hero with Breadcrumbs
        if i < len(lines) - 1:
            curr_line = lines[i].strip()
            next_line = lines[i+1].strip() if i+1 < len(lines) else ""

            # If current line ends with </div> and next ends with </section>
            # And we can find Breadcrumbs in recent lines
            if curr_line == '</div>' and next_line == '</section>':
                # Check if we had breadcrumbs recently (within last 30 lines)
                recent_content = '\n'.join(lines[max(0, i-30):i])
                if '<Breadcrumbs category=' in recent_content:
                    # Check if the line before also ends with </div>
                    if i > 0 and lines[i-1].strip().endswith('</div>'):
                        # Add the missing closing div
                        new_lines.append('            </div>')
        i += 1

    new_content = '\n'.join(new_lines)

    if new_content != original:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"✓ Fixed {filepath}")
        return True
    return False

print("Fixing remaining comparison and alternative pages...")
fixed_count = 0
for page in PAGES:
    if fix_page(page):
        fixed_count += 1

print(f"\n✓ Fixed {fixed_count} pages")
