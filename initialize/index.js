const path = require('path');
const fs = require("fs")

const FileName = "router"

try {
    const directoryPath = path.join(__dirname, '../src/pages');

    const generateRouter = (halaman, namafile) => {
        let router = [];

        const recursiveMap = (fileName, dir = "") => {
            if (fileName.includes(".")) {

                const rename = (fn, d, remove = true) => {
                    fn = fn.replace(/\.[^/.]+$/, "")
                    if (remove) {
                        // fn = fn.split(".")[0]
                        if (fn.includes("[")) {
                            fn = fn.replace(/\[/g, ":")
                            fn = fn.replace(/\]/g, "")
                        }

                        if (d.includes("[")) {
                            d = d.replace(/\[/g, ":")
                            d = d.replace(/\]/g, "")
                        }
                    }

                    return `${d}${fn === "index" ? (d ? "" : "/") : "/" + fn}`
                }

                router.push({
                    path: rename(fileName, dir),
                    component: rename(fileName, dir, false)
                })
            }
            else {
                const pat = path.join(__dirname, `../src/pages/` + dir + "/" + fileName);
                fs.readdirSync(pat).map(x => recursiveMap(x, dir + "/" + fileName));
            }
        }

        fs.readdirSync(halaman).map(fileName => recursiveMap(fileName));

        fs.writeFile(path.join(__dirname, `../src/router/${namafile}.json`), JSON.stringify(router), function (err) {
            if (err) throw err;
            console.log(`File router ${namafile} is created successfully.`);
        });
    }

    generateRouter(directoryPath, FileName)

    function generateUUID() { 
        var d = new Date().getTime();
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    const version = generateUUID()

    fs.writeFile(path.join(__dirname, `../public/build-id.json`), JSON.stringify({
        version
    }), function (err) {
        if (err) throw err;
        console.log(`Version ${version} is created successfully.`);
    })
    fs.writeFile(path.join(__dirname, `../src/build-id.json`), JSON.stringify({
        version
    }), function (err) {
        if (err) throw err;
        console.log(`Version ${version} is created successfully.`);
    })

} catch (error) {
    console.log(error, "File router Generate error")
}

