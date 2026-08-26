import re
import sys

def convert_html_to_jsx(html_file, out_file):
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract body content
    body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL | re.IGNORECASE)
    if not body_match:
        print("No body found")
        return
    body = body_match.group(1)

    # Convert class to className
    body = body.replace('class=', 'className=')
    body = body.replace('<!--', '{/*')
    body = body.replace('-->', '*/}')
    body = body.replace('viewbox', 'viewBox')
    body = body.replace('stroke-width', 'strokeWidth')
    body = body.replace('stroke-linecap', 'strokeLinecap')
    body = body.replace('stroke-linejoin', 'strokeLinejoin')
    body = body.replace('fill-rule', 'fillRule')
    body = body.replace('clip-rule', 'clipRule')

    # Close empty tags
    for tag in ['img', 'input', 'hr', 'br', 'path']:
        body = re.sub(r'(<'+tag+r'[^>]*?)(?<!/)>', r'\1 />', body)
        
    # We should also copy the logo image
    body = body.replace('https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg', '/logo.png')
    
    # Also grab the config
    config_match = re.search(r'tailwind\.config\s*=\s*(\{.*?\});', content, re.DOTALL)
    
    # We need to construct tailwind.config.ts
    config_ts = """import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
"""
    if config_match:
        # Extract the theme part
        theme_match = re.search(r'theme:\s*(\{.*?\})\s*}', config_match.group(1), re.DOTALL)
        if theme_match:
            config_ts += "  theme: " + theme_match.group(1) + ",\n"
    
    config_ts += """  plugins: [],
};
export default config;
"""

    with open('tailwind.config.ts', 'w') as f:
        f.write(config_ts)

    jsx = f"""export default function Home() {{
  return (
    <div className="bg-surface text-on-surface">
      {{/* Navbar / Header */}}
      {body}
    </div>
  );
}}
"""
    
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(jsx)

convert_html_to_jsx('stitch_page.html', 'src/app/page.tsx')
