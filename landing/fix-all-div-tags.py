#!/usr/bin/env python3
import re
import os
import glob

def fix_page(filepath):
    if not os.path.exists(filepath):
        print(f"⏭️  Skipping {filepath} (not found)")
        return False

    with open(filepath, 'r') as f:
        content = f.read()

    # Check if it has Breadcrumbs - these are the pages that might have the issue
    if '<Breadcrumbs' not in content:
        return False

    # Pattern 1: Use case pages with motion.div
    # </motion.div>\n          </div>\n        </section>
    pattern1 = r'(</motion\.div>\s+</div>)\s+(</section>)'

    # Pattern 2: Comparison/alternative pages without motion.div
    # Just look for missing div between content and </section>
    # We need to be more careful here - look for the hero section pattern
    pattern2 = r'(<Breadcrumbs[^>]*/>.*?</p>\s+</div>)\s+(</section>)'

    new_content = content
    fixed = False

    # Try pattern 1 first (use case pages)
    if re.search(pattern1, content):
        new_content = re.sub(pattern1, r'\1\n          </div>\n        \2', content, count=1)
        if new_content != content:
            fixed = True

    # Try pattern 2 (comparison/alternative pages)
    elif re.search(pattern2, content, re.DOTALL):
        # For these pages, we need to find where the inner div starts
        # Look for: <div className="mx-auto max-w-4xl">
        #           <Breadcrumbs ... />
        #           <div className="text-center"> ... </div>
        #           </section>
        # Missing the closing </div> for mx-auto max-w-4xl

        # Find the pattern more precisely
        hero_pattern = r'(<section[^>]*>\s+<div className="mx-auto max-w-4xl">\s+<Breadcrumbs[^>]*/>.*?<div className="text-center">.*?</div>\s+</p>\s+</div>)\s+(</section>)'
        if re.search(hero_pattern, content, re.DOTALL):
            new_content = re.sub(hero_pattern, r'\1\n            </div>\n          \2', content, count=1, flags=re.DOTALL)
            if new_content != content:
                fixed = True

    if fixed:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"✓ Fixed {filepath}")
        return True
    else:
        return False

# Get all page files
pages = glob.glob('src/pages/*.tsx')

print("Fixing missing div tags...")
fixed_count = 0
for page in sorted(pages):
    if fix_page(page):
        fixed_count += 1

print(f"\n✓ Fixed {fixed_count} pages")
