import type { AppProps } from 'next/app'
import {createTheme, ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
      </ThemeProvider>
  )
}
