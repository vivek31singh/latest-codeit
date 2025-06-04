function filterEvenNumbers(nums: number[]): number[] {
    return nums.filter(n => n % 2 === 0);
}

const result = filterEvenNumbers([10, 15, 20, 25, 30]);
console.log(result); // Output: [10, 20, 30]
