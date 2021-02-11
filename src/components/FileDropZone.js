import { Grid, Typography } from '@material-ui/core';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';

const headingStyle = {
    textAlign: 'center',
    margin: '2%',
};

function FileDropZone(props) {
    // Called every time a file's `status` changes.
    const handleChangeStatus = ({ meta, file }, status) => { console.log('Current status is ' + status + ' for ' + meta.name); }
  
    // Receives array of files when they are done uploading and submit button is clicked.
    const handleSubmit = (files) => { 
        props.onSubmit(files)
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Dropzone
                    inputContent='Click to Browse or Drag Files Here'
                    submitButtonContent={props.isMerging ? 'Currently merging your files...' : 'Merge Files'}
                    onChangeStatus={handleChangeStatus}
                    onSubmit={handleSubmit}
                    accept='.pdf,.png,.jpg,.jpeg'
                />
            </Grid>
        </Grid>
    )
}

export default FileDropZone;
