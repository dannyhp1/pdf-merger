import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Header from '../components/Header';
import AppSelector from '../components/AppSelector';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2979ff',
    },
    secondary: {
      light: '#82b1ff',
      main: '#448aff',
      dark: '#2962ff'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <AppSelector />
    </ThemeProvider>
  );
}

export default App;
