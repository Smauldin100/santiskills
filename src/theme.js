import { createTheme } from '@mui/material/styles';

const getTheme = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#2193b0',
        light: '#6dd5ed',
        dark: '#1a7489',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#6c5ce7',
        light: '#a29bfe',
        dark: '#4834d4',
        contrastText: '#ffffff',
      },
      error: {
        main: '#ff6b6b',
        light: '#ff8787',
        dark: '#fa5252',
      },
      warning: {
        main: '#ffd93d',
        light: '#ffe066',
        dark: '#fcc419',
      },
      success: {
        main: '#51cf66',
        light: '#69db7c',
        dark: '#40c057',
      },
      info: {
        main: '#339af0',
        light: '#4dabf7',
        dark: '#228be6',
      },
      ...(mode === 'dark'
        ? {
            background: {
              default: '#18191A',
              paper: '#242526',
            },
            text: {
              primary: '#f5f6fa',
              secondary: '#b0b3b8',
            },
          }
        : {
            background: {
              default: '#f8f9fa',
              paper: '#ffffff',
            },
            text: {
              primary: '#2c3e50',
              secondary: '#5c7089',
            },
          }),
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      subtitle1: {
        fontSize: '1rem',
        lineHeight: 1.5,
        fontWeight: 500,
      },
      subtitle2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        fontWeight: 500,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      // Futuristic glow focus ring
      MuiCssBaseline: {
        styleOverrides: {
          '@global': {
            ':root': {
              '--neo-glow': '0 0 20px rgba(32, 201, 255, 0.4)',
              '--neo-panel': mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)',
              '--neo-border': mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'
            },
            '*:focus-visible': {
              outline: '2px solid #00e5ff',
              boxShadow: 'var(--neo-glow)'
            }
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
            padding: '8px 16px',
            backdropFilter: 'saturate(140%) blur(4px)'
          },
          contained: {
            boxShadow: '0 2px 14px rgba(0, 229, 255, 0.18)',
            '&:hover': {
              boxShadow: '0 6px 18px rgba(0, 229, 255, 0.28)'
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            background:
              mode === 'dark'
                ? 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'
                : 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.65))',
            backdropFilter: 'blur(10px) saturate(140%)',
            border: '1px solid var(--neo-border)',
            boxShadow:
              mode === 'dark'
                ? '0 10px 30px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05)'
                : '0 10px 24px rgba(0,0,0,0.08)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow:
                mode === 'dark'
                  ? '0 18px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)'
                  : '0 14px 32px rgba(0,0,0,0.12)'
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
          elevation1: {
            boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: '12px 16px',
          },
          head: {
            fontWeight: 600,
            backgroundColor: mode === 'dark' ? '#242526' : '#f8f9fa',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:last-child td': {
              borderBottom: 0,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
          },
        },
      },
    },
  });

export default getTheme;
