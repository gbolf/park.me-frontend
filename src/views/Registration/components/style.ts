import { styled } from '@mui/system';
import { Paper } from '@mui/material';

export const StyledDropZone = styled(Paper)<{ imageURL: string }>(({ theme, imageURL }) => ({
  ...(!!imageURL && { backgroundImage: `url(${imageURL})` }),
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  height: 'calc(100% - 45px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 1,
  borderRadius: 10,
  border: `2px solid ${theme.palette.primary.light}`,
}));
