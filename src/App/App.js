import { useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { saveSync } from 'save-file';
import Header from '../components/Header';
import FileDropZone from '../components/FileDropZone';
import mergePDFs from '../library/PdfMerger';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#388e3c',
    },
    secondary: {
      light: '#a6d4fa',
      main: '#90caf9',
      dark: '#648dae'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

function App() {
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
    <ThemeProvider theme={theme}>
      <Header />
      <FileDropZone isMerging={isMerging} onSubmit={mergeFiles} />
    </ThemeProvider>
  );
}

export default App;
