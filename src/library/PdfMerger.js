import { PDFDocument } from 'pdf-lib';

async function mergePDFs(files) {
    // Logic only supports .png, .jpg, and .pdf.
    let promises = [];
    let fileNames = [];
    let errorFileNames = [];
    for (const [_, file] of Object.entries(files)) {
        promises.push(fileToByteArray(file.file));
        fileNames.push(file.file.name.toLowerCase());
    }

    return Promise.all(promises).then(async (results) => {
        const resultPdf = await PDFDocument.create();

        for(let i = 0; i < results.length; i++) {
            try {
                const documentBytes = results[i];

                if (fileNames[i].endsWith('.pdf')) {
                    // If the document is a pdf.
                    const pdfDocument = await PDFDocument.load(new Uint8Array(documentBytes));
            
                    // Get the total amount of pages in the pdf.
                    const pdfDocumentPageCount = pdfDocument.getPageCount();
                    // Copy the pages.
                    const copiedPages = await resultPdf.copyPages(pdfDocument, [...Array(pdfDocumentPageCount).keys()]);

                    // For each copied page, add it to the result.
                    for (const copiedPage of copiedPages) {
                        resultPdf.addPage(copiedPage);
                    }
                } else if (fileNames[i].endsWith('.png') || fileNames[i].endsWith('.jpg') || fileNames[i].endsWith('.jpeg')) {
                    // If the document is an image.
                    let image;

                    // Create a new page.
                    const page = resultPdf.addPage();
                    
                    if (fileNames[i].endsWith('.png')) {
                        image = await resultPdf.embedPng(new Uint8Array(documentBytes));
                    } else if (fileNames[i].endsWith('.jpg') || fileNames[i].endsWith('.jpeg')) {
                        image = await resultPdf.embedJpg(new Uint8Array(documentBytes))
                    }

                    // Scale image to best resolution for page.
                    const pageWidth = page.getWidth();
                    const pageHeight = page.getHeight();
                
                    // const scaled = image.scaleToFit(pageHeight, pageWidth)
                    const scaled = image.scaleToFit(pageWidth, pageHeight);

                    // Draw the image.
                    page.drawImage(image, {
                        x: 0,
                        y: 0,
                        width: scaled.width,
                        height: scaled.height,
                    });

                    // Crop the image.
                    page.setCropBox(0, 0, scaled.width, scaled.height);
                }
            } catch (err) {
                console.log('Error: ' + err);
                console.log(fileNames[i]);
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