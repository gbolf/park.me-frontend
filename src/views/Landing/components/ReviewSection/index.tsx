import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { StyledSectionTitle } from '../../style';
import { StyledContainer, StyledReview } from './style';
import manImg from '@images/man.jpg';
import quotesImg from '@images/quotes.svg';
import womanImg from '@images/woman.jpg';

const REVIEWS = [
  {
    img: womanImg,
    comment: 'Svaka preporuka. Ja sam odušljvenja. Cijena prikladna. Usluga odlična!!',
    name: 'Martina P.',
  },
  {
    img: manImg,
    comment: 'Svaka preporuka. Ja sam odušljvenja. Cijena prikladna. Usluga odlična!!',
    name: 'Davor K.',
  },
  {
    img: womanImg,
    comment: 'Svaka preporuka. Ja sam odušljvenja. Cijena prikladna. Usluga odlična!!',
    name: 'Marija C.',
  },
];

export function ReviewSection() {
  return (
    <Box>
      <StyledSectionTitle variant="h2">Iskustva korisnika</StyledSectionTitle>
      <StyledContainer>
        {REVIEWS.map(({ img, comment, name }) => (
          <StyledReview>
            <Typography className="comment">“{comment}”</Typography>
            <Box className="avatar-container">
              <Avatar src={img} />
              <Typography>{name}</Typography>
            </Box>
            <img src={quotesImg} className="quote-top" />
            <img src={quotesImg} className="quote-bottom" />
          </StyledReview>
        ))}
      </StyledContainer>
    </Box>
  );
}
