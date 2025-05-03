import { alpha, styled } from '@mui/system';
import { BASE_GLASS_STYLE, StyledBaseGlassBox } from '../../../components/style';
import { Box, IconButton, typographyClasses } from '@mui/material';

export const StyledSideContainer = styled(Box)({
  boxSizing: 'border-box',
  borderRadius: '15px',
  padding: 30,
  width: '100%',
  height: '100%',
  zIndex: 2,
  overflow: 'auto',
  ...BASE_GLASS_STYLE,
});

export const StyledImage = styled('img', { shouldForwardProp: (prop) => prop !== 'active' })<{ active: boolean }>(({ theme, active }) => ({
  borderRadius: 10,
  width: 100,
  height: 150,
  objectFit: 'contain',
  border: '2px solid transparent',
  padding: 15,
  borderColor: alpha(theme.palette.primary.dark, active ? 1 : 0.5),
  transition: 'border-color 300ms, background-color 200ms',
  backgroundColor: alpha(theme.palette.primary.dark, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.dark, 0.2),
  },
}));

export const StyledDeleteImage = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: -5,
  bottom: -5,
  ...BASE_GLASS_STYLE,
}));

export const StyledAddImage = styled(IconButton)(({ theme }) => ({
  width: 100,
  height: 150,
  borderRadius: '10%',
  border: '2px solid transparent',
  borderColor: alpha(theme.palette.primary.dark, 0.5),
  transition: 'border-color 300ms, background-color 200ms',
  color: theme.palette.primary.dark,
  backgroundColor: alpha(theme.palette.primary.dark, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.dark, 0.2),
  },
}));

export const StyledDropZone = styled(Box, { shouldForwardProp: (prop) => prop !== 'error' })<{ error: boolean }>(({ theme, error }) => ({
  cursor: 'pointer',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  minHeight: 400,
  height: 'calc(100% - 45px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 1,
  borderRadius: 10,
  color: theme.palette.primary.dark,
  border: `2px solid ${error ? theme.palette.error.light : theme.palette.primary.light}`,
}));
