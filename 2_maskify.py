def maskify(mobile_number):
    if len(mobile_number) < 3:
        print("Mobile number is too short to maskify.")
        return
    
    masked_number = "#" * (len(mobile_number) - 3) + mobile_number[-3:]
    print("Masked number:", masked_number)


mobile_number = input("Enter your mobile number: ")
maskify(mobile_number)
