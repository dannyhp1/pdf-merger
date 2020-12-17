import { PDFDocument } from 'pdf-lib';

async function mergePDFs(files) {
    let promises = [];
    let fileNames = [];
    let errorFileNames = [];
    for (const [_, file] of Object.entries(files)) {
        promises.push(fileToByteArray(file.file));
        fileNames.push(file.file.name);
    }

    return Promise.all(promises).then(async (results) => {
        const resultPdf = await PDFDocument.create();

        for(let i = 0; i < results.length; i++) {
            try {
                const documentBytes = results[i];
                const pdfDocument = await PDFDocument.load(new Uint8Array(documentBytes));
                const pdfDocumentPageCount = pdfDocument.getPageCount();
                const copiedPages = await resultPdf.copyPages(pdfDocument, [...Array(pdfDocumentPageCount).keys()]);

                for (const copiedPage of copiedPages) {
                    resultPdf.addPage(copiedPage);
                }
            } catch (err) {
                console.log('Error: ' + err);
                errorFileNames.push(fileNames[i]);
            }
        }

        const pdfBytes = await resultPdf.save();
        return { pdfBytes: pdfBytes, errorFileNames: errorFileNames };
    });
}

function fileToByteArray(file) {
    return new Promise((resolve, reject) => {
        try {
            let reader = new FileReader();
            let fileByteArray = [];
            reader.readAsArrayBuffer(file);
            reader.onloadend = (evt) => {
                if (evt.target.readyState === FileReader.DONE) {
                    let arrayBuffer = evt.target.result,
                        array = new Uint8Array(arrayBuffer);
                    for (let byte of array) {
                        fileByteArray.push(byte);
                    }
                }
                resolve(fileByteArray);
            }
        }
        catch (e) {
            reject(e);
        } 
    })
}

export default mergePDFs;