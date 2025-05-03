import { styled } from '@mui/system';
import { AppBar, avatarClasses, Box, Button, listClasses, listItemClasses, typographyClasses } from '@mui/material';
import { BASE_GLASS_STYLE, StyledBaseGlassBox } from '../components/style';

export const StyledContainer = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 20,
  boxSizing: 'border-box',
  padding: 15,
  overflow: 'hidden',
});

export const StyledNavigationContainer = styled(Box)({
  height: '100%',
  padding: 15,
  paddingTop: 96,
  boxSizing: 'border-box',
});

export const StyledEmptyContainer = styled(Box)({
  width: 'calc(100% - 30px)',
  height: 'calc(100% - 30px)',
  padding: '15px',
});

export const StyledAvatarContainer = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  gap: 15,
  padding: '5px 10px',
  border: '2px solid #FFFFFF',
  boxShadow: '0px 0px 30px 2px rgba(63, 82, 59, 0.20)',
  borderRadius:10,
  color: '#000000',
  [`& > .${avatarClasses.root}`]: {
    height: 30,
    width: 30,
  },
});

export const StyledAppbarContainer = styled(AppBar)(({ theme }) => ({
  boxSizing: 'border-box',
  top: 15,
  left: 15,
  width: 'calc(100% - 30px)',
  height: 70,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  zIndex: 3,
  paddingRight: 10,
  paddingLeft: 30,
  borderRadius: '15px',
  color: 'inherit',
  ...BASE_GLASS_STYLE,
  [`& .${listClasses.root}`]: {
    display: 'flex',
    gap: 20,
  },
  [`& .${listItemClasses.root}`]: {
    padding: 0,
    cursor: 'pointer',
    width: 'max-content',
  },
}));

export const StyledSideContainer = styled(StyledBaseGlassBox)({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  zIndex: 0,
  [`& > .${typographyClasses.root}`]: {
    textAlign: 'center',
  },
});
