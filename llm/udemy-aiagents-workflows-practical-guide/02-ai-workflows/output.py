import sys
import os
import sqlite3

# Run "uv sync" to install the below packages
from pypdf import PdfReader
from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel, Field

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI()


class Vendor(BaseModel):
    name: str = Field(...,
                      description="The name of the vendor or company issuing the invoice.")
    address: str = Field(..., description="The address of the vendor.")
    taxId: str = Field(...,
                       description="The tax identification number of the vendor.")


class Customer(BaseModel):
    name: str = Field(..., description="The name of the customer or client.")
    address: str = Field(..., description="The address of the customer.")
    taxId: str = Field(...,
                       description="The tax identification number of the customer.")


class Invoice(BaseModel):
    vendor: Vendor = Field(...,
                           description="Details of the vendor issuing the invoice.")
    customer: Customer = Field(...,
                               description="Details of the customer receiving the invoice.")
    invoiceNumber: str = Field(...,
                               description="Unique identifier for the invoice.")
    date: str = Field(..., description="Date when the invoice was issued.")
    totalAmount: float = Field(...,
                               description="Total amount due on the invoice.")
    tax: float = Field(...,
                       description="Total tax amount applied to the invoice.")


def setup_database():
    conn = sqlite3.connect("invoices.db")
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS invoices (
            id INTEGER PRIMARY KEY,
            vendor_name TEXT,
            vendor_address TEXT,
            vendor_tax_id TEXT,
            customer_name TEXT,
            customer_address TEXT,
            customer_tax_id TEXT,
            invoice_number TEXT,
            date TEXT,
            total_amount REAL,
            tax REAL
        )
    ''')
    conn.commit()
    return conn


def insert_invoice_data(conn, invoice_data):
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO invoices (
            vendor_name, vendor_address, vendor_tax_id,
            customer_name, customer_address, customer_tax_id,
            invoice_number, "date", total_amount, tax
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        invoice_data.get("vendor", {}).get("name"),
        invoice_data.get("vendor", {}).get("address"),
        invoice_data.get("vendor", {}).get("taxId"),
        invoice_data.get("customer", {}).get("name"),
        invoice_data.get("customer", {}).get("address"),
        invoice_data.get("customer", {}).get("taxId"),
        invoice_data.get("invoiceNumber"),
        invoice_data.get("date"),
        invoice_data.get("totalAmount"),
        invoice_data.get("tax")
    ))
    conn.commit()


def get_pdf_content(pdf_path: str) -> str:
    with open(pdf_path, "rb") as f:
        reader = PdfReader(f)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text


def extract_invoice_details(pdf_content: str) -> Invoice:
    prompt = f"""
    You are an expert data extractor who excels at analyzing invoices.

    Extract all relevant data from the below invoice content (which was extracted from a PDF document).
    Make sure to capture data like vendor name, date, amount, tax, tax IDs etc.

    <invoice-content>
    {pdf_content}
    </invoice-content>

    Return your response as a JSON object without any extra text or explanation.
"""
    response = client.responses.parse(
        model="gpt-4o-mini",
        input=prompt,
        text_format=Invoice,
    )

    return response.output_parsed


def main():
    if len(sys.argv) < 2:
        print("Usage: python main.py /path/to/file_or_folder")
        return

    path = sys.argv[1]
    pdf_files = []

    if not os.path.exists(path):
        print(f"Error: The path '{path}' does not exist.")
        return

    if os.path.isfile(path):
        if path.lower().endswith(".pdf"):
            pdf_files.append(path)
        else:
            print(f"Error: The file '{path}' is not a PDF file.")
            return
    elif os.path.isdir(path):
        for filename in os.listdir(path):
            if filename.lower().endswith(".pdf"):
                pdf_files.append(os.path.join(path, filename))

    if not pdf_files:
        print("No PDF files found.")
        return

    conn = setup_database()

    for pdf_file in pdf_files:
        print(f"Processing {pdf_file}...")
        try:
            pdf_content = get_pdf_content(pdf_file)
            invoice = extract_invoice_details(pdf_content)
            insert_invoice_data(conn, invoice.model_dump())
            print("Extracted Invoice Details:")
            print(invoice.model_dump())
            print("---------")
        except Exception as e:
            print(f"An error occurred while processing {pdf_file}: {e}")

    conn.close()


if __name__ == "__main__":
    main()