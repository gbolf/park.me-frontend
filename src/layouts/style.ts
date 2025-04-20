import { styled } from '@mui/system';
import { Box, boxClasses, typographyClasses } from '@mui/material';
import { StyledBaseGlassBox } from '../components/style';

export const StyledContainer = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 20,
  padding: '15px',
});

export const StyledSideContainer = styled(StyledBaseGlassBox)({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll',
  zIndex: 0,
  [`& > .${typographyClasses.root}`]: {
    textAlign: 'center',
  },
});
