def decimal_to_hexadecimal(decimal_num):
    if not decimal_num.isdigit():
        print("Invalid input: Please enter a decimal number.")
        return
    
    decimal_num = int(decimal_num)
    hex_chars = "0123456789ABCDEF"
    hexadecimal = ""
    
    while decimal_num > 0:
        remainder = decimal_num % 16
        hexadecimal = hex_chars[remainder] + hexadecimal
        decimal_num = decimal_num // 16
    
    print("Hexadecimal:", hexadecimal)

decimal_input = input("Enter a decimal number: ")
decimal_to_hexadecimal(decimal_input)
