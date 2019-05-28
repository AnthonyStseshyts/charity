const rubbish = '12т Ми18р 12 ТУТ24 js1Mup22';

function extractNumbers(str) {
  const numbers = [];
  const splittedStr = str.split('');
  let temp = '';

  splittedStr.forEach((char, i) => {
    if (!isNaN(parseInt(char))) {
      temp += char;
      if (str.length - 1 === i) {
        if (temp) {
          numbers.push(+temp);
        }
      }
    } else {
      if (temp) {
        numbers.push(+temp);
      }

      temp = '';
    }
  });

  return numbers;
}

function sumArray(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}

console.log(sumArray(extractNumbers(rubbish)));
