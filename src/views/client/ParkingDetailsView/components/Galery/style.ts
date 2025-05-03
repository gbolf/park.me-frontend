import { height, styled } from '@mui/system';
import { Box } from '@mui/material';
import { BASE_GLASS_STYLE } from '../../../../../components/style';

export const StyledGalleryContainer = styled(Box)({
  position: 'relative',
  '& .left': {
    position: 'absolute',
    left: '-10px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    ...BASE_GLASS_STYLE,
  },
  '& .right': {
    position: 'absolute',
    right: '-10px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    ...BASE_GLASS_STYLE,
  },
  '& .gallery': {
    display: 'flex',
    gap: 15,
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    scrollBehavior: 'smooth',
    borderRadius: 15,
    WebkitOverflowScrolling: 'touch',
    width: '100%',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  '& .gallery-item': {
    flex: '0 0 100%',
    scrollSnapAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  '& img': {
    width: '100%',
    height: 300,
    borderRadius: '15px',
    padding: 15,
    border: '2px solid #3F523B',
    objectFit: 'contain',
  },
});
