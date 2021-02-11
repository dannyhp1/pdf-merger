import { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { saveSync } from 'save-file';
import mergePDFs from '../library/PdfMerger';
import FileDropZone from './FileDropZone';

const headingStyle = {
    textAlign: 'center',
    margin: '2%',
};

function FileMerger(props) {
    const [isMerging, setIsMerging] = useState(false);

    const mergeFiles = (files) => {
        console.log('Starting PDF merge.');
        setIsMerging(true);

        mergePDFs(files).then(result => {
            let message = '';

            if (result.errorFileNames.length !== 0) {
                message += 'The following files could not be merged: ' + result.errorFileNames.join(', ') + '\n\n';
            }

            if (result.pdfBytes) {
                console.log('PDF was merged successfully.');
                setIsMerging(false);
                let fileName = prompt(message + 'What file name would you like to save this as? (do not include ".pdf")', 'merged_files');

                saveSync(result.pdfBytes, fileName + '.pdf');
            }

            files.forEach(file => file.remove());
        });
    }

    return (
        <Grid container>
            <Grid item xs={12} style={headingStyle}>
                <Typography variant='h5' gutterBottom>
                    Merging your files with <em>ease</em>.
                </Typography>

                <Typography variant='overline' display='block' gutterBottom>
                    PDF Merger currently only supports the following file formats: <strong>.pdf</strong>, <strong>.png</strong>, <strong>.jpg</strong>, and <strong>.jpeg</strong>.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <FileDropZone isMerging={isMerging} onSubmit={mergeFiles} />
            </Grid>

            <Grid item xs={12}>
                <Typography variant='caption' display='block' gutterBottom>
                    Disclaimer: All files uploaded to be merged are <strong>not</strong> saved or propagated to any third-party services.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default FileMerger;
