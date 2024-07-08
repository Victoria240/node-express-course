const { writeFile, readFile } = require('fs').promises;

writeFile('temp.txt', 'Line 1\n')
    .then(() => {
        return writeFile('temp.txt', 'Line 2\n', { flag: 'a' });
    })
    .then(() => {
        return writeFile('temp.txt', 'Line 3\n', { flag: 'a' });
    })
    .then(() => {
        return readFile('temp.txt', 'utf-8');
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log('An error occurred:', error);
    });
