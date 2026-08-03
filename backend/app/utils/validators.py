import re

def validate_email(email):
    if not email or not isinstance(email, str):
        return False
    pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return bool(re.match(pattern, email.strip()))

def validate_password(password):
    if not password or not isinstance(password, str):
        return False
    return len(password) >= 6

def validate_transaction_data(data):
    errors = []
    if not data or not isinstance(data, dict):
        return ["Invalid request body"]
        
    t_type = data.get("type")
    if t_type not in ["income", "expense"]:
        errors.append("Transaction type must be 'income' or 'expense'")
        
    amount = data.get("amount")
    try:
        val = float(amount)
        if val <= 0:
            errors.append("Amount must be greater than 0")
    except (ValueError, TypeError):
        errors.append("Amount must be a valid number")
        
    category = data.get("category")
    if not category or not isinstance(category, str):
        errors.append("Category is required")
        
    return errors

def validate_invoice_data(data):
    errors = []
    if not data or not isinstance(data, dict):
        return ["Invalid request body"]
        
    client_name = data.get("client_name") or data.get("client")
    if not client_name:
        errors.append("Client name is required")
        
    amount = data.get("amount") or data.get("total")
    try:
        val = float(amount)
        if val < 0:
            errors.append("Invoice amount cannot be negative")
    except (ValueError, TypeError):
        errors.append("Invoice amount must be a valid number")
        
    return errors
