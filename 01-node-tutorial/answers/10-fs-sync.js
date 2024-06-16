const { writeFileSync, readFileSync } = require("fs");
writeFileSync("./temporary/fileA.txt", "First line\n");
writeFileSync("./temporary/fileA.txt", "Second line\n", { flag: "a" });
writeFileSync("./temporary/fileA.txt", "Third line\n", { flag: "a" });
const content = readFileSync("./temporary/fileA.txt", "utf8");
console.log(content);
