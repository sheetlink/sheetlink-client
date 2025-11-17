from PIL import Image, ImageDraw

def create_icon(size, filename):
    # Create image with purple gradient background
    img = Image.new('RGB', (size, size), color='#667eea')
    draw = ImageDraw.Draw(img)
    
    # Draw a simple "P$" text (Plaid + Sheets)
    # For simplicity, just use the solid color
    img.save(filename)
    print(f"Created {filename}")

create_icon(16, 'icons/icon16.png')
create_icon(48, 'icons/icon48.png')
create_icon(128, 'icons/icon128.png')
