import { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';

const headingStyle = {
    textAlign: 'center',
    margin: '2%',
};

function FileSplitter(props) {
    return (
        <Grid container>
            <Grid item xs={12} style={headingStyle}>
                <Typography variant='h5' gutterBottom>
                    Splitting your files with <em>ease</em>.
                </Typography>

                <Typography variant='overline' display='block' gutterBottom>
                   Coming soon!
                </Typography>

                {/* <Typography variant='overline' display='block' gutterBottom>
                    PDF Splitter currently only supports .pdf file formats.
                </Typography> */}
            </Grid>
        </Grid>
    )
}

export default FileSplitter;
