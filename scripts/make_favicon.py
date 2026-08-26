from PIL import Image, ImageDraw

def make_circle_icon(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    
    # Make square
    size = min(img.size)
    img = img.crop(((img.width - size) // 2,
                    (img.height - size) // 2,
                    (img.width + size) // 2,
                    (img.height + size) // 2))
                    
    # Create circular mask
    mask = Image.new("L", img.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size, size), fill=255)
    
    # Apply mask
    output = Image.new("RGBA", img.size, (0, 0, 0, 0))
    output.paste(img, mask=mask)
    
    # Resize to standard icon size
    output = output.resize((512, 512), Image.Resampling.LANCZOS)
    output.save(output_path, "PNG")

make_circle_icon("/home/joel/.gemini/antigravity/brain/8d5e8ac5-7642-4ee5-a477-c86d868085e0/.user_uploaded/media_1787778481174.jpg", "src/app/icon.png")
