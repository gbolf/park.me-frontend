import { styled } from '@mui/system';
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
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    scrollBehavior: 'smooth',
    WebkitOverflowScrolling: 'touch',
    width: '100%',
  },
  '& .gallery-item': {
    flex: '0 0 100%',
    scrollSnapAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
  },
  '& img': {
    width: '100%',
    height: 'auto',
    maxHeight: 300,
    borderRadius: '15px',
    border: '1px solid #3F523B',
    objectFit: 'cover',
  },
});
