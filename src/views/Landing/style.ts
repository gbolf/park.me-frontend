import { Box, styled } from '@mui/system';
import { List, listItemClasses, Typography, typographyClasses } from '@mui/material';

export const StyledMainContainer = styled(Box)({
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  gap: '200px',
});

export const StyledList = styled(List)({
  position: 'fixed',
  top: 15,
  left: 14,
  width: 'calc(100% - 30px)',
  display: 'flex',
  justifyContent: 'space-between',
  fontFamily: 'Nunito Sans',
  fontWeight: '800',
  padding: 0,
  zIndex: 3,
  [`& .${listItemClasses.root}`]: {
    width: 'max-content',
    borderRadius: '15px',
    border: '1px solid #EDF1D5',
    background: 'rgba(63, 82, 59, 0.60)',
    boxShadow: '0px 0px 20px 3px rgba(63, 82, 59, 0.20)',
    backdropFilter: 'blur(20px)',
    color: '#FFFFFF',
  },
});

export const StyledSectionTitle = styled(Typography)({
  textAlign: 'center',
  color: '#3F523B',
  fontFamily: 'Montagu Slab',
  fontSize: '80px',
  fontWeight: 800,
});

export const StyledFooter = styled(Box)<{ component: React.ElementType }>({
  backgroundColor: '#3F523B',
  padding: '30px',
  paddingBottom: '20px',
  borderRadius: 30,
  [`& .${typographyClasses.root}:first-of-type`]: {
    fontFamily: 'Nunito Sans',
    fontSize: '50px',
    fontWeight: 900,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  [`& .${listItemClasses.root}`]: {
    fontFamily: 'Nunito Sans',
    fontSize: '15px',
    fontWeight: 900,
    color: '#FFFFFF',
    width: 'max-content',
    margin: '0 auto',
  },
});
