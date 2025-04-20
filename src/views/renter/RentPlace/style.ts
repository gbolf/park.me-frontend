import { alpha, styled } from '@mui/system';
import { StyledBaseGlassBox } from '../../../components/style';

export const StyledSideContainer = styled(StyledBaseGlassBox)({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  rowGap: 30,
  columnGap: 30,
  alignItems: 'flex-start',
});

export const StyledImage = styled('img', { shouldForwardProp: (prop) => prop !== 'active' })<{ active: boolean }>(({ theme, active }) => ({
  borderRadius: 10,
  width: 100,
  maxHeight: 150,
  objectFit: 'contain',
  border: '2px solid transparent',
  borderColor: active ? theme.palette.primary.dark : 'transparent',
  transition: 'border-color 300ms',
  backgroundColor: alpha(theme.palette.primary.dark, 0.3),
}));
