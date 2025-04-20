import { styled } from '@mui/system';
import { Box, Button, IconButton, Typography } from '@mui/material';

import carImg from '@images/car.jpg';
import parkingImg from '@images/parking.jpg';
import houseImg from '@images/house.jpg';

export const StyledContainer = styled(Box)({
  height: 'calc(100vh - 80px)',
  display: 'flex',
  justifyContent: 'space-between',
});

export const StyledCentralContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '20px',
});

export const StyledImagesContainer = styled(Box)({
  width: '30%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
});

export const StyledMainTitle = styled(Typography)({
  fontFamily: 'Montagu Slab',
  fontSize: '50px',
  fontWeight: 400,
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 40px',
  border: '2px solid #3F523B',
  color: '#3F523B',
  borderRadius: '30px',
  '& span:last-of-type': {
    fontSize: '55px',
    fontWeight: 700,
  },
});

export const StyledSubTitle = styled(Typography)({
  fontFamily: 'Montagu Slab',
  fontSize: '20px',
  fontWeight: 400,
  textAlign: 'center',
  padding: '20px 40px',
  border: '2px solid #3F523B',
  color: '#3F523B',
  borderRadius: '60px',
});

export const StyledButton = styled(Button)({
  fontFamily: 'Nunito Sans',
  fontSize: '20px',
  fontWeight: 800,
  textAlign: 'center',
  padding: '20px 40px',
  color: '#FFFFFF',
  backgroundColor: '#3F523B',
  borderRadius: '60px',
});

export const StyledIconButton = styled(IconButton)<{ href: string }>({
  border: '2px solid #3F523B',
  width: 'max-content',
  margin: '0 auto',
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

export const StyledTallImage = styled(Box)({
  width: '30%',
  height: '100%',
  borderRadius: '60px 30px 30px 60px',
  background: `linear-gradient(0deg, rgba(63, 82, 59, 0.30) 0%, rgba(63, 82, 59, 0.30) 100%), url(${carImg}) lightgray 50% / cover no-repeat`,
});

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
