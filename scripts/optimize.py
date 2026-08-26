import os
from PIL import Image

def optimize_images(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".jpg"):
            filepath = os.path.join(directory, filename)
            webp_filepath = os.path.join(directory, filename[:-4] + ".webp")
            
            try:
                with Image.open(filepath) as img:
                    # Convert to RGB if not already (e.g., if it's RGBA)
                    if img.mode != 'RGB':
                        img = img.convert('RGB')
                    # Save as WebP with 75% quality
                    img.save(webp_filepath, 'webp', quality=75)
                print(f"Converted {filename} to WebP.")
                # Optional: Delete original
                # os.remove(filepath)
            except Exception as e:
                print(f"Failed to convert {filename}: {e}")

if __name__ == "__main__":
    optimize_images("public/products")
