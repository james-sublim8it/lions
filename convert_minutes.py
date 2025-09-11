#!/usr/bin/env python3
"""
Script to convert Word (.docx) and PDF files to text format
for easier processing and content extraction.
"""

import os
import sys
from pathlib import Path

try:
    from docx import Document
    DOCX_AVAILABLE = True
except ImportError:
    DOCX_AVAILABLE = False

try:
    import PyPDF2
    PDF_AVAILABLE = True
except ImportError:
    PDF_AVAILABLE = False

def convert_docx_to_text(docx_path, output_path):
    """Convert a Word document to text file."""
    if not DOCX_AVAILABLE:
        print(f"Error: python-docx library not installed. Cannot convert {docx_path}")
        return False
    
    try:
        doc = Document(docx_path)
        text_content = []
        
        for paragraph in doc.paragraphs:
            text_content.append(paragraph.text)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(text_content))
        
        print(f"Converted: {docx_path} -> {output_path}")
        return True
    
    except Exception as e:
        print(f"Error converting {docx_path}: {str(e)}")
        return False

def convert_pdf_to_text(pdf_path, output_path):
    """Convert a PDF document to text file."""
    if not PDF_AVAILABLE:
        print(f"Error: PyPDF2 library not installed. Cannot convert {pdf_path}")
        return False
    
    try:
        text_content = []
        
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text_content.append(page.extract_text())
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(text_content))
        
        print(f"Converted: {pdf_path} -> {output_path}")
        return True
    
    except Exception as e:
        print(f"Error converting {pdf_path}: {str(e)}")
        return False

def main():
    """Main function to convert all files in the minutes directory."""
    minutes_dir = Path(__file__).parent / "minutes"
    text_output_dir = Path(__file__).parent / "minutes_text"
    
    # Create output directory if it doesn't exist
    text_output_dir.mkdir(exist_ok=True)
    
    if not minutes_dir.exists():
        print(f"Error: Minutes directory not found at {minutes_dir}")
        return
    
    # Check for required libraries
    missing_libs = []
    if not DOCX_AVAILABLE:
        missing_libs.append("python-docx")
    if not PDF_AVAILABLE:
        missing_libs.append("PyPDF2")
    
    if missing_libs:
        print("Missing required libraries. Install with:")
        print(f"pip install {' '.join(missing_libs)}")
        print()
    
    converted_files = 0
    total_files = 0
    
    # Process all files in the minutes directory
    for file_path in minutes_dir.iterdir():
        if file_path.is_file():
            total_files += 1
            file_ext = file_path.suffix.lower()
            output_file = text_output_dir / f"{file_path.stem}.txt"
            
            if file_ext == '.docx':
                if convert_docx_to_text(file_path, output_file):
                    converted_files += 1
            elif file_ext == '.pdf':
                if convert_pdf_to_text(file_path, output_file):
                    converted_files += 1
            else:
                print(f"Skipping unsupported file type: {file_path}")
    
    print(f"\nConversion complete: {converted_files}/{total_files} files converted")
    print(f"Text files saved to: {text_output_dir}")
    
    if converted_files > 0:
        print(f"\nYou can now read the converted text files for content extraction.")

if __name__ == "__main__":
    main()
