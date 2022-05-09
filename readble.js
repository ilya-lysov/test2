'use strict';
const globalDigitsBeforeTen = ['zero', 'one', 'two', 'three', 'four', 'five', 'six',
                               'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']

const globalDigitsAfterTen = { 3: 'thir', 5: 'fif', 8: 'eigh' }

const toReadable = function (number) {
  const arrayNumbers = Array.from(number.toString()).map(Number);
  return globalDigitsBeforeTen[number] || getReadableString(arrayNumbers).join(' ');
}

const getReadableString = (arrayNumbers) => {
  return arrayNumbers.reduce((result, number, index, arr) => {
    if (index + 2 in arr) {
      result.push(`${globalDigitsBeforeTen[number]} hundred`);
      return result;
    }
    if (index + 1 in arr && number) {
      result.push(checkNumberToHundred(number, arr[index + 1]));
      return result;
    }
    if (number && arr[index - 1] !== 1) {
      result.push(globalDigitsBeforeTen[number]);
      return result;
    }
    return result;
  }, [])
}

const checkNumberToHundred = (firstDigit, secondDigit) => {
  const twoDigitNumber = `${firstDigit}${secondDigit}`;
  if (firstDigit === 1) { return globalDigitsBeforeTen[twoDigitNumber] || checkNumbersToTwelve(secondDigit); }
  return checkTwoDigitNumbers(firstDigit, twoDigitNumber);
}

const checkNumbersToTwelve = (number) => {
  const resultNumber = globalDigitsAfterTen[number] || globalDigitsBeforeTen[number];
  return `${resultNumber}teen`
}

const checkTwoDigitNumbers = (number, twoDigitNumber) => {
  if (number === 2) { return 'twenty'; }
  if (number === 4) { return 'forty'; }
  const resultNumber = globalDigitsAfterTen[number] || globalDigitsBeforeTen[number];
  return `${resultNumber}ty`
}

console.log(toReadable(1));
console.log(toReadable(997));
console.log(toReadable(900));
console.log(toReadable(901));
console.log(toReadable(915));
console.log(toReadable(997));
console.log(toReadable(809));
console.log(toReadable(510));
