import re

def validate_password(password):
    # it will check password has at least 8 characters
    if len(password) < 8:
        return False, "Password must be at least 8 characters long."
    
    # it will check if the password contains lowercase alphabets
    if not re.search("[a-z]", password):
        return False, "Password must contain at least one lowercase alphabet."
    
    # it will check  if the password contains uppercase alphabets
    if not re.search("[A-Z]", password):
        return False, "Password must contain at least one uppercase alphabet."
    
    # it will check  if the password contains numbers
    if not re.search("[0-9]", password):
        return False, "Password must contain at least one digit."
    
    # it will check  if the password contains symbols
    if not re.search("[_@$]", password):
        return False, "Password must contain at least one of the symbols: _, @, or $."
    
    # If all conditions are met, the password is considered safe
    return True, "Password is safe."


password = input("Enter your password: ")
is_valid, message = validate_password(password)
print(message)
