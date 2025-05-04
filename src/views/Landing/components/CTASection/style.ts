import { typographyClasses, boxClasses } from '@mui/material';
import { styled } from '@mui/system';
import { StyledAnimatedContainer } from '../../../../components/style';

export const StyledContainer = styled(StyledAnimatedContainer)(({ theme }) => ({
  marginTop: '300px',
  borderRadius: 30,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [`& .${typographyClasses.root}`]: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Montagu Slab',
    fontSize: '70px',
    fontWeight: 800,
    [theme.breakpoints.down('md')]: {
      fontSize: '50px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '40px',
    },
  },
  [`& > .${boxClasses.root}`]: {
    boxSizing: 'border-box',
    padding: '100px 40px',
    [theme.breakpoints.down('md')]: {
      padding: '80px 30px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '60px 20px',
    },
  },
  [theme.breakpoints.down('lg')]: {
    marginTop: '150px',
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '100px',
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: '50px',
  },
}));
