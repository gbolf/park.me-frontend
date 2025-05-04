import { styled } from '@mui/system';
import { Card, CardContent, CardMedia } from '@mui/material';
import { StyledBaseGlassBox } from '@components/style';


export const StyledSideContainer = styled(StyledBaseGlassBox)({
  width: '100%',
  height: 'unset',
  minHeight: '100%',
});

export const StyledCard = styled(Card)({
  height: 300,
  width: '100%',
  position: 'relative',
  transition: 'transform 0.3s ease',
  borderRadius: 15,
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  zIndex: 1,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.2,
    background: theme.palette.primary.dark,
    zIndex: 1,
  },
}));

export const StyledCardContent = styled(CardContent)({
  borderRadius: '5px',
  margin: '15px',
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: 'calc(100% - 30px)',
  boxSizing: 'border-box',
  backgroundColor: '#FFFFFF',
  zIndex: 2,
});
