import { height, styled } from '@mui/system';
import { avatarClasses, Box, typographyClasses } from '@mui/material';

export const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '300px',
  marginTop: '300px',
  '@media (max-width: 960px)': {
    marginTop: '100px',
    gap: '150px',
  },
});

export const StyledReview = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  width: '70%',
  [theme.breakpoints.down('md')]: {
    width: '70%',
    padding: '0 20px',
  },
  '& .comment': {
    color: '#000000',
    fontFamily: 'Montagu Slab',
    fontSize: '30px',
    fontWeight: 700,
    [theme.breakpoints.down('md')]: {
      fontSize: '24px',
    },
  },
  '& .avatar-container': {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    [`& .${avatarClasses.root}`]: {
      width: 100,
      height: 100,
      [theme.breakpoints.down('md')]: {
        width: 50,
        height: 50,
      },
    },
    [`& .${avatarClasses.img}`]: {
      objectFit: 'cover',
    },
    [`& .${typographyClasses.root}`]: {
      color: '#000000',
      fontFamily: 'Nunito Sans',
      fontSize: '20px',
      fontWeight: 700,
      [theme.breakpoints.down('md')]: {
        fontSize: '18px',
      },
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
}));
