import { styled } from '@mui/system';
import { Box, typographyClasses, boxClasses } from '@mui/material';

export const StyledContainer = styled(Box)({
  backgroundColor: '#EDF1D5',
  padding: '100px 40px',
  borderRadius: 30,
});

export const StyledStepsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 100,
  [theme.breakpoints.down('md')]: {
    gap: 150,
  },
  [`& > .${boxClasses.root}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    '& img': {
      width: '40%',
    },
    '&:nth-of-type(2n)': {
      flexDirection: 'row-reverse',
    },
    [`& > .${boxClasses.root}`]: {
      width: '50%',
    },
    [`& .${typographyClasses.root}`]: {
      color: '#000000',
      fontFamily: 'Nunito Sans',
    },
    [`& .${typographyClasses.root}:first-of-type`]: {
      fontSize: '35px',
      fontWeight: 900,
      '& span': {
        fontFamily: 'Montagu Slab',
        fontSize: '80px',
        fontWeight: 800,
      },
    },
    [`& .${typographyClasses.root}:nth-of-type(2)`]: {
      fontSize: '25px',
      fontWeight: 400,
    },
    [theme.breakpoints.down('md')]: {
      '&, &:nth-of-type(2n)': {
        flexDirection: 'column',
      },
      '& img': {
        width: '70%',
      },
      [`& > .${boxClasses.root}`]: {
        width: '100%',
      },
    },
  },
}));
