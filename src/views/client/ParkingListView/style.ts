import { styled } from '@mui/system';
import { StyledSideContainer } from '../../../layouts/style';

export const StyledLeftContainer = styled(StyledSideContainer)({
  alignSelf: 'flex-start',
  width: 'min(50%,400px)',
  overflowY: 'scroll',
  height: '100%',
});
