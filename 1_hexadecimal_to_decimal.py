def hexadecimal_to_decimal(hexadecimal):
    hexadecimal = hexadecimal.upper()
    hex_chars = "0123456789ABCDEF"
    decimal_num = 0
    
    for digit in hexadecimal:
        if digit not in hex_chars:
            print("Invalid input: Please enter a valid hexadecimal number.")
            return
        
        decimal_num = decimal_num * 16 + hex_chars.index(digit)
    
    print("Decimal:", decimal_num)

# Test the function
hexadecimal_input = input("Enter a hexadecimal number: ")
hexadecimal_to_decimal(hexadecimal_input)
