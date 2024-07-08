const { writeFile, readFile } = require('fs').promises;

// Async function to write to a file
async function writer() {
    try {
        await writeFile('temp.txt', 'Line 1\n');
        await writeFile('temp.txt', 'Line 2\n', { flag: 'a' });
        await writeFile('temp.txt', 'Line 3\n', { flag: 'a' });
    } catch (err) {
        console.error('Error writing to file:', err);
    }
}

// Async function to read from a file
async function reader() {
    try {
        const data = await readFile('temp.txt', 'utf-8');
        console.log(data);
    } catch (err) {
        console.error('Error reading from file:', err);
    }
}

// Function to call writer and reader in sequence
async function readWrite() {
    await writer();
    await reader();
}

// Call the readWrite function
readWrite();
