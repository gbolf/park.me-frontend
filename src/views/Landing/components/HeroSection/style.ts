import { styled } from '@mui/system';
import { Box, Button, IconButton, Typography } from '@mui/material';

import carImg from '@images/car.jpg';
import parkingImg from '@images/parking.jpg';
import houseImg from '@images/house.jpg';

export const StyledContainer = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 90px)',
  display: 'flex',
  justifyContent: 'space-between',
  gap: 30,
  [theme.breakpoints.down('md')]: {
    justifyContent: 'space-around',
  },
}));

export const StyledCentralContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '20px',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: 'unset',
  },
}));

export const StyledImagesContainer = styled(Box)(({ theme }) => ({
  display: 'none',
  flexDirection: 'column',
  gap: '30px',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    width: '50%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '30%',
  },
}));

export const StyledMainTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montagu Slab',
  fontSize: '45px',
  fontWeight: 400,
  display: 'flex',
  flexDirection: 'column',
  padding: '15px 30px',
  border: '2px solid #3F523B',
  color: '#3F523B',
  textAlign: 'center',
  borderRadius: '30px',
  '& span:last-of-type': {
    fontSize: '50px',
    fontWeight: 700,
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: '40px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '30px',
    padding: '10px 20px',
  },
}));

export const StyledSubTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montagu Slab',
  fontSize: '20px',
  fontWeight: 400,
  textAlign: 'center',
  padding: '20px 40px',
  border: '2px solid #3F523B',
  color: '#3F523B',
  borderRadius: '60px',
  [theme.breakpoints.down('lg')]: {
    fontSize: '18px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '16px',
    padding: '10px 20px',
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Nunito Sans',
  cursor: 'pointer',
  fontSize: '20px',
  fontWeight: 800,
  textAlign: 'center',
  padding: '15px 30px',
  color: '#FFFFFF',
  backgroundColor: '#3F523B',
  borderRadius: '60px',
  [theme.breakpoints.down('lg')]: {
    fontSize: '18px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '16px',
    padding: '10px 20px',
  },
}));

export const StyledIconButton = styled(IconButton)<{ href: string }>({
  border: '2px solid #3F523B',
  width: 'max-content',
  margin: '0 auto',
  marginTop: 'auto',
  '& svg': {
    fill: '#3F523B',
  },
});

export const StyledHelperText = styled(Typography)({
  fontFamily: 'Nunito Sans',
  fontSize: '20px',
  fontWeight: 400,
  textAlign: 'center',
  color: '#3F523B',
  textDecoration: 'underline',
  textUnderlineOffset: 4,
});

export const StyledTallImage = styled(Box)(({ theme }) => ({
  width: '30%',
  height: '100%',
  borderRadius: '60px 30px 30px 60px',
  background: `linear-gradient(0deg, rgba(63, 82, 59, 0.30) 0%, rgba(63, 82, 59, 0.30) 100%), url(${carImg}) lightgray 50% / cover no-repeat`,
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
}));

export const StyledSmallTopImage = styled(Box)({
  width: '100%',
  height: '50%',
  borderRadius: '30px',
  borderTopRightRadius: '60px',
  background: `linear-gradient(0deg, rgba(63, 82, 59, 0.30) 0%, rgba(63, 82, 59, 0.30) 100%), url(${parkingImg}) lightgray 50% / cover no-repeat`,
});

export const StyledSmallBottomImage = styled(Box)({
  width: '100%',
  height: '50%',
  borderRadius: '30px',
  borderBottomRightRadius: '60px',
  background: `linear-gradient(0deg, rgba(63, 82, 59, 0.30) 0%, rgba(63, 82, 59, 0.30) 100%), url(${houseImg}) lightgray 50% / cover no-repeat`,
});
