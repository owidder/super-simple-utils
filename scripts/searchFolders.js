const fs = require('fs');


const foldersToBuild = (folderPath) => {
    console.log(`foldersToBuild: ${folderPath}`)

    const getFileFromFolder = (name) => {
        console.log(`getFileFromFolder: ${name}`)

        const path = `${folderPath}/${name}`;
        if(fs.lstatSync(path).isDirectory()) {
            const folderContent = fs.readdirSync(path);
            return  folderContent.find((fileName) => {
                return fileName.startsWith(`${name}.ts`)
            });
        }
    }

    const rootContent = fs.readdirSync(folderPath);
    const folderNamesAndFiles = rootContent.reduce((_folderNamesAndFiles, folderName) => {
        const fileName = getFileFromFolder(folderName);
        if(fileName && fileName.length > 0) {
            return [..._folderNamesAndFiles, {folderName, fileName}]
        }

        return _folderNamesAndFiles
    }, [])

    return folderNamesAndFiles;
}

module.exports = {foldersToBuild}