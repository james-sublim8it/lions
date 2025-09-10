#!/usr/bin/env python3

import os
import re

# List of HTML files to process (excluding index.html which we already did)
html_files = [
    'about-us.html',
    'contact-us.html', 
    'news-and-events.html',
    'activities.html',
    'spaghetti-dinner.html',
    'become-a-member.html',
    'executive.html',
    'education-bursary.html',
    'pavilion-project.html',
    'canoe-river-run.html'
]

def switch_columns(content):
    # Pattern to match the site-content div and its contents
    pattern = r'(<div class="site-content">)(.*?)(<aside class="widget-area sidebar">.*?</aside>)(.*?)(<aside class="widget-area tertiary">.*?</aside>)(.*?)(</div>)'
    
    def replacer(match):
        opening = match.group(1)  # <div class="site-content">
        content_before_sidebar = match.group(2)  # content area
        sidebar = match.group(3)  # sidebar
        content_between = match.group(4)  # content between sidebar and tertiary
        tertiary = match.group(5)  # tertiary sidebar
        content_after_tertiary = match.group(6)  # any content after tertiary
        closing = match.group(7)  # </div>
        
        # Reorder: sidebar first, then content area, then tertiary
        return opening + '\n        ' + sidebar + content_before_sidebar + content_between + tertiary + content_after_tertiary + closing
    
    return re.sub(pattern, replacer, content, flags=re.DOTALL)

# Process each file
for filename in html_files:
    filepath = f'/Users/jwhite/dev/lions/{filename}'
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Switch columns
        new_content = switch_columns(content)
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Processed {filename}")
    else:
        print(f"File not found: {filename}")

print("Column switching complete!")
