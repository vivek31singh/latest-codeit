def filter_even_numbers(numbers):
    return [num for num in numbers if num % 2 == 0]

result = filter_even_numbers([3, 6, 9, 12, 15, 18])
print(result)  # Output: [6, 12, 18]
