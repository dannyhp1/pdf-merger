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
  const mergeFiles = (files) => {
    console.log('Starting PDF merge.');

    mergePDFs(files).then(result => {
      if (result) {
        console.log('PDF was merged successfully.');
        let fileName = prompt('What file name would you like to save this as? (do not include ".pdf")', 'merged_files');

        saveSync(result, fileName + '.pdf');
      }
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <FileDropZone onSubmit={mergeFiles} />
    </ThemeProvider>
  );
}

export default App;
