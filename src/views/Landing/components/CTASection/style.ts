import { typographyClasses, boxClasses } from '@mui/material';
import { styled } from '@mui/system';
import { StyledAnimatedContainer } from '../../../../components/style';

export const StyledContainer = styled(StyledAnimatedContainer)({
  marginTop: '300px',
  borderRadius: 30,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [`& .${typographyClasses.root}`]: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Montagu Slab',
    fontSize: '80px',
    fontWeight: 800,
  },
  [`& > .${boxClasses.root}`]: {
    padding: '100px 40px',
  },
});
