import os
import json
import urllib.request
import time

try:
    from ddgs import DDGS
except ImportError:
    print("ddgs is not installed. Run: pip install ddgs")
    exit(1)

products = [
  {"id": "db-glotint", "query": "Dolce Bella Glow Tint maquillaje"},
  {"id": "db-corrector", "query": "Dolce Bella Corrector Liquido maquillaje"},
  {"id": "db-blush", "query": "Dolce Bella Blush en Polvo Rubor Individual"},
  {"id": "db-mascara", "query": "Dolce Bella Mascara Volumen Definition"},
  {"id": "db-pencil", "query": "Dolce Bella Makeup Pencil cejas ojos"},
  {"id": "db-lipgloss-tubo", "query": "Dolce Bella Lip Gloss Tubo maquillaje"},
  {"id": "db-lipgloss-aplicador", "query": "Dolce Bella Lip Gloss aplicador maquillaje"},
  {"id": "db-grace-marble", "query": "Dolce Bella Grace Marble maquillaje labial"},
  {"id": "db-glossy-lipbalm", "query": "Dolce Bella Glossy Lip Balm"},
  {"id": "db-vinyl-lip", "query": "Dolce Bella Vinyl Lasting Lip Stain"},
  {"id": "sa-concealer", "query": "Salome Hydratint Concealer maquillaje"},
  {"id": "sa-lipstick", "query": "Salome Vegan Smooth Creamy Lipstick"},
  {"id": "sa-sacapuntas", "query": "Salome Sacapuntas 2 en 1 maquillaje"},
  {"id": "papel-absorbente", "query": "Papel Absorbente de Grasa Animalitos maquillaje"},
  {"id": "us-lipbalm", "query": "Ushas Sweet Lip Balm"},
  {"id": "us-lipink", "query": "Ushas Lip Ink"},
  {"id": "mg-matelips", "query": "Max Glow Mate Lips Lip Color Liquid"},
  {"id": "mg-lipoil", "query": "Max Glow Lip Oil Fruity Gloss Plumping Lips"},
  {"id": "bc-lipoil", "query": "Beauty Creations Sweet Dose Lip Oil"},
  {"id": "bc-pencil", "query": "Beauty Creations Wooden Lip Pencil"},
  {"id": "kc-blusher", "query": "Kevin & Coco Blusher Lotion"},
  {"id": "dici-paso1", "query": "Dici Paso 1 Skincare"},
  {"id": "trendy-espejo", "query": "Trendy Espejo Plegable maquillaje"},
  {"id": "sm-sacapuntas", "query": "Sacapuntas 2 en 1 Sin Deposito maquillaje"},
  {"id": "sm-borlas-grandes", "query": "Borlas Grandes maquillaje puff"},
  {"id": "sm-borlas-pequenas", "query": "Borlas Pequenas maquillaje puff"},
  {"id": "sm-esponja", "query": "Esponja Beauty Blender Amarilla"},
  {"id": "sm-sadoer-lip", "query": "Sadoer Repair Lip Mask"},
  {"id": "sm-kaberline-lip", "query": "Kaberline Lip Mask"},
  {"id": "sm-sadoer-face", "query": "Sadoer Real Rose Moisturizing Facial Mask"},
  {"id": "sm-grippies", "query": "Grippies maquillaje pelo"},
  {"id": "sm-chokers", "query": "Chokers Negros accesorios"}
]

output_dir = "/home/joel/Proyectos/Selene/selene-store/public/products"
os.makedirs(output_dir, exist_ok=True)

print(f"Downloading images for {len(products)} products...")
with DDGS() as ddgs:
    for product in products:
        filename = f"{product['id']}.jpg"
        filepath = os.path.join(output_dir, filename)
        
        if os.path.exists(filepath):
            print(f"Skipping {product['id']} (already exists)")
            continue
            
        print(f"Searching: {product['query']}")
        try:
            results = list(ddgs.images(product['query'], max_results=3))
            downloaded = False
            for res in results:
                url = res['image']
                try:
                    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(req, timeout=10) as response, open(filepath, 'wb') as out_file:
                        out_file.write(response.read())
                    print(f"  ✓ Downloaded {url}")
                    downloaded = True
                    break
                except Exception as e:
                    print(f"  - Failed {url}: {e}")
            if not downloaded:
                print(f"  ✗ Could not download any images for {product['query']}")
        except Exception as e:
            print(f"  ✗ Error searching {product['query']}: {e}")
            
        time.sleep(1)

print("Done!")
