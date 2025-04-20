import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const StyledTitle = styled(Typography)({
  textAlign: 'center',
  color: '#3F523B',
  fontFamily: 'Montagu Slab',
  fontSize: '200px',
  fontWeight: 600,
});

export const StyledContainer = styled(Box)({
  marginTop: '100px',
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  columnGap: 30,
});

export const StyledSubContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  backgroundColor: '#EDF1D5',
  padding: '40px',
  borderRadius: 30,
});

export const StyledGreenContainer = styled(StyledSubContainer)({
  backgroundColor: '#3F523B',
  '& > h3': {
    color: '#FFFFFF',
    fontFamily: 'Montagu Slab',
    fontSize: '50px',
    fontWeight: 800,
  },
  '& > h4': {
    marginTop: '20px',
    color: '#FFFFFF',
    fontFamily: 'Montagu Slab',
    fontSize: '30px',
    fontWeight: 400,
  },
  '& > p': {
    color: '#FFFFFF',
    fontFamily: 'Nunito Sans',
    fontSize: '20px',
    fontWeight: 400,
  },
});

export const StyledSubTitle = styled(Typography)({
  color: '#3F523B',
  fontFamily: 'Montagu Slab',
  fontSize: '25px',
  fontWeight: 700,
  border: '4px solid #3F523B',
  borderRadius: '60px',
  padding: '10px 20px',
  paddingTop: '15px',
});

export const StyledSubTitle2 = styled(Typography)({
  color: '#3F523B',
  fontFamily: 'Nunito Sans',
  fontSize: '20px',
  fontWeight: 400,
  border: '4px solid #3F523B',
  borderRadius: '30px',
  padding: '20px 40px',
});
