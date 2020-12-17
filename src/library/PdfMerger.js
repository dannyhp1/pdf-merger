import { PDFDocument } from 'pdf-lib';

async function mergePDFs(files) {
    let promises = [];
    for (const [_, file] of Object.entries(files)) {
        promises.push(fileToByteArray(file.file));
    }

    return Promise.all(promises).then(async (results) => {
        const resultPdf = await PDFDocument.create();

        for (let documentBytes of results) {
            const pdfDocument = await PDFDocument.load(new Uint8Array(documentBytes));
            const pdfDocumentPageCount = pdfDocument.getPageCount();
            const copiedPages = await resultPdf.copyPages(pdfDocument, [...Array(pdfDocumentPageCount).keys()]);

            for (const copiedPage of copiedPages) {
                resultPdf.addPage(copiedPage);
            }
        }

        const pdfBytes = await resultPdf.save();
        return pdfBytes;
    });
}

function fileToByteArray(file) {
    return new Promise((resolve, reject) => {
        try {
            let reader = new FileReader();
            let fileByteArray = [];
            reader.readAsArrayBuffer(file);
            reader.onloadend = (evt) => {
                if (evt.target.readyState == FileReader.DONE) {
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