import { styled } from '@mui/system';
import { Box, typographyClasses } from '@mui/material';

export const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '300px',
  marginTop: '300px',
});

export const StyledReview = styled(Box)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  width: '70%',
  '& .comment': {
    color: '#000000',
    fontFamily: 'Montagu Slab',
    fontSize: '30px',
    fontWeight: 700,
  },
  '& .avatar-container': {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    [`& .${typographyClasses.root}`]: {
      color: '#000000',
      fontFamily: 'Nunito Sans',
      fontSize: '20px',
      fontWeight: 700,
    },
  },
  '& .quote-top': {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 200,
    zIndex: -1,
  },
  '& .quote-bottom': {
    position: 'absolute',
    bottom: 0,
    right: -100,
    width: 200,
    transform: 'rotate(180deg)',
    zIndex: -1,
  },
});
