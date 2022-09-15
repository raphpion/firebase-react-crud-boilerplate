import { PaletteMode } from '@mui/material';
import { createTheme, responsiveFontSizes, Theme, ThemeOptions } from '@mui/material/styles';

const themeOptions = {
  palette: {
    mode: 'light',
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Poppins',
      'Arial',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
} as ThemeOptions;

export function getDefaultTheme(paletteMode: PaletteMode = 'light'): Theme {
  const theme = createTheme({ ...themeOptions, palette: { mode: paletteMode } });
  return responsiveFontSizes(theme);
}
