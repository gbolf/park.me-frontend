import { styled } from '@mui/system';
import { boxClasses, typographyClasses, Box } from '@mui/material';

export const StyledFormContainer = styled(Box)({
  marginTop: 30,
  display: 'flex',
  flexDirection: 'column',
  gap: 90,
  [`& > .${typographyClasses.root}`]: {
    textAlign: 'center',
  },
  [`& > .${boxClasses.root}`]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
});
