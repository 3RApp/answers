const fs = require('fs');
const path = require('path');

function readJsonFile(targetDirName) {

    const targetDirPath = path.resolve(process.cwd(), targetDirName);

    try {
        
        const fullItemPath = path.join(targetDirPath, "index.json");

        const json = fs.readFileSync(fullItemPath, 'utf8', (err, data) => {
            if(err) {
               console.error(`Ошибка при чтении файла "${fullItemPath}":`, err.message);
               throw new Error(err.message);
           }
        });

        return json;
    } catch (err) {
        console.error(`Ошибка при чтении папки "${targetDirName}":`, err.message);
        throw new Error(err.message);
    }
}

module.exports = readJsonFile;