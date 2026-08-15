function sumPositive(numbers){

    let sumPositive = 0;

    for (let i = 0; i < numbers.length; i++){
        if (numbers[i] > 0){
            sumPositive += numbers[i];
        }
    }

    return sumPositive;
}


console.log(sumPositive([3, -2, 5, -1, 4]));