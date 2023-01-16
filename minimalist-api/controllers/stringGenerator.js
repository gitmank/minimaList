let acceptedChars = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'a', 'b', 'c', 'd','e',
  'f', 'g', 'h', 'i','j',
  'k', 'l', 'm', 'n','o',
  'p', 'q', 'r', 's','t',
  'u', 'v', 'w', 'x','y','z'
  ];
let min = 0;
let max = 35;

const generateSessionID = () => {
    let generatedString = '';
    for(let i = 0; i < 16; i++) {
        let randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
        generatedString = generatedString.concat(acceptedChars[randomIndex])
    }
    return generatedString;
}

module.exports = {
    generateSessionID: generateSessionID,
}