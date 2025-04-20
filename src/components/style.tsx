import { Box, boxClasses } from '@mui/material';
import { styled } from '@mui/system';

export const StyledAnimatedContainer = styled(Box)({
  position: 'relative',
  backgroundColor: '#3F523B',
  overflow: 'hidden',
  [`& > .${boxClasses.root}`]: {
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(30vh)',
    position: 'relative',
    zIndex: 1,
  },
  '&::after, &::before': {
    content: '""',
    position: 'absolute',
    height: '100vh',
    aspectRatio: '1/1',
    background: 'radial-gradient(circle, #FFFFFF 0%, #EDF1D5 100%)',
    opacity: 0.3,
    mixBlendMode: 'color-dodge',
    pointerEvents: 'none',
    zIndex: 0,
  },
  '&::after': {
    top: 0,
    transform: 'translate(50%,-50%)',
    animation: 'move-top 40s infinite alternate',
  },
  '&::before': {
    bottom: 0,
    transform: 'translate(-50%,50%)',
    animation: 'move-bottom 40s infinite alternate',
  },
  '@keyframes move-top': {
    '0%': { right: 0, top: 0 },
    '25%': { right: '100%', top: 0 },
    '50%': { right: '100%', top: '100%' },
    '70%': { right: 0, top: '100%' },
    '100%': { right: 0, top: 0 },
  },
  '@keyframes move-bottom': {
    '0%': { left: 0, bottom: 0 },
    '25%': { left: '100%', bottom: 0 },
    '50%': { left: '100%', bottom: '100%' },
    '70%': { left: 0, bottom: '100%' },
    '100%': { left: 0, bottom: 0 },
  },
});

export const BASE_GLASS_STYLE = {
  border: '2px solid #FFFFFF',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  boxShadow: '0px 0px 30px 2px rgba(63, 82, 59, 0.20)',
  backdropFilter: 'blur(4px)',
};

export const StyledBaseGlassBox = styled(Box)({
  borderRadius: '15px',
  padding: 20,
  height: '100%',
  width: 'min(100%, 600px)',
  zIndex: 2,
  ...BASE_GLASS_STYLE,
});
