const { writeFile } = require("fs");

console.log("at start");
writeFile("./temporary/fileB.txt", "First line\n", (err) => {
    if (err) return console.log("Error:", err);
    console.log("at point 1");
    writeFile("./temporary/fileB.txt", "Second line\n", { flag: "a" }, (err) => {
        if (err) return console.log("Error:", err);
        console.log("at point 2");
        writeFile("./temporary/fileB.txt", "Third line\n", { flag: "a" }, (err) => {
            if (err) return console.log("Error:", err);
            console.log("at point 3");
        });
    });
});
console.log("at end");
