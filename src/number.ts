export const numberConversion = (inputNumber: number): string => {
    // array of Roman numerals, will max out at 3999
    const romanNumerals = [
        ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
        ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
        ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
        ['M', 'MM', 'MMM'],
    ];

    // split digits to reduce later
    const numbers: string[] = Math.round(inputNumber).toString().split('')
    //calculate position to meet 0 indexing
    let arrayPosition: number = (numbers.length - 1);
    
    // reduce over each number based on position of Roman numberal in array rather than value it represents
    return numbers.reduce((romanNumeral, number) => {
        if (number !== '0') {
            romanNumeral += romanNumerals[arrayPosition][parseInt(number) - 1];
        }
        arrayPosition -= 1
        return romanNumeral
    }, '')
}
