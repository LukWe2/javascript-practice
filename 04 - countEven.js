function countEven(numbers){
    let count = 0;

    for (let i = 0; i < numbers.length; i++){
        if (numbers[i] % 2 === 0){
            // count = count + 1;
            count++;
        }
    }

    return count;
}

console.log(countEven([3, 6, 2, 9, 5, 8, 3]));