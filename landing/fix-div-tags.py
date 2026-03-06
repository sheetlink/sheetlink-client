#!/usr/bin/env python3
import re
import os

# Pages that need fixing (use case pages with the same pattern)
PAGES = [
    'src/pages/independent-consultant-bookkeeping.tsx',
    'src/pages/marketing-agency-expense-tracker.tsx',
    'src/pages/software-developer-expense-tracker.tsx',
    'src/pages/airbnb-income-tracker.tsx',
    'src/pages/amazon-fba-bookkeeping-spreadsheet.tsx',
    'src/pages/consulting-income-tracker.tsx',
    'src/pages/dropshipping-finance-tracker.tsx',
    'src/pages/etsy-seller-finances.tsx',
    'src/pages/freelance-income-tracker.tsx',
    'src/pages/gig-worker-bookkeeping.tsx',
    'src/pages/real-estate-investment-tracker.tsx',
    'src/pages/rental-property-cash-flow.tsx',
    'src/pages/reseller-profit-tracker.tsx',
    'src/pages/tax-prep-spreadsheet.tsx',
    'src/pages/track-dropshipping-expenses.tsx',
]

def fix_page(filepath):
    if not os.path.exists(filepath):
        print(f"⏭️  Skipping {filepath} (not found)")
        return

    with open(filepath, 'r') as f:
        content = f.read()

    # Check if it has the pattern that needs fixing
    if '<div className="mx-auto max-w-4xl">' in content and \
       '<Breadcrumbs category=' in content:

        # Fix: Add missing closing </div> before </section>
        # Pattern: </motion.div>\n          </div>\n        </section>
        # Replace with: </motion.div>\n          </div>\n          </div>\n        </section>

        pattern = r'(</motion\.div>\s+</div>)\s+(</section>)'
        replacement = r'\1\n          </div>\n        \2'

        new_content = re.sub(pattern, replacement, content, count=1)

        if new_content != content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"✓ Fixed {filepath}")
        else:
            print(f"⏭️  Skipping {filepath} (no pattern match)")
    else:
        print(f"⏭️  Skipping {filepath} (different structure)")

print("Fixing missing div tags...")
for page in PAGES:
    fix_page(page)

print("\nDone!")
