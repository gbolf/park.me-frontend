import React from 'react';
import { Box, Typography } from '@mui/material';
import { StyledSectionTitle } from '../../style';
import searchBroImg from '@images/search-bro.svg';
import cardBroImg from '@images/card-bro.svg';
import parkingBroImg from '@images/parking-bro.svg';
import { StyledContainer, StyledStepsContainer } from './style';

const SECTIONS = [
  {
    img: searchBroImg,
    title: 'Pronalazak odgovarajućeg mjesta',
    content: 'Uz našu napredno filtiranje moguće je pronaći parkirna mjesta pomoću lokacije, željenje dostupnosti cijene.',
  },
  {
    img: cardBroImg,
    title: 'Rezerviranje željenog mjesta',
    content: 'Parkirno mjesto moguće je rezervirati unaprijed što će vam uštediti vrijeme i novac.',
  },
  {
    img: parkingBroImg,
    title: 'Parkiraj',
    content: 'Nema potrebe za vožnjom po gradu u potrazi za parkingom. Prepustite nama da pronađemo parking za vas.',
  },
];

export function ProcessSection() {
  return (
    <StyledContainer>
      <StyledSectionTitle>Jednostavan proces</StyledSectionTitle>
      <StyledStepsContainer>
        {SECTIONS.map(({ img, title, content }, idx) => (
          <Box>
            <img src={img} />
            <Box>
              <Typography>
                <span>{idx + 1}.</span> {title}
              </Typography>
              <Typography>{content}</Typography>
            </Box>
          </Box>
        ))}
      </StyledStepsContainer>
    </StyledContainer>
  );
}
