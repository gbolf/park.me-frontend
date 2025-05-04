import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const StyledTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: '#3F523B',
  fontFamily: 'Montagu Slab',
  fontSize: '200px',
  fontWeight: 600,
  [theme.breakpoints.down('md')]: {
    fontSize: '100px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '80px',
  },
}));

export const StyledContainer = styled(Box)(({ theme }) => ({
  marginTop: '100px',
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  gap: 30,
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    marginTop: '50px',
    gap: 20,
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: '20px',
    gap: 15,
  },
}));

export const StyledSubContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  backgroundColor: '#EDF1D5',
  padding: '40px',
  borderRadius: 30,
  [theme.breakpoints.down('sm')]: {
    padding: '20px',
  },
}));

export const StyledGreenContainer = styled(StyledSubContainer)(({ theme }) => ({
  backgroundColor: '#3F523B',
  '& > h3': {
    color: '#FFFFFF',
    fontFamily: 'Montagu Slab',
    fontSize: '50px',
    fontWeight: 800,
    [theme.breakpoints.down('sm')]: {
      fontSize: '30px',
    },
  },
  '& > h4': {
    marginTop: '20px',
    color: '#FFFFFF',
    fontFamily: 'Montagu Slab',
    fontSize: '30px',
    fontWeight: 400,
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
    },
  },
  '& > p': {
    color: '#FFFFFF',
    fontFamily: 'Nunito Sans',
    fontSize: '20px',
    fontWeight: 400,
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
}));

export const StyledSubTitle = styled(Typography)(({ theme }) => ({
  color: '#3F523B',
  fontFamily: 'Montagu Slab',
  fontSize: '25px',
  fontWeight: 700,
  border: '3px solid #3F523B',
  borderRadius: '20px',
  padding: '10px 20px',
  paddingTop: '15px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    padding: '8px 15px',
  },
}));

export const StyledSubTitle2 = styled(Typography)(({ theme }) => ({
  color: '#3F523B',
  fontFamily: 'Nunito Sans',
  fontSize: '20px',
  fontWeight: 400,
  border: '3px solid #3F523B',
  borderRadius: '20px',
  padding: '20px 40px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    padding: '15px 25px',
  },
}));
