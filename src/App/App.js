import { useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Header from '../components/Header';
import FileDropZone from '../components/FileDropZone';

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
  const [files, setFiles] = useState([]);

  const handleSave = (files) => {
    console.log('In handle save!')
    console.log(files)
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <FileDropZone onChange={handleSave} />
    </ThemeProvider>
  );
}

export default App;
