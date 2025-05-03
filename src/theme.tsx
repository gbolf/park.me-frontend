import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { MaterialDesignContent } from 'notistack';
import { BASE_GLASS_STYLE } from '@components/style';
import { RiArrowDownLine } from '@remixicon/react';

const getSnackbarStyle = (color: string) => ({
  ...BASE_GLASS_STYLE,
  backdropFilter: 'blur(7px)',
  fontFamily: `'Montserrat', sans-serif`,
  backgroundColor: alpha(color, 0.2),
  border: `2px solid ${color}`,
  color,
});

// Success snackbar
const GlassSuccess = styled(MaterialDesignContent)(({ theme }) => getSnackbarStyle(theme.palette.success.main));
// Error snackbar
const GlassError = styled(MaterialDesignContent)(({ theme }) => getSnackbarStyle(theme.palette.error.main));
// Warning snackbar
const GlassWarning = styled(MaterialDesignContent)(({ theme }) => getSnackbarStyle(theme.palette.warning.main));
// Info snackbar
const GlassInfo = styled(MaterialDesignContent)(({ theme }) => getSnackbarStyle(theme.palette.info.main));
// Default snackbar
const GlassDefault = styled(MaterialDesignContent)(({ theme }) => getSnackbarStyle(theme.palette.grey[400]));

export const snacbars = { default: GlassDefault, success: GlassSuccess, error: GlassError, warning: GlassWarning, info: GlassInfo };

export const theme = createTheme({
  spacing: 15,
  shadows: [
    'none',
    '0px 4px 12px rgba(63, 82, 59, 0.12)',
    '0px 6px 14px rgba(63, 82, 59, 0.14)',
    '0px 8px 16px rgba(63, 82, 59, 0.16)',
    '0px 10px 18px rgba(63, 82, 59, 0.18)',
    '0px 12px 20px rgba(63, 82, 59, 0.20)',
    '0px 14px 22px rgba(63, 82, 59, 0.22)',
    '0px 16px 24px rgba(63, 82, 59, 0.24)',
    '0px 18px 26px rgba(63, 82, 59, 0.26)',
    '0px 20px 28px rgba(63, 82, 59, 0.28)',
    '0px 22px 30px rgba(63, 82, 59, 0.30)',
    '0px 24px 32px rgba(63, 82, 59, 0.32)',
    '0px 26px 34px rgba(63, 82, 59, 0.34)',
    '0px 28px 36px rgba(63, 82, 59, 0.36)',
    '0px 30px 38px rgba(63, 82, 59, 0.38)',
    '0px 32px 40px rgba(63, 82, 59, 0.40)',
    '0px 34px 42px rgba(63, 82, 59, 0.42)',
    '0px 36px 44px rgba(63, 82, 59, 0.44)',
    '0px 38px 46px rgba(63, 82, 59, 0.46)',
    '0px 40px 48px rgba(63, 82, 59, 0.48)',
    '0px 42px 50px rgba(63, 82, 59, 0.50)',
    '0px 44px 52px rgba(63, 82, 59, 0.52)',
    '0px 46px 54px rgba(63, 82, 59, 0.54)',
    '0px 48px 56px rgba(63, 82, 59, 0.56)',
    '0px 50px 58px rgba(63, 82, 59, 0.58)',
  ],
  transitions: {
    duration: {
      shortest: 250,
      shorter: 300,
      short: 400,
      standard: 500,
      complex: 600,
      enteringScreen: 1000,
      leavingScreen: 0,
    },
  },
  palette: {
    primary: {
      main: '#609966',
      light: '#9DC08B',
      dark: '#3F523B',
      contrastText: '#EDF1D5',
    },
    secondary: {
      main: '#9DC08B',
    },
    background: {
      default: '#EDF1D5',
      paper: 'rgba(255, 255, 255, 0.15)',
    },
    text: {
      primary: '#3F523B',
      secondary: '#609966',
    },
  },
  typography: {
    fontFamily: `'Montserrat', sans-serif`,
    fontSize: 18, // base size — great for large text design

    h1: {
      fontWeight: 700,
      fontSize: '3rem', // 48px
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem', // 40px
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem', // 32px
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem', // 28px
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem', // 24px
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem', // 20px
      lineHeight: 1.5,
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: '1.125rem', // 18px
      lineHeight: 1.6,
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: '1rem', // 16px
      lineHeight: 1.6,
    },
    body1: {
      fontWeight: 400,
      fontSize: '1.125rem', // 18px
      lineHeight: 1.7,
    },
    body2: {
      fontWeight: 400,
      fontSize: '1rem', // 16px
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      fontSize: '1rem',
      textTransform: 'none',
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.875rem', // 14px
      lineHeight: 1.4,
    },
    overline: {
      fontWeight: 400,
      fontSize: '0.75rem', // 12px
      letterSpacing: '1px',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          height: 3,
          width: '100%',
          backgroundColor: 'primary.dark',
        },
      },
    },
    MuiPopper: {
      styleOverrides: {
        root: {
          overflow: 'hidden',
          '& .MuiPickersLayout-contentWrapper, & .MuiPickersLayout-root': {
            zIndex: 3,
            backgroundColor: '#FFFFFF',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          [`& .${autocompleteClasses.noOptions}, & .${autocompleteClasses.loading}`]: {
            backgroundColor: '#FFFFFF',
            textAlign: 'center',
            border: `2px solid ${theme.palette.primary.light}`,
            borderRadius: 5,
          },
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          ...BASE_GLASS_STYLE,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          paddingLeft: 15,
          paddingRight: 15,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: ` 2px solid ${alpha(theme.palette.primary.dark, 0.2)}`,
          borderRadius: '10px !important',
        }),
      },
    },
    MuiAccordionSummary: {
      defaultProps: {
        expandIcon: <RiArrowDownLine />,
      },
      styleOverrides: {
        root: {
          padding: '0 15px',
        },
        content: ({ theme }) => ({
          ...theme.typography.subtitle2,
        }),
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: '2px solid #FFFFFF',
          boxShadow: theme.shadows[1],
          '& img': { objectFit: 'contain' },
        }),
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => ({
          backgroundColor: '#FFFFFF',
          color: '#333',
          fontSize: '0.875rem',
          borderRadius: '5px',
          boxShadow: theme.shadows[3],
          padding: '8px 14px',
          maxWidth: 300,
        }),
        popper: {
          overflow: 'unset',
        },
        arrow: {
          color: '#FFFFFF',
        },
      },
      defaultProps: {
        arrow: true,
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
  },
});
